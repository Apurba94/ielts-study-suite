/* Task 1 Bar Charts: generated bar charts to describe and compare, with timed writing. */
(function () {
  'use strict';
  const App = {
    about: 'Bar charts in Task 1 usually compare several categories across a few years or groups. Every chart here is generated, with three categories over four periods. Check the key features, then write a report that compares rather than lists, in 20 minutes.',
    how: ['In **Key features**, judge the statements and choose the best overview.', 'In **Write**, group the bars into two or three main comparisons; do not describe every bar.', 'Use **Plan** to check your overview and details.'],
    tabs: SK.task1Tabs('bar'),
    checks: { 'generated bar charts are valid': (data, assert) => {
      for (let s = 1; s < 100; s++) { const d = SK.ielts.chartData(s, 'bar'); assert.equal(d.series.length, 3); assert.equal(d.xs.length, 4); for (const it of SK.ielts.task1Items(d, s)) assert.deepEqual(SK.validateItem(it), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
