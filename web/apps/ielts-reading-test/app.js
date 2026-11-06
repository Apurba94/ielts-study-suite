/* Reading Test Simulator: three sections in 60 minutes, Academic or General Training, with an approximate band. */
(function () {
  'use strict';
  const MIXES = [['headings', 'summary', 'tfng'], ['info', 'endings', 'short', 'mcq'], ['headings', 'tfng', 'mcq', 'short']];
  const gtSet = (g) => ({ id: g.id, title: g.title, passageTitle: g.title, passage: g.text, limit: 'ONE WORD AND/OR A NUMBER', questions: g.questions.map((q, k) => Object.assign({ id: g.id + '-' + k, topic: 'Section ' + g.section, noLetters: q.choices && q.choices[0] === 'True' }, q)) });
  const merge = (sets, title) => ({ id: sets.map((s) => s.id).join('+'), title, passageTitle: title, passage: sets.map((s) => '**' + s.passageTitle + '**\n' + s.passage).join('\n\n'), limit: 'ONE WORD AND/OR A NUMBER', questions: sets.flatMap((s) => s.questions) });
  const build = (data, mode, seed) => {
    const r = SK.rng(seed);
    if (mode === 'academic') return SK.sample(r, data.reading_passages, 3).map((p, i) => ({ label: 'Passage ' + (i + 1), set: SK.ielts.passageSet(p, MIXES[i], seed + i) }));
    const s1 = SK.sample(r, data.gt_texts.filter((g) => g.section === 1), 2).map(gtSet);
    const s2 = SK.sample(r, data.gt_texts.filter((g) => g.section === 2), 2).map(gtSet);
    const p = SK.pick(r, data.reading_passages);
    return [{ label: 'Section 1', set: merge(s1, 'Section 1: everyday texts') }, { label: 'Section 2', set: merge(s2, 'Section 2: workplace texts') }, { label: 'Section 3', set: SK.ielts.passageSet(p, ['headings', 'tfng', 'mcq'], seed) }];
  };
  const App = {
    about: 'A full Reading practice test with three sections in 60 minutes. The Academic form has three long passages with mixed question types. The General Training form has two everyday texts, two workplace texts and one longer passage. Raw scores are scaled to 40 and converted with the approximate published table for your module.',
    how: ['Choose Academic or General Training, and allow an hour without breaks.', 'Move between sections with the buttons at the top. There is no extra time to transfer answers.', 'Press Finish the test when done. The band is approximate.'],
    tabs: [
      { id: 'test', label: 'Test', render(el, ctx) {
        let mode = SK.store.get('ielts-reading-test.mode', 'academic');
        el.appendChild(SK.card('Reading test', SK.select([['academic', 'Academic'], ['general', 'General Training']], mode, (v) => { mode = v; SK.store.set('ielts-reading-test.mode', v); }, 'Module'),
          SK.h('div', { style: { marginTop: '12px' } }, SK.btn('Start the test', () => SK.testRun(el, build(ctx.data, mode, SK.seedNow()), { title: 'IELTS Reading practice test (' + (mode === 'academic' ? 'Academic' : 'General Training') + ')', seconds: 60 * 60, table: mode }), '', { 'data-auto': 'once' }))));
      } },
      { id: 'bands', label: 'Band tables', render(el) {
        const rows = (t) => SK.ielts.TABLES[t].map(([min, b], i, all) => [i === 0 ? min + '-40' : min + '-' + (all[i - 1][0] - 1), b]);
        el.appendChild(SK.card('Academic Reading (approximate)', SK.table(['Raw score', 'Band'], rows('academic'), false)));
        el.appendChild(SK.card('General Training Reading (approximate)', SK.table(['Raw score', 'Band'], rows('general'), false), SK.note('General Training needs more correct answers for the same band, because its texts are easier.')));
      } },
    ],
    build,
    checks: { 'both forms build three sections of valid questions': (data, assert) => {
      for (const mode of ['academic', 'general']) for (let s = 1; s < 20; s++) {
        const parts = build(data, mode, s);
        assert.equal(parts.length, 3);
        const n = SK.sum(parts.map((p) => p.set.questions.length));
        assert.ok(n >= 28 && n <= 50, mode + ' ' + n);
        for (const p of parts) for (const q of p.set.questions) assert.deepEqual(SK.validateItem(q), []);
      }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
