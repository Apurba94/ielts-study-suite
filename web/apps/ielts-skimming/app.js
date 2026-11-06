/* Skimming Trainer: read a paragraph against the clock and pick its main idea. */
(function () {
  'use strict';
  const SECONDS = { slow: 45, normal: 30, fast: 20 };
  // One question per paragraph: the right heading against three others from the same passage.
  const items = (passages, n, seed) => {
    const r = SK.rng(seed);
    const pool = passages.flatMap((p) => p.paragraphs.map((text, k) => [p, k, text]));
    return SK.sample(r, pool, n).map(([p, k, text]) => {
      const right = p.headings.list[p.headings.answer[k]];
      const wrong = SK.sample(r, p.headings.list.filter((x) => x !== right), 3);
      return SK.shuffleItem(r, { id: 'sk-' + p.id + '-' + k, type: 'single', topic: p.topic, passage: text, passageTitle: p.title + ', paragraph ' + SK.ielts.LETTERS[k], stem: 'What is this paragraph mainly about?', choices: [right].concat(wrong), answer: 0, explanation: 'Main idea: ' + right + '.' });
    });
  };
  const App = {
    about: 'Skimming means reading quickly for the main idea, so you know where things are before you answer questions. Each round shows paragraphs from the reading passages with a short time limit, and you choose the main idea. Speed and accuracy are both recorded.',
    how: ['Choose a pace: 45, 30 or 20 seconds per paragraph.', 'Read the first and last sentences carefully and the rest quickly.', 'Choose the main idea, not a detail that one sentence mentions.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el, ctx) {
      let pace = 'normal';
      SK.quizStarter(el, { title: 'Skim for the main idea', sizes: [6, 12, 24], mode: 'test', make: (t, n, s) => items(ctx.data.reading_passages, n, s), seconds: (n) => n * SECONDS[pace],
        intro: 'In test mode the clock runs for the whole set.', extra: () => SK.select([['slow', '45 seconds a paragraph'], ['normal', '30 seconds'], ['fast', '20 seconds']], pace, (v) => { pace = v; }, 'Pace') });
    } }],
    items,
    checks: { 'each paragraph question has its own heading as the right answer': (data, assert) => {
      for (const it of items(data.reading_passages, 36, 4)) { assert.deepEqual(SK.validateItem(it), []); assert.equal(new Set(it.choices).size, 4); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
