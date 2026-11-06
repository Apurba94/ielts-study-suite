/* Speaking Phrase Bank: phrases to give opinions, gain time, compare, speculate and describe. */
(function () {
  'use strict';
  const groups = (ctx) => ctx.data.phrases.concat(ctx.data.speaking_phrases);
  const items = (gs, n, seed) => {
    const r = SK.rng(seed);
    const pool = gs.flatMap((g) => g.phrases.map((p) => [g, p]));
    return SK.sample(r, pool, n).map(([g, p]) => SK.shuffleItem(r, { id: 'ph-' + p, type: 'single', topic: g.name, stem: 'What is this phrase used for? **' + p + '**', choices: [g.name].concat(SK.sample(r, gs.filter((x) => x.id !== g.id), 3).map((x) => x.name)), answer: 0, explanation: '"' + p + '" is for ' + g.name.toLowerCase() + '. Others like it: ' + g.phrases.filter((x) => x !== p).join('; ') + '.' }));
  };
  const App = {
    about: 'A small set of ready phrases makes spoken answers smoother: one to give your opinion, one to gain a moment to think, one to compare past and present, one to speculate. This bank has fourteen groups of natural phrases, with a list to learn and a quiz to sort them. Use them naturally: memorised speeches lower your score.',
    how: ['Learn one or two phrases from each group in **Phrases**. You do not need them all.', 'Sort phrases into groups in **Quiz**.', 'Use them in the Part 1, Part 3 and full Speaking test apps.'],
    tabs: [
      { id: 'phrases', label: 'Phrases', render(el, ctx) { groups(ctx).forEach((g) => el.appendChild(SK.card(g.name, SK.h('ul', {}, g.phrases.map((p) => SK.h('li', {}, p, ' ', SK.speech.ok() ? SK.btn('Hear', () => SK.speech.say(p), 'ghost small') : null)))))); } },
      { id: 'quiz', label: 'Quiz', render(el, ctx) { SK.quizStarter(el, { title: 'What is it for?', sizes: [10, 20], make: (t, n, s) => items(groups(ctx), n, s), seconds: (n) => n * 15 }); } },
    ],
    items,
    checks: { 'no phrase belongs to two groups and quizzes are valid': (data, assert) => { const gs = data.phrases.concat(data.speaking_phrases); const all = gs.flatMap((g) => g.phrases); assert.equal(new Set(all).size, all.length); assert.equal(gs.length, 14); for (const it of items(gs, 30, 2)) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
