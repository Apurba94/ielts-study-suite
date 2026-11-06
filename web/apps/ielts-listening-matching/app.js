/* Listening Matching: match people, places or options to what speakers say about them. */
(function () {
  'use strict';
  // Matching and multiple-choice questions only, from the Part 2 and Part 3 recordings.
  const sets = (disc, talks) => disc.concat(talks).map((x) => SK.listeningSet(Object.assign({}, x, { questions: x.questions.filter((q) => q.type !== 'text') }), { instructions: 'Listen and choose the correct letter or letters.' })).filter((s) => s.questions.length >= 4);
  const App = {
    about: 'Matching and multiple-choice questions test whether you follow who said what and what was finally decided, not just whether you catch a word. This app collects the choice and matching questions from the Part 2 talks and Part 3 discussions, so you can focus on this skill.',
    how: ['Before you play, read every option and think how it might be paraphrased.', 'Cross out options as speakers reject them.', 'For choose TWO, select two options; both must be right.'],
    tabs: [{ id: 'sets', label: 'Sets', render(el, ctx) { SK.setBank(el, { title: 'Matching and multiple choice', sets: sets(ctx.data.listening_discussions, ctx.data.listening_talks), audio: true,
      tips: ['All the options are usually mentioned. The question is which one matches.', 'Words like "but", "actually" and "although" often come just before the real answer.', 'In matching, options may be used more than once or not at all.'] }); } }],
    sets,
    checks: { 'sets contain only choice questions': (data, assert) => {
      const s = sets(data.listening_discussions, data.listening_talks);
      assert.ok(s.length >= 12);
      for (const set of s) for (const q of set.questions) { assert.ok(q.type === 'single' || q.type === 'multi'); assert.deepEqual(SK.validateItem(q), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
