/* Fluency Builder: speak on a topic without stopping, record it, and track how long you keep going. */
(function () {
  'use strict';
  const KEY = 'ielts-fluency-builder.log';
  // A simple self-score: fewer long pauses and fillers, and finishing the time, score higher.
  const score = (r) => Math.max(0, 10 - 2 * r.pauses - r.fillers + (r.finished ? 2 : 0));
  const App = {
    about: 'Fluency is a quarter of your Speaking score: keeping going without long pauses, and linking ideas as you speak. Get a random topic from the Part 2 cards, speak for one or two minutes without stopping, and record yourself. Then listen back and count long pauses and fillers such as um and er. The chart should show fewer of both over time.',
    how: ['Choose one or two minutes and press **New topic**. You get 15 seconds to think.', 'Speak until the time is up. Keep going even if you make mistakes.', 'Listen back and enter your counts honestly. The score is a self-check, not an IELTS band.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el, ctx) {
      const c = SK.pick(SK.rng(SK.seedNow()), ctx.data.cue_cards);
      const secs = SK.store.get('ielts-fluency-builder.secs', 60);
      const r = { pauses: 0, fillers: 0, finished: true };
      const num = (k, label) => SK.field(label, SK.h('input', { type: 'number', min: 0, max: 30, value: 0, style: { width: '7ch' }, oninput: (e) => { r[k] = Math.max(0, Number(e.target.value) || 0); } }));
      const out = SK.h('div', {});
      el.appendChild(SK.card('Speak without stopping', SK.h('div', { class: 'sk-passage', text: c.title + ' ' + c.explain.replace(/^and /, 'Explain ') }),
        SK.h('div', { class: 'sk-row' }, SK.select([[60, 'One minute'], [120, 'Two minutes']], secs, (v) => { SK.store.set('ielts-fluency-builder.secs', Number(v)); SK.show('practice'); }, 'Length'), SK.btn('New topic', () => SK.show('practice'), 'ghost small')),
        SK.h('div', { style: { marginTop: '10px' } }, SK.recorder({ prep: 15, seconds: secs })),
        SK.h('h3', { text: 'After you listen back' }), SK.h('div', { class: 'sk-row' }, num('pauses', 'Pauses over 3 seconds'), num('fillers', 'Fillers (um, er, like)'), SK.select([['1', 'I kept going to the end'], ['0', 'I stopped early']], '1', (v) => { r.finished = v === '1'; }, 'Did you finish?')),
        SK.h('div', { style: { marginTop: '10px' } }, SK.btn('Save', () => {
          const log = SK.store.get(KEY, []); log.push({ day: SK.dayKey(), topic: c.title, pauses: r.pauses, fillers: r.fillers, finished: r.finished, score: score(r) }); SK.store.set(KEY, log.slice(-300));
          SK.logPractice(secs / 60 + 0.5, 'Fluency');
          SK.clear(out).appendChild(SK.note('Fluency self-score: ' + score(r) + ' out of 12.', 'info'));
        }, '', { 'data-auto': 'once' })), out));
      const log = SK.store.get(KEY, []);
      if (log.length > 1) el.appendChild(SK.card('Your fluency over time', SK.chart.line(log.slice(-20).map((x) => ({ y: x.score, label: x.day })), { min: 0, max: 12, label: 'Fluency self-score' })));
    } }],
    score,
    checks: { 'the self-score rewards fewer pauses and fillers': (data, assert) => { assert.equal(score({ pauses: 0, fillers: 0, finished: true }), 12); assert.ok(score({ pauses: 2, fillers: 3, finished: true }) < 12); assert.equal(score({ pauses: 9, fillers: 9, finished: false }), 0); assert.ok(data.cue_cards.length >= 30); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
