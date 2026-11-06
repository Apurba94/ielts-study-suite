/* Paraphrase Spotting: hear a sentence and choose the option that says the same thing in other words. */
(function () {
  'use strict';
  const items = (bank) => bank.map((x) => Object.assign({}, x, { audio: { title: 'Speaker', text: x.say } }));
  const PAIRS = [['sold out', 'demand was high'], ['hardly anyone', 'very few people'], ['postpone', 'delay'], ['far from what we predicted', 'very different from the prediction'], ['doubled', 'twice as many'], ['due to be completed', 'expected to be finished'], ['considering', 'not yet decided'], ['at least two years', 'two or more years']];
  const App = {
    about: 'IELTS rarely repeats the words of a question in the recording. Instead it paraphrases: the question says "very few people came" while the speaker says "hardly anyone turned up". Hear 24 sentences and choose the option that means the same, while the wrong options repeat words you heard but change the meaning.',
    how: ['Press Play and listen for meaning, then choose.', 'Be suspicious of options that repeat many words from the recording; they are often traps.', 'Learn the common pairs in **Pairs**.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => items(ctx.data.listening_paraphrase), { sizes: [8, 16, 24], modes: false }),
      { id: 'pairs', label: 'Pairs', render(el) { el.appendChild(SK.card('Common paraphrases', SK.table(['You hear', 'The question may say'], PAIRS, false))); } },
    ],
    items,
    checks: { 'every item is valid and has audio': (data, assert) => { for (const it of items(data.listening_paraphrase)) { assert.deepEqual(SK.validateItem(it), []); assert.ok(it.audio.text.length > 10); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
