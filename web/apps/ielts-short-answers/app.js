/* Short-Answer Questions: answer with no more than three words from the passage. */
(function () {
  'use strict';
  const sets = (passages) => passages.map((p) => Object.assign(SK.ielts.passageSet(p, ['short'], 1), { limit: 'NO MORE THAN THREE WORDS AND/OR A NUMBER' }));
  const App = {
    about: 'Short-answer questions ask a direct question, and you write the answer using words from the passage, within a word limit. The answer must be spelled exactly as in the passage. Six passages with short-answer questions, marked as IELTS marks them.',
    how: ['Underline the key words of the question, then scan for them or their synonyms.', 'Copy the answer words from the passage exactly, within the limit.', 'Do not add words that are not needed: "the 1970s" and "1970s" both fit; "it was in the 1970s" breaks the limit.'],
    tabs: [{ id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Short answers', sets: sets(ctx.data.reading_passages),
      tips: ['Questions follow passage order.', 'Names and numbers are the easiest to scan for.', 'Check the word limit before you move on.'] }); } }],
    sets,
    checks: { 'every answer fits the limit and is in its passage': (data, assert) => {
      sets(data.reading_passages).forEach((set, i) => set.questions.forEach((q) => { assert.ok(SK.ielts.fitsLimit(q.answer, set.limit).ok); assert.ok(data.reading_passages[i].paragraphs.join(' ').toLowerCase().includes(q.answer.toLowerCase()) || q.accept.length); }));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
