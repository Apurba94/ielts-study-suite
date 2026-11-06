/* Matching Sentence Endings: complete each sentence with the ending that matches the passage. */
(function () {
  'use strict';
  const sets = (passages, seed) => passages.map((p, i) => Object.assign(SK.ielts.passageSet(p, ['endings'], seed + i), { instructions: 'Complete each sentence with the correct ending. There are more endings than you need.' }));
  const App = {
    about: 'In sentence endings, several endings may complete a sentence grammatically, but only one matches what the passage says. Six passages with four sentence beginnings and six endings each; the endings are shuffled every time you open a set.',
    how: ['Read the sentence beginning and find where it is in the passage; these questions follow passage order.', 'Read that part closely, then choose the ending that matches it in meaning.', 'Check grammar too: some endings cannot follow a beginning at all.'],
    tabs: [{ id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Sentence endings', sets: sets(ctx.data.reading_passages, SK.daySeed('endings')),
      tips: ['A distractor often uses words from the right part of the passage but says something it does not.', 'Singular and plural can rule out endings: "Endorphins ... make" not "makes".'] }); } }],
    sets,
    checks: { 'every ending answer is the one the bank names': (data, assert) => {
      sets(data.reading_passages, 5).forEach((set, i) => set.questions.forEach((q, k) => { const p = data.reading_passages[i]; assert.equal(q.choices[q.answer], p.endings.ends[p.endings.answer[k]]); }));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
