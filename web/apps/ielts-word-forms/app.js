/* Word Form Trainer: recognise parts of speech from endings and choose the right form. */
(function () {
  'use strict';
  const ENDINGS = [['noun', ['-tion', '-sion', '-ment', '-ity', '-ness', '-ance', '-ence', '-ism', '-ship']], ['verb', ['-ise / -ize', '-ify', '-ate', '-en']], ['adjective', ['-ous', '-ive', '-al', '-ful', '-able', '-ible', '-ic', '-ent', '-ant']], ['adverb', ['-ly']]];
  const PARTS = { noun: 'noun', verb: 'verb', adj: 'adjective', adv: 'adverb' };
  const posItems = (fams, n, seed) => {
    const r = SK.rng(seed), pool = [];
    for (const f of fams) for (const k of Object.keys(PARTS)) if (f[k] && !Object.keys(PARTS).some((o) => o !== k && f[o] === f[k])) pool.push([f[k], PARTS[k], f]);
    return SK.sample(r, pool, n).map(([w, pos, f]) => ({ id: 'pos-' + w, type: 'single', topic: 'Part of speech', stem: 'What part of speech is **' + w + '**?', choices: ['noun', 'verb', 'adjective', 'adverb'], answer: ['noun', 'verb', 'adjective', 'adverb'].indexOf(pos), fixedOrder: true, explanation: w + ' is a ' + pos + '. Its family: ' + Object.keys(PARTS).filter((k) => f[k]).map((k) => f[k]).join(', ') + '.' }));
  };
  // Choose the form that fits a frame: "The ___ of the data took weeks." needs a noun.
  const FRAMES = { noun: 'The ___ was discussed at length.', verb: 'We need to ___ the problem carefully.', adj: 'It was a very ___ result.', adv: 'The team worked ___ to finish on time.' };
  const formItems = (fams, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, fams.filter((f) => f.noun && f.verb && f.adj && f.adv && new Set([f.noun, f.verb, f.adj, f.adv]).size === 4), n).map((f) => {
      const k = SK.pick(r, Object.keys(FRAMES));
      return SK.shuffleItem(r, { id: 'wf-' + f[k], type: 'single', topic: 'Choose the form', stem: 'Which form fits? ' + FRAMES[k], choices: [f[k]].concat(Object.keys(FRAMES).filter((o) => o !== k).map((o) => f[o])), answer: 0, explanation: 'The gap needs a' + (k === 'adj' || k === 'adv' ? 'n ' : ' ') + PARTS[k] + ': ' + f[k] + '.' });
    });
  };
  const App = {
    about: 'Many Writing errors are word-form errors: economy development instead of economic development, a significantly increase instead of a significant increase. Completion tasks in Reading and Listening also need the right form for the gap. Learn the endings that signal each part of speech, then drill them on 60 word families.',
    how: ['Learn the endings in **Endings**.', 'Name the part of speech in **Part of speech**.', 'Choose the form that fits the sentence in **Choose the form**.'],
    tabs: [
      { id: 'endings', label: 'Endings', render(el) { el.appendChild(SK.card('Endings and parts of speech', SK.table(['Part of speech', 'Common endings'], ENDINGS.map(([p, e]) => [p, e.join(', ')]), false), SK.note('Endings are a strong hint, not a rule: friendly ends in -ly but is an adjective.'))); } },
      { id: 'pos', label: 'Part of speech', render(el, ctx) { SK.quizStarter(el, { title: 'Part of speech', sizes: [10, 20, 40], make: (t, n, s) => posItems(ctx.data.word_forms, n, s), seconds: (n) => n * 10 }); } },
      { id: 'form', label: 'Choose the form', render(el, ctx) { SK.quizStarter(el, { title: 'Choose the form', sizes: [10, 20], make: (t, n, s) => formItems(ctx.data.word_forms, n, s), seconds: (n) => n * 15 }); } },
    ],
    posItems, formItems,
    checks: { 'questions are valid and never ambiguous': (data, assert) => {
      for (let s = 1; s < 10; s++) { for (const it of posItems(data.word_forms, 40, s)) assert.deepEqual(SK.validateItem(it), []); for (const it of formItems(data.word_forms, 20, s)) assert.deepEqual(SK.validateItem(it), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
