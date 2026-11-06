/* Writing Self-Check: check an essay against the four things examiners judge, with plain-language questions. */
(function () {
  'use strict';
  // The four writing criteria, described in our own words with questions you can answer about your own essay.
  const CRITERIA = [
    ['Task response', ['Did I answer every part of the question?', 'Is my position clear from the start and the same at the end?', 'Is each main idea developed with explanation and an example, not just stated?']],
    ['Coherence and cohesion', ['Does each paragraph have one central idea?', 'Do the ideas follow a logical order?', 'Do I use a range of linking and reference words, without overusing them?']],
    ['Lexical resource', ['Do I use precise words rather than very general ones (good, bad, thing)?', 'Do I use some less common words and natural collocations correctly?', 'Is my spelling accurate?']],
    ['Grammatical range and accuracy', ['Do I use a mix of simple and complex sentences?', 'Are most of my sentences free of errors?', 'Is my punctuation correct, with no comma splices?']],
  ];
  // Self-ratings 0 to 3 per question become a rough average per criterion. It is a reflection tool, not a band.
  const summary = (ratings) => CRITERIA.map(([name, qs], i) => { const vals = qs.map((_, k) => ratings[i + '-' + k]).filter((v) => v !== undefined); return { name, done: vals.length, score: vals.length ? SK.round(SK.sum(vals) / vals.length, 1) : null }; });
  const App = {
    about: 'IELTS writing is judged on four criteria: task response (or achievement), coherence and cohesion, lexical resource, and grammatical range and accuracy. Paste an essay to see what can be counted, then rate it against plain-language questions for each criterion, written for this suite. The result shows your weakest criterion. It is not a band score; only trained examiners can give that.',
    how: ['Paste your essay in **Check** and press Get feedback for the counts.', 'Answer the questions honestly for each criterion.', 'Work on the criterion with the lowest rating first.'],
    tabs: [{ id: 'check', label: 'Check', render(el) {
      const ratings = SK.store.get('ielts-writing-self-check.ratings', {});
      SK.writer(el, { key: 'self-check', title: 'Paste your essay', target: [250, 320], paragraphs: 4 });
      const out = SK.h('div', {});
      const draw = () => { SK.clear(out).appendChild(SK.table(['Criterion', 'Your rating (0 to 3)'], summary(ratings).map((s) => [s.name, s.score === null ? 'not rated' : s.score]), false)); };
      for (const [i, [name, qs]] of CRITERIA.entries()) {
        el.appendChild(SK.card(name, qs.map((q, k) => SK.select([['', 'Rate this'], ['0', '0: not at all'], ['1', '1: a little'], ['2', '2: mostly'], ['3', '3: fully']], ratings[i + '-' + k] === undefined ? '' : String(ratings[i + '-' + k]), (v) => { if (v === '') delete ratings[i + '-' + k]; else ratings[i + '-' + k] = Number(v); SK.store.set('ielts-writing-self-check.ratings', ratings); draw(); }, q))));
      }
      el.appendChild(SK.card('Your self-check', out, SK.note('A reflection tool, not a band score. Ask a teacher to mark a few essays to calibrate your ratings.')));
      draw();
    } }],
    CRITERIA, summary,
    checks: { 'ratings average per criterion and skip unrated questions': (data, assert) => {
      const s = summary({ '0-0': 3, '0-1': 1, '2-0': 2 });
      assert.deepEqual(s.map((x) => x.score), [2, null, 2, null]);
      assert.equal(CRITERIA.length, 4);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
