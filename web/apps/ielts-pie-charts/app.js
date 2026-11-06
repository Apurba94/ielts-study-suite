/* Task 1 Pie Charts: generated pairs of pie charts with proportions to describe and compare. */
(function () {
  'use strict';
  const App = {
    about: 'Pie charts show proportions of a whole, usually two pies from different years to compare. Every pair here is generated and adds up to exactly 100 per cent. Practise the key features, then a timed report using the language of proportion (just over a quarter, roughly a third).',
    how: ['In **Key features**, decide which statements are true and choose the overview.', 'In **Write**, compare the two years: which shares grew, which shrank, which stayed the largest.', 'Practise proportion phrases in the Proportions and Approximation app.'],
    tabs: SK.task1Tabs('pie'),
    checks: { 'every pie adds up to 100 per cent': (data, assert) => {
      for (let s = 1; s < 200; s++) { const d = SK.ielts.chartData(s, 'pie'); for (let j = 0; j < 2; j++) assert.equal(SK.sum(d.series.map((x) => x.values[j])), 100); assert.ok(d.series.every((x) => x.values.every((v) => v > 0))); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
