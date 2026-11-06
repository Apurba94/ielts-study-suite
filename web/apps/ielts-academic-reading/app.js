/* Academic Reading Practice: long passages with a mix of question types, timed at 20 minutes each. */
(function () {
  'use strict';
  // About 13 questions per passage, in the usual mix: one matching type, one completion type, then statements.
  const MIXES = [['headings', 'summary', 'tfng'], ['info', 'short', 'mcq', 'tfng'], ['endings', 'summary', 'tfng'], ['headings', 'short', 'mcq']];
  const sets = (passages, seed) => passages.map((p, i) => Object.assign(SK.ielts.passageSet(p, MIXES[i % MIXES.length], seed + i), { instructions: 'You should spend about 20 minutes on this passage.' }));
  const App = {
    about: 'Each section of the Academic Reading test is one long passage with about 13 questions of mixed types, and you have about 20 minutes for it. Six original passages on history, environment, psychology, biology, business and anthropology, each with a realistic mix of question types and a 20-minute timer.',
    how: ['Press **Start the next new set**. A 20-minute timer starts.', 'Skim the passage in two or three minutes, then answer the questions group by group.', 'Questions in the same group usually follow passage order, except matching questions.', 'Press Check answers when you finish or when time runs out.'],
    tabs: [{ id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Academic Reading', sets: sets(ctx.data.reading_passages, SK.daySeed('ac')), view: { seconds: 20 * 60 },
      tips: ['Spend no more than about 20 minutes per passage, or the third will suffer.', 'If you are stuck on one question, guess and move on; there is no penalty for wrong answers.', 'Do the matching questions after the others: by then you know the passage.'] }); } }],
    sets,
    checks: { 'each passage set has 10 to 20 valid questions': (data, assert) => {
      for (const set of sets(data.reading_passages, 1)) { assert.ok(set.questions.length >= 10 && set.questions.length <= 20, String(set.questions.length)); for (const q of set.questions) assert.deepEqual(SK.validateItem(q), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
