/* IELTS Error Log: every question missed in any app of the suite, to retry and annotate. */
(function () {
  'use strict';
  const byApp = (mistakes) => { const c = {}; for (const m of mistakes) c[m.title] = (c[m.title] || 0) + 1; return Object.entries(c).sort((a, b) => b[1] - a[1]); };
  const byTopic = (mistakes) => { const c = {}; for (const m of mistakes) if (m.topic) c[m.topic] = (c[m.topic] || 0) + 1; return Object.entries(c).sort((a, b) => b[1] - a[1]); };
  const App = {
    about: 'Every question you miss in any app of this suite, from a misspelled word in Listening to a wrong heading in Reading, is logged here with the question itself. Retry them, write a note on why you missed each, and see which apps and question types cause the most trouble.',
    how: ['Practise in any app; misses appear in **Mistakes**.', 'Add a short note: misheard, spelling, did not know the word, ran out of time.', 'Retry them as a set, and use **Patterns** to see where to focus.'],
    tabs: [
      { id: 'log', label: 'Mistakes', render(el) { SK.mistakesView(el, 'IELTS'); } },
      { id: 'patterns', label: 'Patterns', render(el) {
        const m = SK.store.get('suite.mistakes', []).filter((x) => x.exam === 'IELTS');
        el.appendChild(SK.card('Mistakes by app', m.length ? SK.table(['App', 'Mistakes'], byApp(m).slice(0, 15)) : SK.h('p', { class: 'sk-muted', text: 'No mistakes logged yet.' })));
        if (m.length) el.appendChild(SK.card('Mistakes by question type', SK.table(['Type', 'Mistakes'], byTopic(m).slice(0, 15))));
      } },
    ],
    byApp, byTopic,
    checks: { 'mistakes are counted by app and by type': (data, assert) => {
      assert.deepEqual(byApp([{ title: 'A' }, { title: 'B' }, { title: 'A' }]), [['A', 2], ['B', 1]]);
      assert.deepEqual(byTopic([{ topic: 'TFNG' }, { topic: '' }, { topic: 'TFNG' }]), [['TFNG', 2]]);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
