/* Distractor Trainer: speakers change their minds and correct each other; catch the final answer. */
(function () {
  'use strict';
  const items = (n, seed) => { const r = SK.rng(seed); return SK.range(n).map(() => { const it = SK.ielts.distractorItem(r); return Object.assign(it, { audio: { title: 'Conversation', lines: it.lines } }); }); };
  const SIGNALS = ['Actually, ...', 'Oh no, sorry, I mean ...', 'That was the old date / price / room.', 'Did you count ...? Add them on.', 'There\'s a strike / problem / change, so ...', 'No, that was my old one. This one is ...', 'Students pay five pounds less.'];
  const App = {
    about: 'IELTS Listening often mentions a wrong answer first: a date that is then changed, a room that has moved, a price before a discount. These distractors catch test takers who write the first thing they hear. This app generates short conversations built around a change of mind, so you learn to wait for the final answer.',
    how: ['Press Play and listen to the whole exchange before you write.', 'Write the final answer in **Practice**. Numbers and dates are accepted in figures or words.', 'Learn the signal phrases in **Signals**: they warn you a change is coming.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el) { SK.quizStarter(el, { title: 'Catch the final answer', sizes: [10, 20], make: (t, n, s) => items(n, s), seconds: (n) => n * 30 }); } },
      { id: 'signals', label: 'Signals', render(el) { el.appendChild(SK.card('Phrases that signal a change', SK.h('ul', {}, SIGNALS.map((x) => SK.h('li', { text: x }))))); } },
    ],
    items,
    checks: { 'the trap answer is always marked wrong': (data, assert) => {
      for (const it of items(400, 5)) { assert.ok(SK.isCorrect(it, it.answer)); assert.ok(!SK.isCorrect(it, it.wrong), it.id); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
