/* British and American English: spellings and words that differ; both are accepted if you stay consistent. */
(function () {
  'use strict';
  const items = (bank, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, bank, n).map((x) => {
      const toUS = r() < 0.5;
      const others = SK.sample(r, bank.filter((o) => o.id !== x.id && o.kind === x.kind), 3).map((o) => (toUS ? o.us : o.uk));
      return SK.shuffleItem(r, { id: 'ba-' + x.id + (toUS ? '-us' : '-uk'), type: 'single', topic: x.kind === 'spelling' ? 'Spelling' : 'Words', stem: (toUS ? 'British **' + x.uk + '**: the American ' + x.kind + ' is...' : 'American **' + x.us + '**: the British ' + x.kind + ' is...'), choices: [toUS ? x.us : x.uk].concat(others), answer: 0, explanation: x.uk + ' (British) = ' + x.us + ' (American). ' + x.note });
    });
  };
  const App = {
    about: 'IELTS accepts British, American and other standard spellings, but examiners notice when a writer mixes them in one essay (colour and color, organise and organize). Recordings use British words such as flat, lift and queue. Learn 45 common differences in spelling and vocabulary.',
    how: ['Decide which spelling you will use, and stay with it in every answer.', 'In **Practice**, find the matching British or American form.', 'In **List**, learn the words you may hear in recordings, such as flat, lift and postcode.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'British and American', topics: ['Spelling', 'Words'], sizes: [10, 20], make: (t, n, s) => items(ctx.data.british_american.filter((x) => t === 'All' || (t === 'Spelling') === (x.kind === 'spelling')), n, s), seconds: (n) => n * 15 }); } },
      { id: 'list', label: 'List', render(el, ctx) { el.appendChild(SK.card('Differences', SK.table(['British', 'American', 'Note'], ctx.data.british_american.map((x) => [SK.h('strong', { text: x.uk }), x.us, x.note])), SK.note('In one answer, stay with one spelling system.'))); } },
    ],
    items,
    checks: { 'every pair differs and quiz items are valid': (data, assert) => { for (const x of data.british_american) assert.notEqual(x.uk, x.us); for (const it of items(data.british_american, 40, 3)) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
