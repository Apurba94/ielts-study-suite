/* Task 1 Maps: describe how a place changed between two maps. */
(function () {
  'use strict';
  const items = (maps, seed) => {
    const r = SK.rng(seed);
    return maps.flatMap((m) => SK.sample(r, m.true.map((t) => [t, 0]).concat(m.false.map((t) => [t, 1])), 4).map(([t, a], k) => ({ id: m.id + '-c' + k + '-' + a, type: 'single', fixedOrder: true, noLetters: true, topic: 'Map changes', stem: '**' + m.title + '**\n' + t, choices: ['True', 'False'], answer: a, explanation: a ? 'The maps do not show this.' : 'The maps show this change.', figure: { kind: 'plans', title: m.title, before: m.before, after: m.after } })));
  };
  const task = (m) => 'The maps below show ' + m.title.replace(/^\w/, (c) => c.toLowerCase()) + '.\nSummarise the information by choosing and reporting the main features, and make comparisons where relevant.\nWrite at least 150 words.';
  const LANG = [['Building', 'was built, was constructed, was added, was extended'], ['Removing', 'was demolished, was knocked down, was removed, was replaced by'], ['Changing use', 'was converted into, became, now houses'], ['No change', 'remained, was kept, stayed the same'], ['Location', 'to the north of, next to, opposite, in the north-west corner, along the river']];
  const App = {
    about: 'Some Task 1 questions show two maps of the same place at different times, and you describe the changes. The language is about building, removing and converting, and about location. Four original pairs of maps, a true-or-false quiz on the changes and timed writing.',
    how: ['In **Changes**, decide which statements describe real changes.', 'Learn the verbs and location phrases in **Language**: mostly passive verbs.', 'In **Write**, give an overview of the biggest change first, then the details.'],
    tabs: [
      { id: 'changes', label: 'Changes', render(el, ctx) { SK.quiz(el, items(ctx.data.maps, SK.seedNow()), { title: 'What changed?', mode: 'practice' }); } },
      { id: 'write', label: 'Write', render(el, ctx) {
        const m = ctx.data.maps[SK.store.get('ielts-maps-writing.i', 0) % ctx.data.maps.length];
        const prompt = SK.h('div', {}, SK.h('p', { style: { whiteSpace: 'pre-line' }, text: task(m) }), SK.figures.plans({ title: m.title, before: m.before, after: m.after }),
          SK.btn('Another pair of maps', () => { SK.store.set('ielts-maps-writing.i', SK.store.get('ielts-maps-writing.i', 0) + 1); SK.show('write'); }, 'ghost small'));
        SK.writer(el, { key: m.id, title: 'Describe the changes', prompt, promptText: task(m), minutes: 20, target: [150, 200], paragraphs: 3, checklist: ['My overview says what kind of place it became, for example more residential.', 'I used the passive: was built, was replaced by.', 'I described locations clearly.', 'I mentioned what did not change.', 'I wrote at least 150 words.'] });
      } },
      { id: 'lang', label: 'Language', render(el) { el.appendChild(SK.card('Language for maps', SK.table(['Use', 'Phrases'], LANG, false))); } },
    ],
    items, task,
    checks: { 'quiz items are valid and both answers occur': (data, assert) => { const it = items(data.maps, 3); assert.ok(it.some((x) => x.answer === 0) && it.some((x) => x.answer === 1)); for (const x of it) assert.deepEqual(SK.validateItem(x), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
