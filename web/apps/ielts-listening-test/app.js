/* Listening Test Simulator: four parts heard once, then time to check, with an approximate band. */
(function () {
  'use strict';
  // Part 1 is a generated call; Parts 2 to 4 are drawn from the banks. Question numbers run on across parts.
  const build = (data, seed) => {
    const r = SK.rng(seed);
    const call = SK.ielts.formCall(seed);
    const p1 = { id: call.id, title: call.title, instructions: 'Complete the form.', limit: 'ONE WORD AND/OR A NUMBER', audio: { title: 'Part 1', lines: call.lines }, questions: call.questions };
    const pick = (bank) => SK.listeningSet(SK.pick(r, bank));
    return [{ label: 'Part 1', set: p1 }, { label: 'Part 2', set: pick(data.listening_talks) }, { label: 'Part 3', set: pick(data.listening_discussions) }, { label: 'Part 4', set: pick(data.listening_lectures) }];
  };
  const total = (parts) => SK.sum(parts.map((p) => p.set.questions.length));
  const App = {
    about: 'A full Listening practice test in the order of the real one: an everyday call, a talk, a discussion and an academic lecture, each heard once, with time to check at the end, as on computer. This practice test has about 30 questions rather than 40, so the raw score is scaled to 40 before it is converted to an approximate band with the published guide table.',
    how: ['Use headphones, find a quiet place and allow 30 minutes.', 'Press **Start the test**. For each part, read the questions, then press Play once.', 'Move between parts with the buttons at the top, then press Finish the test.', 'The band is approximate: real tests have 40 questions and their own conversion tables.'],
    tabs: [
      { id: 'test', label: 'Test', render(el, ctx) {
        el.appendChild(SK.card('Listening test', SK.h('p', { class: 'sk-muted', text: 'Four parts, each heard once. 26 minutes in all, including time to check.' }), SK.btn('Start the test', () => {
          SK.testRun(el, build(ctx.data, SK.seedNow()), { title: 'IELTS Listening practice test', seconds: 26 * 60, table: 'listening' });
        }, '', { 'data-auto': 'once' })));
      } },
      { id: 'bands', label: 'Band table', render(el) { el.appendChild(SK.card('Approximate Listening bands', SK.table(['Raw score (of 40)', 'Band'], SK.ielts.TABLES.listening.map(([min, b], i, t) => [i === 0 ? min + '-40' : min + '-' + (t[i - 1][0] - 1), b]), false), SK.note('These are the approximate conversions IELTS publishes as a guide. They vary slightly between versions of the test.'))); } },
    ],
    build, total,
    checks: { 'a test has four valid parts and around thirty questions': (data, assert) => {
      for (let s = 1; s < 40; s++) {
        const parts = build(data, s);
        assert.equal(parts.length, 4);
        const n = total(parts);
        assert.ok(n >= 26 && n <= 34, String(n));
        for (const p of parts) for (const q of p.set.questions) assert.deepEqual(SK.validateItem(q), []);
      }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
