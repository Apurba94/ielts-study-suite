/* Scanning Trainer: find names, dates and numbers in a passage as fast as you can. */
(function () {
  'use strict';
  // Every sentence with a year, number or name in the middle becomes a question: find the sentence, type the missing item.
  const targets = (text) => {
    const out = [];
    for (const s of SK.text.sentences(text)) {
      const words = s.split(' ');
      words.forEach((w, i) => {
        const c = w.replace(/^[("“]+|[).,;:!?"”]+$/g, '');
        const kind = /^(1[0-9]{3}|20[0-9]{2})s?$/.test(c) ? 'year' : /^\d[\d,.]*$/.test(c) ? 'number' : i > 0 && /^[A-Z][a-z]{2,}$/.test(c) && !/^(The|This|These|That|Those|In|At|On|By|For|From|When|While|Although|However|Yet|But|Today|Even|Some|Many|Most|Others|Since|Unlike)$/.test(c) ? 'name' : null;
        if (kind) out.push({ sentence: s, word: c, kind, gap: s.replace(c, '_____') });
      });
    }
    return out;
  };
  const items = (passages, gt, n, seed) => {
    const r = SK.rng(seed);
    const pool = passages.map((p) => [p.title, p.paragraphs.join(' ')]).concat(gt.map((g) => [g.title, g.text.replace(/\n/g, ' ')]))
      .flatMap(([title, text]) => targets(text).map((t) => Object.assign(t, { title, text })));
    return SK.sample(r, pool, n).map((t) => ({ id: 'scan-' + t.word + '-' + t.sentence.length, type: 'text', topic: t.kind === 'year' ? 'Years' : t.kind === 'number' ? 'Numbers' : 'Names', passageTitle: t.title, passage: t.text,
      stem: 'Find this sentence in the text and type the missing ' + (t.kind === 'name' ? 'name' : t.kind) + ':\n"' + t.gap + '"', answer: t.word, explanation: 'The sentence: "' + t.sentence + '"' }));
  };
  const App = {
    about: 'Scanning means moving your eyes quickly over a text to find one specific thing, such as a year, a number or a name, without reading every word. Questions are made from the sentences in the suite\'s passages and texts, so there are over a hundred. Practise against the clock.',
    how: ['Read the sentence with the gap, and notice what kind of thing is missing.', 'Let your eyes run down the passage looking only for that kind of thing: figures, capital letters.', 'Type it. Aim for under 30 seconds each.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'Scan and find', topics: ['Years', 'Numbers', 'Names'], sizes: [10, 20], make: (t, n, s) => items(ctx.data.reading_passages, ctx.data.gt_texts, 400, s).filter((x) => t === 'All' || x.topic === t).slice(0, n), seconds: (n) => n * 30 }); } }],
    targets, items,
    checks: { 'there are over a hundred scanning questions, each answerable from its text': (data, assert) => {
      const all = items(data.reading_passages, data.gt_texts, 5000, 1);
      assert.ok(all.length >= 100, String(all.length));
      for (const it of all) { assert.ok(it.passage.includes(it.answer)); assert.ok(it.stem.includes('_____')); assert.ok(SK.isCorrect(it, it.answer)); }
      assert.deepEqual(targets('It began in 1817 in Germany.').map((t) => t.word), ['1817', 'Germany']);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
