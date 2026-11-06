/* Band Score Calculator: raw scores to approximate bands, and the overall band with the rounding rule. */
(function () {
  'use strict';
  const I = SK.ielts;
  const HALVES = SK.range(19).map((x) => x / 2);
  const App = {
    about: 'Turn Listening and Reading raw scores (out of 40) into approximate bands using the guide tables IELTS publishes, and work out an overall band from four skill bands. The overall band is the average rounded to the nearest half band, with averages ending in .25 rounded up to the next half band and .75 up to the next whole band. It also shows how many more correct answers reach the next band.',
    how: ['In **Overall**, choose a band for each skill to see the average and the overall band.', 'In **Raw scores**, enter how many answers you got right to see the approximate band.', 'The raw-score tables are approximate: real tests convert slightly differently from version to version.'],
    tabs: [
      { id: 'overall', label: 'Overall', render(el) {
        const st = SK.store.get('ielts-band-calculator.bands', { listening: 6.5, reading: 6.5, writing: 6, speaking: 6 });
        const out = SK.h('div', {});
        const draw = () => {
          const bands = [st.listening, st.reading, st.writing, st.speaking].map(Number);
          const mean = SK.sum(bands) / 4, ov = I.overall(bands);
          SK.clear(out).appendChild(SK.stats([['Average', SK.round(mean, 3)], ['Overall band', ov], ['CEFR (broad guide)', I.cefr(ov)]]));
          out.appendChild(SK.note('Average ' + SK.round(mean, 3) + ' rounds to ' + ov + '.' + (Math.abs(mean - Math.floor(mean) - 0.25) < 1e-9 ? ' An average ending in .25 goes up to the next half band.' : Math.abs(mean - Math.floor(mean) - 0.75) < 1e-9 ? ' An average ending in .75 goes up to the next whole band.' : '')));
        };
        el.appendChild(SK.card('Overall band', SK.h('div', { class: 'sk-row' }, ['listening', 'reading', 'writing', 'speaking'].map((k) => SK.select(HALVES, st[k], (v) => { st[k] = Number(v); SK.store.set('ielts-band-calculator.bands', st); draw(); }, k[0].toUpperCase() + k.slice(1)))), out));
        draw();
      } },
      { id: 'raw', label: 'Raw scores', render(el) {
        const out = SK.h('div', {});
        let raw = 30, kind = 'listening';
        const draw = () => {
          const b = I.band(raw, kind);
          const next = I.TABLES[kind].slice().reverse().find((row) => row[0] > raw);
          SK.clear(out).appendChild(SK.stats([['Raw score', raw + ' / 40'], ['Approximate band', b === null ? 'below 2.5' : b]]));
          if (next) out.appendChild(SK.note('About ' + (next[0] - raw) + ' more correct answer' + (next[0] - raw === 1 ? '' : 's') + ' would reach band ' + next[1] + '.'));
        };
        el.appendChild(SK.card('Raw score to band', SK.h('div', { class: 'sk-row' }, SK.select([['listening', 'Listening'], ['academic', 'Academic Reading'], ['general', 'General Training Reading']], kind, (v) => { kind = v; draw(); }, 'Test'),
          SK.field('Correct answers', SK.h('input', { type: 'number', min: 0, max: 40, value: raw, style: { width: '7ch' }, oninput: (e) => { raw = Math.max(0, Math.min(40, Number(e.target.value) || 0)); draw(); } }))), out,
          SK.h('p', { class: 'sk-small sk-muted', text: 'Approximate guide tables only. Writing and Speaking bands come from examiners, not from a raw score.' })));
        draw();
      } },
    ],
    checks: { 'overall bands follow the rounding rule for every combination tested': (data, assert) => {
      assert.equal(I.overall([6, 6.5, 6, 6.5]), 6.5);
      assert.equal(I.overall([6.5, 6.5, 7, 7]), 7);
      for (const a of HALVES) for (const b of [5, 6.5]) for (const c of [6, 7.5]) for (const d of [4.5, 8]) assert.equal(I.overall([a, b, c, d]), Math.floor(((a + b + c + d) / 4) * 2 + 0.5) / 2);
      assert.equal(I.band(30, 'listening'), 7);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
