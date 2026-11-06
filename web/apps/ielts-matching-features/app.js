/* Matching Features: match statements to the researchers, places or inventors they belong to. */
(function () {
  'use strict';
  const sets = (bank) => bank.map((m) => {
    const choices = m.features.map((f, i) => SK.ielts.LETTERS[i] + '. ' + f);
    return { id: m.id, title: m.title, passageTitle: m.title, passage: m.text, instructions: m.instructions + ' You may use any letter more than once.',
      questions: m.items.map((x, k) => ({ id: m.id + '-' + k, type: 'single', fixedOrder: true, noLetters: true, topic: 'Matching features', stem: x.s, choices, answer: x.a, explanation: 'This belongs to ' + m.features[x.a] + '.' })) };
  });
  const App = {
    about: 'Matching features gives you a list of people, places or dates and a set of statements, and you match each statement to the right one. Passages that mention several researchers, each with a different finding, are the classic form. Five original passages with 22 statements.',
    how: ['Find and mark every name in the passage first.', 'Read what is said near each name, then match the statements, which are paraphrased.', 'Some names may be used twice and some not at all.'],
    tabs: [{ id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Matching features', sets: sets(ctx.data.matching_features),
      tips: ['Underline each name as you find it, so you can return quickly.', 'Pronouns matter: "his partner" or "she argued" still belongs to the person last named.', 'Statements are not in passage order.'] }); } }],
    sets,
    checks: { 'every statement points to a feature named in its passage': (data, assert) => {
      for (const set of sets(data.matching_features)) for (const q of set.questions) { assert.deepEqual(SK.validateItem(q), []); const name = q.choices[q.answer].slice(3); assert.ok(set.passage.includes(name.split(' ').pop()), name); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
