/* Multiple-Choice Reading: questions on passages where every wrong option is wrong for a reason. */
(function () {
  'use strict';
  const sets = (passages, seed) => passages.map((p, i) => Object.assign(SK.ielts.passageSet(p, ['mcq', 'tfng'], seed + i), { instructions: 'Choose the correct letter, then decide whether the statements agree with the passage.' }));
  const TRAPS = [['Word match', 'The option repeats words from the passage but says something different.'], ['Too strong', 'The passage says "some" or "often"; the option says "all" or "always".'], ['True but not the answer', 'The option is true according to the passage, but does not answer this question.'], ['Opposite', 'The option reverses what the passage says.']];
  const App = {
    about: 'Multiple-choice questions in IELTS Reading have three or four options, and the wrong ones are designed to tempt: they repeat words from the passage, overstate it, or are true but answer a different question. Practise with the multiple-choice questions on six passages, with True, False or Not Given statements to check close reading.',
    how: ['Read the question stem first and find the part of the passage it refers to.', 'Read that part closely, then compare each option with it.', 'Learn the four common traps in **Traps**.'],
    tabs: [
      { id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Multiple choice', sets: sets(ctx.data.reading_passages, SK.daySeed('mcq')) }); } },
      { id: 'traps', label: 'Traps', render(el) { el.appendChild(SK.card('How wrong options are built', SK.table(['Trap', 'What it does'], TRAPS, false))); } },
    ],
    sets,
    checks: { 'each set has its choice questions with the right option kept': (data, assert) => {
      sets(data.reading_passages, 9).forEach((set, i) => { const m = set.questions.filter((q) => q.topic === 'Multiple choice'); m.forEach((q, k) => assert.equal(q.choices[q.answer], data.reading_passages[i].mcq[k].choices[data.reading_passages[i].mcq[k].answer])); });
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
