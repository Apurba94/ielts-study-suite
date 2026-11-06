/* Reading Speed Trainer: measure words per minute on IELTS-style passages, with an understanding check. */
(function () {
  'use strict';
  const KEY = 'ielts-reading-speed.runs';
  const wpm = (words, seconds) => Math.round((words * 60) / Math.max(1, seconds));
  // The time one passage of n words takes at a speed, and whether 60 minutes is enough for three such passages.
  const budget = (words, speed) => ({ minutes: SK.round(words / speed, 1), threePassages: SK.round((3 * words) / speed, 0) });
  const App = {
    about: 'In Academic Reading you have 60 minutes for three passages of 700 to 900 words each and 40 questions. Reading speed alone does not win marks, but slow reading leaves no time for the questions. Time yourself on a passage, check understanding with True, False or Not Given statements, and see whether your speed leaves enough time.',
    how: ['Press **Start reading**, read the passage at your normal pace, then press Done.', 'Answer the statements without looking back.', 'Your speed only counts if you understood: aim for 4 out of 5 or better.'],
    tabs: [{ id: 'test', label: 'Speed test', render(el, ctx) {
      const p = SK.pick(SK.rng(SK.seedNow()), ctx.data.reading_passages);
      const text = p.paragraphs.join('\n\n'), n = SK.text.wordCount(text);
      let t0 = 0;
      const body = SK.h('div', {});
      const start = SK.btn('Start reading', () => {
        t0 = Date.now(); start.remove();
        body.appendChild(SK.h('div', { class: 'sk-passage', text }));
        body.appendChild(SK.h('div', { style: { marginTop: '10px' } }, SK.btn('Done reading', () => {
          const secs = (Date.now() - t0) / 1000;
          SK.clear(body);
          const qs = p.tfng.map((t, k) => SK.ielts.tfItem({ id: p.id + '-rs' + k, s: t.s, a: t.a }));
          SK.quiz(body, qs, { title: 'Check understanding (the passage is hidden)', mode: 'practice', review: false, onFinish: (sum) => {
            const speed = wpm(n, secs), runs = SK.store.get(KEY, []), b = budget(800, speed);
            runs.push({ day: SK.dayKey(), wpm: speed, pct: sum.pct }); SK.store.set(KEY, runs.slice(-200));
            body.prepend(SK.card('Your speed', SK.stats([['Words', n], ['Time', SK.formatTime(secs)], ['Words per minute', speed], ['Understanding', sum.pct + '%']]),
              SK.note('At this speed, reading three 800-word passages once takes about ' + b.threePassages + ' of your 60 minutes.' + (sum.pct < 60 ? ' Slow down a little: speed only helps when you understand.' : ''), sum.pct < 60 ? 'wrong' : 'info')));
          } });
        }, '', { 'data-auto': 'once' })));
      }, '', { 'data-auto': 'once' });
      el.appendChild(SK.card('Reading speed test', SK.h('p', { class: 'sk-muted', text: p.title + ' (' + n + ' words). Read once, then answer without looking back.' }), start, body));
      const runs = SK.store.get(KEY, []);
      if (runs.length > 1) el.appendChild(SK.card('History', SK.chart.line(runs.slice(-20).map((r) => ({ y: r.wpm, label: r.day })), { label: 'Words per minute' })));
    } }],
    wpm, budget,
    checks: { 'speed arithmetic': (data, assert) => { assert.equal(wpm(300, 60), 300); assert.equal(wpm(150, 90), 100); assert.deepEqual(budget(800, 200), { minutes: 4, threePassages: 12 }); assert.ok(data.reading_passages.every((p) => p.tfng.length >= 5)); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
