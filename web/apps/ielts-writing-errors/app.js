/* Common Writing Errors: find and fix the mistakes that cost marks most often. */
(function () {
  'use strict';
  const bank = (ctx) => ctx.data.errors.concat(ctx.data.writing_errors);
  const App = {
    about: 'A few kinds of error appear again and again in IELTS writing: subject-verb agreement (the number of tourists has), uncountable nouns (information, not informations), articles, word forms, prepositions with numbers (increased by 10 per cent) and comma splices. Thirty-two questions, each with the rule.',
    how: ['Pick an area in **Practice**, or All.', 'Choose the correct sentence and read the rule, even when you are right.', 'Keep a list of your own repeated errors and check every essay for them.'],
    tabs: [SK.bankTab('practice', 'Practice', bank, { sizes: [10, 20, 32] })],
    checks: { 'every error question is valid': (data, assert) => { const all = data.errors.concat(data.writing_errors); assert.ok(all.length >= 30); for (const it of all) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
