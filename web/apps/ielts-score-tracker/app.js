/* IELTS Score Tracker: practice bands for the four skills, the overall band and the trend. */
(function () {
  'use strict';
  const FIELDS = ['listening', 'reading', 'writing', 'speaking'].map((k) => ({ key: k, label: k[0].toUpperCase() + k.slice(1), min: 0, max: 9, step: 0.5 }));
  // Overall band for each logged row that has all four skills.
  const overalls = (scores) => scores.filter((s) => FIELDS.every((f) => typeof s[f.key] === 'number')).map((s) => ({ day: s.day, overall: SK.ielts.overall(FIELDS.map((f) => s[f.key])) }));
  const App = {
    about: 'Record your practice bands for Listening, Reading, Writing and Speaking, in half bands from 0 to 9. When all four are entered, the tracker works out the overall band with the official rounding rule. Set targets for each skill and watch the trend lines.',
    how: ['After each practice test, add your bands in **Scores**. Leave a skill empty if you did not practise it.', 'Set targets from your university or visa requirements.', 'See your overall band over time in **Overall**.'],
    tabs: [
      { id: 'scores', label: 'Scores', render(el) { SK.scoreLog(el, { fields: FIELDS }); } },
      { id: 'overall', label: 'Overall', render(el) {
        const o = overalls(SK.store.get('ielts-score-tracker.scores', []));
        el.appendChild(SK.card('Overall band', o.length ? SK.h('div', {}, SK.chart.line(o.map((x) => ({ y: x.overall, label: x.day })), { min: 0, max: 9, label: 'Overall band' }), SK.table(['Date', 'Overall'], o.slice().reverse().map((x) => [x.day, x.overall]))) : SK.h('p', { class: 'sk-muted', text: 'Add a row with all four skills to see your overall band.' })));
      } },
    ],
    FIELDS, overalls,
    checks: { 'four skills on the 0 to 9 scale, overall only when all four are present': (data, assert) => {
      assert.equal(FIELDS.length, 4);
      for (const f of FIELDS) { assert.equal(f.max, 9); assert.equal(f.step, 0.5); }
      assert.deepEqual(overalls([{ day: 'd', listening: 6, reading: 6.5, writing: 6, speaking: 6.5 }, { day: 'e', listening: 7 }]), [{ day: 'd', overall: 6.5 }]);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
