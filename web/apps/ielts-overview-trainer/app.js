/* Task 1 Overview Trainer: choose the best overview for a generated chart. */
(function () {
  'use strict';
  const KINDS = ['line', 'bar', 'table', 'pie'];
  const items = (n, seed) => {
    const out = [];
    for (let k = 0; out.length < n && k < n * 5; k++) {
      const d = SK.ielts.chartData(seed + k, KINDS[k % 4]);
      const r = SK.rng(seed + k);
      const ov = SK.ielts.overviewItem(d, r);
      if (!ov) continue;
      out.push(Object.assign(SK.shuffleItem(r, ov), { id: ov.id + '-' + d.kind, topic: 'Overview (' + d.kind + ')', figure: d.kind === 'table' ? undefined : d,
        table: d.kind === 'table' ? { head: [''].concat(d.xs), rows: d.series.map((s) => [s.name].concat(s.values)) } : undefined }));
    }
    return out;
  };
  const App = {
    about: 'The overview is the sentence or two that sums up a chart: the main trends or the biggest differences, with no detailed numbers. Without one, a Task 1 answer is unlikely to score well for task achievement. Choose the best overview for generated charts, where the wrong options are too detailed, wrong or too vague.',
    how: ['Look at the chart and ask: what are the two biggest things it shows?', 'Choose the overview that says those things without numbers.', 'Write an overview like it in every Task 1 report, after the introduction or at the end.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el) { SK.quizStarter(el, { title: 'Choose the overview', sizes: [5, 10], make: (t, n, s) => items(n, s), seconds: (n) => n * 60 }); } }],
    items,
    checks: { 'overview items are valid for all four chart kinds': (data, assert) => {
      const it = items(40, 1);
      assert.ok(it.length >= 30);
      for (const x of it) { assert.deepEqual(SK.validateItem(x), []); assert.ok(x.choices[x.answer].startsWith('Overall,')); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
