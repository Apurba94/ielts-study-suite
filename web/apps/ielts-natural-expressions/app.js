/* Natural Expressions: common idiomatic expressions, when they sound natural and when they do not. */
(function () {
  'use strict';
  const words = (ctx) => ctx.data.idioms;
  const items = (list, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, list, n).map((x) => SK.shuffleItem(r, { id: 'idq-' + x.id, type: 'single', topic: 'Expressions', stem: 'What does **' + x.w + '** mean?\n"' + x.e + '"', choices: [x.d].concat(SK.sample(r, list.filter((o) => o.id !== x.id), 3).map((o) => o.d)), answer: 0, explanation: '**' + x.w + '**: ' + x.d + '. ' + x.note }));
  };
  const App = {
    about: 'Examiners credit less common and idiomatic vocabulary when it is used naturally and accurately, and notice when an idiom is forced or out of place. Forty common expressions with their meaning, an example and a note on where they fit: most are fine in Speaking but too informal for an essay.',
    how: ['Learn a few expressions at a time in **Cards**.', 'Test yourself in **Quiz**.', 'Use one or two in a Speaking answer only where they fit what you mean. Never plan to "insert idioms".'],
    tabs: [
      SK.cardsTab('cards', 'Cards', (ctx) => words(ctx).map((x) => ({ id: x.id, front: x.w, back: x.d, extra: x.e + '\n' + x.note, say: x.w })), { newPerDay: 10 }),
      { id: 'quiz', label: 'Quiz', render(el, ctx) { SK.quizStarter(el, { title: 'What does it mean?', sizes: [10, 20], make: (t, n, s) => items(words(ctx), n, s), seconds: (n) => n * 20 }); } },
      { id: 'list', label: 'List', render(el, ctx) { el.appendChild(SK.card('Expressions', SK.table(['Expression', 'Meaning', 'Example', 'Note'], words(ctx).map((x) => [SK.h('strong', { text: x.w }), x.d, x.e, x.note])))); } },
    ],
    items,
    checks: { 'every example uses its expression and quizzes are valid': (data, assert) => {
      for (const x of data.idioms) { const last = x.w.split(' ').pop().toLowerCase(); assert.ok(x.e.toLowerCase().includes(last), x.w); }
      for (const it of items(data.idioms, 30, 1)) assert.deepEqual(SK.validateItem(it), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
