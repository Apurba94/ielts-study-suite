/* Punctuation Trainer: commas, semicolons, apostrophes and run-on sentences. */
(function () {
  'use strict';
  const RULES = [['Comma after an opening clause', 'After the lecture ended, we went to lunch.'], ['Comma before and, but, so joining two sentences', 'I wanted to go, but it was raining.'], ['No comma splice', 'Two sentences need a full stop or a semicolon, not just a comma.'], ['However between sentences', 'The test was hard. However, most students passed.'], ['Its and it\'s', 'Its = belonging to it. It\'s = it is.'], ['Plural possessive', 'The students\' books (books of many students).']];
  const App = {
    about: 'Punctuation errors such as comma splices (two sentences joined by a comma) count against grammatical accuracy in Writing. Practise the rules that matter most: commas after opening clauses, comma splices and run-ons, however between sentences, apostrophes and colons, with an explanation for each.',
    how: ['Read the six rules in **Rules**.', 'Choose the correctly punctuated sentence in **Practice**.', 'Check your own essays for comma splices before you finish.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.punctuation, { sizes: [6, 12] }),
      { id: 'rules', label: 'Rules', render(el) { el.appendChild(SK.card('Six rules', SK.table(['Rule', 'Example'], RULES, false))); } },
    ],
    checks: { 'every question is valid': (data, assert) => { for (const it of data.punctuation) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
