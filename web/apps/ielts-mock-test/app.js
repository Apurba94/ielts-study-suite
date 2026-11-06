/* IELTS Mock Test: Listening, Reading, Writing and Speaking in test order, timed. */
(function () {
  'use strict';
  const MIXES = [['headings', 'summary', 'tfng'], ['info', 'endings', 'short', 'mcq'], ['headings', 'tfng', 'mcq', 'short']];
  const gtSet = (g) => ({ id: g.id, title: g.title, passageTitle: g.title, passage: g.text, limit: 'ONE WORD AND/OR A NUMBER', questions: g.questions.map((q, k) => Object.assign({ id: g.id + '-' + k, topic: 'Section ' + g.section, noLetters: q.choices && q.choices[0] === 'True' }, q)) });
  const listening = (data, seed) => {
    const r = SK.rng(seed), call = SK.ielts.formCall(seed);
    return [{ label: 'Part 1', set: { id: call.id, title: call.title, limit: 'ONE WORD AND/OR A NUMBER', audio: { title: 'Part 1', lines: call.lines }, questions: call.questions } }]
      .concat([['Part 2', data.listening_talks], ['Part 3', data.listening_discussions], ['Part 4', data.listening_lectures]].map(([label, bank]) => ({ label, set: SK.listeningSet(SK.pick(r, bank)) })));
  };
  const reading = (data, mode, seed) => {
    const r = SK.rng(seed + 7);
    if (mode === 'academic') return SK.sample(r, data.reading_passages, 3).map((p, i) => ({ label: 'Passage ' + (i + 1), set: SK.ielts.passageSet(p, MIXES[i], seed + i) }));
    return [1, 2].map((s) => ({ label: 'Section ' + s, set: gtSet(SK.pick(r, data.gt_texts.filter((g) => g.section === s))) })).concat([{ label: 'Section 3', set: SK.ielts.passageSet(SK.pick(r, data.reading_passages), ['headings', 'tfng', 'mcq'], seed) }]);
  };
  const STAGES = ['Listening', 'Reading', 'Writing', 'Speaking'];
  const App = {
    about: 'A full mock test in the order of the real one: Listening (about 30 minutes), Reading (60 minutes), Writing (60 minutes, Task 1 then Task 2) and Speaking (11 to 14 minutes), in Academic or General Training form. Listening and Reading are marked with approximate bands; Writing gets length and pattern feedback; Speaking is recorded. Allow about three hours.',
    how: ['Choose your module and allow about three hours, with a short break before Speaking if you like.', 'Each stage starts when you press its button. Do them in order, as on test day.', 'At the end, record your Listening and Reading bands, and judge Writing and Speaking with the self-check apps, in the Score Tracker.'],
    tabs: [{ id: 'mock', label: 'Mock test', render(el, ctx) {
      const st = SK.store.get('ielts-mock-test.state', { mode: 'academic', results: {} });
      const save = () => SK.store.set('ielts-mock-test.state', st);
      const run = (stage) => {
        const seed = SK.seedNow();
        SK.clear(el);
        if (stage === 'Listening') SK.testRun(el, listening(ctx.data, seed), { title: 'Mock test: Listening', seconds: 26 * 60, table: 'listening', onFinish: (r) => { st.results.Listening = r.band; save(); el.appendChild(SK.btn('Back to the mock test', () => SK.show('mock'), '', { 'data-auto': 'once' })); } });
        else if (stage === 'Reading') SK.testRun(el, reading(ctx.data, st.mode, seed), { title: 'Mock test: Reading', seconds: 60 * 60, table: st.mode, onFinish: (r) => { st.results.Reading = r.band; save(); el.appendChild(SK.btn('Back to the mock test', () => SK.show('mock'), '', { 'data-auto': 'once' })); } });
        else if (stage === 'Writing') {
          const e = SK.pick(SK.rng(seed), ctx.data.essay_prompts), l = SK.pick(SK.rng(seed + 1), ctx.data.letters), d = SK.ielts.chartData(seed, SK.pick(SK.rng(seed), ['line', 'bar', 'pie', 'table']));
          const t1 = SK.h('div', {}), t2 = SK.h('div', {});
          const task1 = st.mode === 'academic' ? SK.h('div', {}, SK.h('p', { style: { whiteSpace: 'pre-line' }, text: SK.ielts.task1Text(d) }), d.kind === 'table' ? SK.table([''].concat(d.xs), d.series.map((s) => [s.name].concat(s.values)), false) : SK.figures[d.kind](d)) : l.situation + '\n' + l.task + ' In your letter:\n' + l.bullets.map((b) => '- ' + b).join('\n') + '\nWrite at least 150 words.';
          el.append(SK.card('Writing: 60 minutes for both tasks', SK.h('p', { class: 'sk-muted', text: 'Spend about 20 minutes on Task 1 and 40 on Task 2.' })), t1, t2, SK.btn('Back to the mock test', () => { st.results.Writing = 'done'; save(); SK.show('mock'); }, 'ghost', { 'data-auto': 'once' }));
          SK.writer(t1, { key: 'mock-t1', title: 'Task 1', prompt: task1, minutes: 60, target: [150, 200], paragraphs: 3 });
          SK.writer(t2, { key: 'mock-t2', title: 'Task 2', prompt: e.prompt + '\n' + e.question + '\nWrite at least 250 words.', target: [250, 320], paragraphs: 4 });
        } else {
          const p1 = SK.pick(SK.rng(seed), ctx.data.speaking_part1), c = SK.pick(SK.rng(seed + 2), ctx.data.cue_cards);
          const qs = p1.questions.concat(['**' + c.title + '**\nYou should say:\n' + c.points.map((p) => '- ' + p).join('\n') + '\n' + c.explain + '\n(Prepare for a minute in your head, then speak for up to two minutes.)'], c.part3);
          SK.askAndRecord(el, qs, { title: 'Speaking', seconds: 120, onDone: () => { st.results.Speaking = 'done'; save(); el.appendChild(SK.btn('Back to the mock test', () => SK.show('mock'), '', { 'data-auto': 'once' })); } });
        }
      };
      el.appendChild(SK.card('Mock test', SK.select([['academic', 'Academic'], ['general', 'General Training']], st.mode, (v) => { st.mode = v; save(); }, 'Module'),
        SK.table(['Stage', 'Result', ''], STAGES.map((s) => [s, st.results[s] === undefined ? '-' : st.results[s] === null ? 'below 2.5' : st.results[s], SK.btn('Start ' + s, () => run(s), 'ghost small', s === 'Listening' ? { 'data-auto': 'once' } : {})]), false),
        SK.confirmTwice(SK.btn('Start a new mock test', null, 'ghost small'), 'Start a new mock test', () => { st.results = {}; save(); SK.show('mock'); })));
    } }],
    listening, reading,
    checks: { 'both modules build valid Listening and Reading sections': (data, assert) => {
      for (let s = 1; s < 10; s++) {
        for (const p of listening(data, s)) for (const q of p.set.questions) assert.deepEqual(SK.validateItem(q), []);
        for (const mode of ['academic', 'general']) { const r = reading(data, mode, s); assert.equal(r.length, 3); for (const p of r) for (const q of p.set.questions) assert.deepEqual(SK.validateItem(q), []); }
      }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
