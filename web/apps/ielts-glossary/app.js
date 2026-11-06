/* IELTS Terms Glossary: plain explanations of the terms in IELTS guides and results. */
(function () {
  'use strict';
  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const items = (gl, n, seed) => { const r = SK.rng(seed); return SK.sample(r, gl, n).map((x) => SK.shuffleItem(r, { id: 'gq-' + x.id, type: 'single', topic: 'Terms', stem: 'Which term matches this description?\n' + x.def.replace(new RegExp(escape(x.term), 'gi'), '___'), choices: [x.term].concat(SK.sample(r, gl.filter((o) => o.id !== x.id), 3).map((o) => o.term)), answer: 0, explanation: '**' + x.term + '**: ' + x.def })); };
  const App = {
    about: 'Twenty-eight plain explanations of the terms you meet in IELTS guides and results, from Academic and General Training to the overall band rounding rule, the four marking criteria, One Skill Retake and the Test Report Form. Search them, and quiz yourself. Policies change, so check ielts.org for the current rules.',
    how: ['Search in **Glossary**.', 'Test yourself in **Quiz**.', 'For anything about booking, fees or results, check ielts.org or your test centre.'],
    tabs: [
      { id: 'list', label: 'Glossary', render(el, ctx) {
        let term = '';
        const out = SK.h('div', {});
        const draw = () => { SK.clear(out); out.appendChild(SK.table(['Term', 'Meaning'], ctx.data.glossary.filter((x) => !term || SK.norm(x.term + ' ' + x.def).includes(SK.norm(term))).map((x) => [SK.h('strong', { text: x.term }), x.def]))); };
        el.appendChild(SK.card('Glossary', SK.field('Search', SK.h('input', { type: 'text', oninput: (e) => { term = e.target.value; draw(); } })), out));
        draw();
      } },
      { id: 'quiz', label: 'Quiz', render(el, ctx) { SK.quizStarter(el, { title: 'IELTS terms', sizes: [10, 20, 28], make: (t, n, s) => items(ctx.data.glossary, n, s), seconds: (n) => n * 30 }); } },
    ],
    items,
    checks: { 'quiz descriptions never give away the term': (data, assert) => {
      for (const it of items(data.glossary, 28, 1)) { assert.deepEqual(SK.validateItem(it), []); assert.ok(!it.stem.toLowerCase().includes(it.choices[it.answer].toLowerCase()), it.id); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
