/* Everyday Texts (General Training): notices, adverts, timetables and leaflets with Section 1 style questions. */
(function () {
  'use strict';
  const sets = (bank, section) => bank.filter((g) => g.section === section).map((g) => ({ id: g.id, title: g.title + ' (' + g.kind.toLowerCase() + ')', passageTitle: g.title, passage: g.text, limit: g.questions.some((q) => q.type === 'text') ? 'ONE WORD AND/OR A NUMBER' : '',
    instructions: 'Read the text and answer the questions.', questions: g.questions.map((q, k) => Object.assign({ id: g.id + '-' + k, topic: g.kind, noLetters: q.choices && q.choices[0] === 'True' }, q)) }));
  const App = {
    about: 'Section 1 of General Training Reading uses short everyday texts: notices, advertisements, timetables and leaflets. Questions ask about details such as prices, times and rules. Six original texts with True, False or Not Given, matching and short-answer questions.',
    how: ['Skim the text to see what kind it is and how it is organised.', 'Scan for the detail each question needs: a time, a price, a rule.', 'For True, False or Not Given, be strict: if the text does not say it, it is Not Given.'],
    tabs: [{ id: 'sets', label: 'Texts', render(el, ctx) { SK.setBank(el, { title: 'Everyday texts', sets: sets(ctx.data.gt_texts, 1), view: { seconds: 8 * 60 },
      tips: ['Everyday texts are short: aim for about eight minutes each.', 'In matching tasks with lettered adverts, one advert can be the answer to more than one question.'] }); } }],
    sets,
    checks: { 'six everyday texts with valid questions': (data, assert) => {
      const s = sets(data.gt_texts, 1);
      assert.equal(s.length, 6);
      for (const set of s) for (const q of set.questions) { assert.deepEqual(SK.validateItem(q), []); assert.ok(SK.isCorrect(q, q.answer)); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
