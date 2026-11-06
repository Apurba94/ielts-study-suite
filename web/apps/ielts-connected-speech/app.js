/* Connected Speech Trainer: linking and reduced forms such as gonna and wanna. */
(function () {
  'use strict';
  const items = (bank, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, bank, n).map((x) => SK.shuffleItem(r, { id: 'cs-' + x.id, type: 'single', topic: 'Reduced forms', stem: 'In fast speech you hear: *' + x.heard + '* What does the speaker say in full?', choices: [x.full].concat(SK.sample(r, bank.filter((o) => o.id !== x.id), 3).map((o) => o.full)), answer: 0, explanation: x.rule }));
  };
  const App = {
    about: 'Speakers join and shorten words: going to becomes gonna, did you becomes didja, turn it off runs together. These forms make Listening Parts 3 and 4 hard to follow even when you know every word. Learn 20 common reductions and match what you hear to what is meant. In your own speaking, linking sounds natural, but clear full forms are always safe.',
    how: ['Read the list in **Forms**. Say each heard form aloud, then the full form.', 'In **Quiz**, choose the full sentence for each reduced one.', 'Notice these forms in the Part 3 discussions.'],
    tabs: [
      { id: 'forms', label: 'Forms', render(el, ctx) { el.appendChild(SK.card('Reduced and linked forms', SK.table(['You hear', 'It means', 'Rule'], ctx.data.connected_speech.map((x) => [SK.h('em', { text: x.heard }), x.full, x.rule])))); } },
      { id: 'quiz', label: 'Quiz', render(el, ctx) { SK.quizStarter(el, { title: 'What was said?', sizes: [10, 20], make: (t, n, s) => items(ctx.data.connected_speech, n, s), seconds: (n) => n * 15 }); } },
    ],
    items,
    checks: { 'every reduction has a full form and quizzes are valid': (data, assert) => { for (const x of data.connected_speech) assert.ok(x.full !== x.heard); for (const it of items(data.connected_speech, 20, 1)) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
