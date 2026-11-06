/* Matching Headings: choose the heading that sums up each paragraph. */
(function () {
  'use strict';
  const sets = (passages, seed) => passages.map((p, i) => Object.assign(SK.ielts.passageSet(p, ['headings'], seed + i), { instructions: 'The passage has six paragraphs, A to F. Choose the correct heading for each paragraph from the list. There are two headings you will not need.' }));
  const App = {
    about: 'Matching headings tests whether you can find the main idea of each paragraph, not just a detail. Six original academic passages, each with a list of eight headings for six paragraphs, so two are distractors. The headings list is shuffled each time.',
    how: ['Read the headings first, then read each paragraph for its main idea, usually stated near the start or end.', 'A heading that matches one sentence of a paragraph is usually a distractor; the right one covers the whole paragraph.', 'Do the paragraphs you are sure of first, then cross out headings you have used.'],
    tabs: [{ id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Matching headings', sets: sets(ctx.data.reading_passages, SK.daySeed('headings')),
      tips: ['Skim the whole paragraph before choosing; do not stop at the first matching word.', 'Headings often use more general words than the paragraph: "A fashion set at court" for a paragraph about a queen and tea parties.', 'If two headings seem to fit, ask which one the whole paragraph is about.'] }); } }],
    sets,
    checks: { 'six passages of six headings, each heading answer correct': (data, assert) => {
      const s = sets(data.reading_passages, 3);
      assert.equal(s.length, 6);
      s.forEach((set, i) => set.questions.forEach((q, k) => { assert.deepEqual(SK.validateItem(q), []); assert.ok(q.choices[q.answer].endsWith(data.reading_passages[i].headings.list[data.reading_passages[i].headings.answer[k]])); }));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
