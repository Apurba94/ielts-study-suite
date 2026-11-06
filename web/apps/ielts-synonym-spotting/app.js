/* Synonym Spotting: match the words in questions to the different words the passage uses for the same idea. */
(function () {
  'use strict';
  const App = {
    about: 'IELTS questions almost never use the same words as the passage. A question about a "decline" points to a passage that says "decrease"; "people living there" becomes "inhabitants". Sixty pairs of question words and passage words, so you learn to look for meaning rather than matching words.',
    how: ['In **Practice**, choose the passage word that expresses the same idea as the question word.', 'In **Pairs**, learn the list; say each pair aloud.', 'When you practise reading, underline the question word and its synonym in the passage.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.synonyms, { sizes: [10, 20, 40], modes: false }),
      { id: 'pairs', label: 'Pairs', render(el, ctx) { el.appendChild(SK.card('Question word and passage word', SK.table(['In the question', 'In the passage'], ctx.data.synonyms.map((x) => [x.stem.match(/\*\*(.+?)\*\*/)[1], x.choices[0]])))); } },
    ],
    checks: { 'every pair is valid with distinct options': (data, assert) => { assert.ok(data.synonyms.length >= 50); for (const it of data.synonyms) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
