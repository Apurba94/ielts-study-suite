/* Cohesion Trainer: linking and reference words that join ideas naturally. */
(function () {
  'use strict';
  const bank = (ctx) => ctx.data.linking.concat(ctx.data.cohesion);
  const App = {
    about: 'Coherence and cohesion is a quarter of your Writing score. Cohesion is not about how many linking words you use: "Moreover, furthermore, in addition" in every sentence sounds mechanical. This app practises choosing the right link for the relationship (contrast, result, example, concession) and using reference words such as this, these and the former, with 35 questions.',
    how: ['Pick a relationship in **Practice**, or All.', 'Read each explanation: the difference between although and despite, or however and therefore.', 'In your essays, use a variety of links, and use reference words to avoid repeating nouns.'],
    tabs: [SK.bankTab('practice', 'Practice', bank, { sizes: [10, 20, 35] })],
    checks: { 'every cohesion question is valid': (data, assert) => { for (const it of data.linking.concat(data.cohesion)) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
