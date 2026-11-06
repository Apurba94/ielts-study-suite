/* Task 1 Line Graphs: generated line graphs to describe, with key-feature questions and timed writing. */
(function () {
  'use strict';
  const App = {
    about: 'Academic Writing Task 1 often shows a line graph of changes over time. Each graph here is generated from trends with a clear shape (rising, falling, peaking, dipping, stable or fluctuating), so there is always something real to describe. Check the key features first, then write a 150-word report in 20 minutes, and compare it with a plan built from facts checked against the numbers.',
    how: ['In **Key features**, decide which statements about the graph are true and choose the best overview.', 'In **Write**, write your report. The timer is optional.', 'Compare your report with the facts in **Plan**. Press New chart for a fresh graph.'],
    tabs: SK.task1Tabs('line'),
    checks: { 'generated line graphs have six points and checkable features': (data, assert) => {
      for (let s = 1; s < 100; s++) { const d = SK.ielts.chartData(s, 'line'); assert.equal(d.xs.length, 6); for (const it of SK.ielts.task1Items(d, s)) assert.deepEqual(SK.validateItem(it), []); assert.ok(SK.ielts.task1Text(d).includes('at least 150 words')); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
