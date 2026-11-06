/* IELTS Weak Area Finder: a short diagnostic plus your results across the suite, to show what to study next. */
(function () {
  'use strict';
  const APP_FOR = { Listening: 'ielts-sentence-completion', Numbers: 'ielts-numbers-dates', Reading: 'ielts-tfng', Vocabulary: 'ielts-synonym-spotting', Grammar: 'ielts-grammar-drill', 'True / False / Not Given': 'ielts-tfng', 'Form completion': 'ielts-form-completion', 'Matching headings': 'ielts-matching-headings', 'Short answers': 'ielts-short-answers', 'Summary completion': 'ielts-summary-completion', Synonyms: 'ielts-synonym-spotting', Spelling: 'ielts-spelling-pitfalls', Overview: 'ielts-overview-trainer' };
  const diagnostic = (data, seed) => {
    const r = SK.rng(seed);
    const tag = (items, topic) => items.map((x) => Object.assign(x, { topic }));
    return tag(SK.sample(r, data.listening_clips, 4).map((c) => ({ id: 'd-' + c.id, type: 'text', stem: c.stem, audio: { title: 'Extract', text: c.say }, answer: c.answer, accept: c.accept || [] })), 'Listening')
      .concat(tag(SK.range(2).map(() => { const it = SK.ielts.numberItem(r); return Object.assign(it, { audio: { title: 'Listen', text: it.say } }); }), 'Numbers'),
        tag(SK.sample(r, data.tfng, 4).map((t) => Object.assign(SK.ielts.tfItem(t), { stem: '**Text:** ' + t.text + '\n\n**Statement:** ' + t.s })), 'Reading'),
        tag(SK.fromBank(r, data.synonyms, 'All', 3), 'Vocabulary'),
        tag(SK.fromBank(r, data.grammar, 'All', 3), 'Grammar'));
  };
  const App = {
    about: 'Sixteen quick items across listening, numbers, reading, vocabulary and grammar, combined with your results in every other app of the suite, show your weakest areas, with a link to the app that trains each. Writing and Speaking need a person to judge them, so use the self-check apps for those.',
    how: ['Turn on sound and press **Start the diagnostic**. It takes about 12 minutes.', 'Read the **Report**, which grows more reliable as you practise in other apps.'],
    tabs: [
      { id: 'diag', label: 'Diagnostic', render(el, ctx) { el.appendChild(SK.card('IELTS diagnostic', SK.btn('Start the diagnostic', () => SK.quiz(el, diagnostic(ctx.data, SK.seedNow()), { title: 'IELTS diagnostic', mode: 'test', seconds: 12 * 60 }), '', { 'data-auto': 'once' }))); } },
      { id: 'report', label: 'Report', render(el) {
        const weak = SK.weakAreas(SK.store.get('suite.sessions', []).filter((s) => s.exam === 'IELTS').map((s) => Object.assign({}, s, { exam: '' })), 2);
        el.appendChild(SK.card('Your weak areas', weak.length ? SK.table(['Area', 'Answers', 'Accuracy', 'Train with'], weak.slice(0, 12).map((w) => { const a = APP_FOR[w.topic.trim()]; return [w.topic.trim(), w.total, w.pct + '%', a ? SK.appLink(a, a.replace('ielts-', '').replace(/-/g, ' ')) : '']; })) : SK.h('p', { class: 'sk-muted', text: 'Take the diagnostic or practise in other apps to see a report.' })));
      } },
    ],
    diagnostic,
    checks: { 'the diagnostic covers five areas and is valid': (data, assert) => {
      for (let s = 1; s < 15; s++) { const d = diagnostic(data, s); assert.equal(d.length, 16); assert.equal(new Set(d.map((x) => x.topic)).size, 5); for (const it of d) assert.deepEqual(SK.validateItem(it), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
