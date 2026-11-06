/* Grammar Drill: articles, tenses, agreement, prepositions and more, with the rule behind every answer. */
(function () {
  'use strict';
  const App = {
    about: 'Grammatical range and accuracy is a quarter of both your Writing and Speaking scores. Forty-four original questions cover the areas that cost the most marks: articles, tenses, subject-verb agreement, prepositions, conditionals, gerunds and infinitives, relative clauses, comparatives, the passive, countable nouns, word order and modals. Each answer explains the rule.',
    how: ['Pick one area, or All, in **Practice**.', 'Read each explanation, even when you are right.', 'Repeat your weakest area until you score 90 per cent or more.'],
    tabs: [SK.bankTab('practice', 'Practice', (ctx) => ctx.data.grammar, { sizes: [10, 20, 44] })],
    checks: { 'every question is valid and every area has at least two': (data, assert) => {
      for (const it of data.grammar) assert.deepEqual(SK.validateItem(it), []);
      const c = {}; data.grammar.forEach((x) => { c[x.topic] = (c[x.topic] || 0) + 1; }); for (const [t, n] of Object.entries(c)) assert.ok(n >= 2, t);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
