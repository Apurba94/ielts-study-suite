/* Workplace Texts (General Training): job adverts, staff handbooks and training notices with Section 2 questions. */
(function () {
  'use strict';
  const sets = (bank) => bank.filter((g) => g.section === 2).map((g) => ({ id: g.id, title: g.title + ' (' + g.kind.toLowerCase() + ')', passageTitle: g.title, passage: g.text, limit: 'ONE WORD AND/OR A NUMBER',
    instructions: 'Read the text and answer the questions.', questions: g.questions.map((q, k) => Object.assign({ id: g.id + '-' + k, topic: g.kind, noLetters: q.choices && q.choices[0] === 'True' }, q)) }));
  const App = {
    about: 'Section 2 of General Training Reading is about work: job advertisements, staff handbooks, policies and training. The language is more formal than in Section 1, and rules often have conditions and exceptions. Five original workplace texts with True, False or Not Given and note-completion questions.',
    how: ['Watch for conditions: only after six months, unless you cannot speak, up to seven days.', 'A statement that ignores a condition is usually False.', 'For gaps, copy the word or number exactly from the text.'],
    tabs: [{ id: 'sets', label: 'Texts', render(el, ctx) { SK.setBank(el, { title: 'Workplace texts', sets: sets(ctx.data.gt_texts), view: { seconds: 10 * 60 },
      tips: ['Words such as only, must, may, unless and except carry the meaning in policy texts.', 'Not Given is common for things like pay, which policies often do not mention.'] }); } }],
    sets,
    checks: { 'five workplace texts with valid questions': (data, assert) => {
      const s = sets(data.gt_texts);
      assert.equal(s.length, 5);
      for (const set of s) for (const q of set.questions) assert.deepEqual(SK.validateItem(q), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
