/* Task 1 Tables: generated tables of figures to group and report. */
(function () {
  'use strict';
  const App = {
    about: 'Tables give you many numbers and no picture, so the skill is choosing what to report: the largest and smallest, the biggest changes, and groups that behave alike. Each table here is generated, with four categories over four periods. Check the key features, then write the report.',
    how: ['In **Key features**, judge the statements against the numbers.', 'In **Write**, report the main features and group similar rows; you cannot mention every number.', 'Check **Plan** for the facts worth reporting.'],
    tabs: SK.task1Tabs('table'),
    checks: { 'generated tables have four rows and four columns': (data, assert) => {
      for (let s = 1; s < 100; s++) { const d = SK.ielts.chartData(s, 'table'); assert.equal(d.series.length, 4); assert.equal(d.xs.length, 4); for (const it of SK.ielts.task1Items(d, s)) assert.deepEqual(SK.validateItem(it), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
