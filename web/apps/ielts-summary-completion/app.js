/* Summary Completion: complete summaries of a passage from a box of words. */
(function () {
  'use strict';
  const sets = (passages, seed) => passages.map((p, i) => Object.assign(SK.ielts.passageSet(p, ['summary'], seed + i), { instructions: 'Complete the summary. Choose one word from the box for each gap. There are more words than gaps.' }));
  const App = {
    about: 'A summary condenses part of the passage, and you fill each gap with a word from a box. The words in the box are often synonyms of the passage, so you must match meaning and grammar. Six passages, each with a four-gap summary and a box of eight words.',
    how: ['Read the summary first and work out which part of the passage it covers.', 'For each gap, decide the part of speech, then find the idea in the passage.', 'Choose the box word that matches both meaning and grammar.'],
    tabs: [{ id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Summary completion', sets: sets(ctx.data.reading_passages, SK.daySeed('summary')),
      tips: ['The summary usually follows the order of the passage.', 'Two box words may fit the meaning; only one fits the grammar of the sentence.', 'Some box words are in the passage but in the wrong place: check the meaning, not just the word.'] }); } }],
    sets,
    checks: { 'each gap answer is in the box and marked right': (data, assert) => {
      sets(data.reading_passages, 2).forEach((set, i) => set.questions.forEach((q, k) => { assert.equal(q.choices[q.answer], data.reading_passages[i].summary.answers[k]); assert.equal(q.choices.length, 8); }));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
