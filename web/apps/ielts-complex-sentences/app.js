/* Complex Sentence Builder: relative clauses, conditionals, participles and more. */
(function () {
  'use strict';
  const App = {
    about: 'Grammatical range means using a mix of structures accurately, not just long sentences. Practise joining simple sentences with relative clauses, conditionals, participle clauses, concession, cleft sentences and inversion, with 18 questions that show the common mistakes in each.',
    how: ['Pick a structure in **Practice**, or All.', 'Choose the correct sentence and read why the others are wrong.', 'Use two or three of these structures in each essay, but only ones you can write accurately.'],
    tabs: [SK.bankTab('practice', 'Practice', (ctx) => ctx.data.complex_sentences, { sizes: [6, 12, 18] })],
    checks: { 'every question is valid': (data, assert) => { for (const it of data.complex_sentences) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
