/* Collocation Trainer: which words go together, such as make a decision and heavy traffic. */
(function () {
  'use strict';
  const bank = (ctx) => ctx.data.collocations.concat(ctx.data.collocations_more);
  const items = (b, n, seed) => { const r = SK.rng(seed); return SK.sample(r, b, n).map((x) => SK.shuffleItem(r, { id: 'co-' + x.id, type: 'single', topic: 'Collocations', stem: x.s, choices: [x.answer].concat(x.wrong), answer: 0, explanation: 'We say **' + x.note + '**.' })); };
  const App = {
    about: 'Collocations are word partnerships that sound natural: make a decision (not do a decision), heavy traffic (not strong traffic), raise awareness, draw a conclusion. Examiners reward natural collocation in lexical resource. Fifty-four everyday and academic collocations, with quizzes and a list.',
    how: ['Practise in **Quiz**: choose the word that completes the phrase naturally.', 'Learn the phrases in **List**, and say each one aloud.', 'When you read, notice which words appear together, and note them down.'],
    tabs: [
      { id: 'quiz', label: 'Quiz', render(el, ctx) { SK.quizStarter(el, { title: 'Which word fits?', sizes: [10, 20, 54], make: (t, n, s) => items(bank(ctx), n, s), seconds: (n) => n * 20 }); } },
      { id: 'list', label: 'List', render(el, ctx) { el.appendChild(SK.card('Collocations', SK.table(['Phrase', 'Example'], bank(ctx).map((x) => [SK.h('strong', { text: x.note }), x.s.replace('_____', x.answer)])))); } },
    ],
    items,
    checks: { 'every collocation question is valid': (data, assert) => { const b = data.collocations.concat(data.collocations_more); assert.equal(b.length, 54); for (const it of items(b, 54, 1)) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
