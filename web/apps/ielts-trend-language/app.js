/* Language of Change: choose the right verb and adverb for generated changes in data. */
(function () {
  'use strict';
  const items = (n, seed) => { const r = SK.rng(seed); return SK.range(n).map(() => SK.shuffleItem(r, SK.ielts.trendItem(r))); };
  const WORDS = [['Up', 'rose, increased, grew, climbed, doubled, more than doubled'], ['Down', 'fell, decreased, declined, dropped, halved'], ['No change', 'remained stable, stayed the same, levelled off, plateaued'], ['Up and down', 'fluctuated, varied'], ['Highest and lowest', 'peaked at, reached a peak of, hit a low of'], ['Size of change', 'slightly, gradually, steadily, significantly, sharply, dramatically'], ['Noun forms', 'a slight rise, a steady decline, a sharp increase']];
  const App = {
    about: 'Describing data well means matching the words to the size of the change: a rise of 3 per cent is not "dramatic". Every question here is generated from numbers, so the right description follows a rule you can learn: stable under 5 per cent, slight under 15, steady under 40, sharp above that, and more than doubled beyond 100.',
    how: ['Learn the verbs and adverbs in **Words**.', 'In **Practice**, work out the size of the change, then choose the description.', 'Vary your language in Task 1: use verbs and noun forms (sales rose sharply / there was a sharp rise in sales).'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el) { SK.quizStarter(el, { title: 'Describe the change', sizes: [10, 20], make: (t, n, s) => items(n, s), seconds: (n) => n * 30 }); } },
      { id: 'words', label: 'Words', render(el) { el.appendChild(SK.card('The language of change', SK.table(['Kind', 'Words'], WORDS, false), SK.note('These size bands are a guide for clear writing, not an official rule.'))); } },
    ],
    items,
    checks: { 'generated items describe the change by its size': (data, assert) => {
      for (const it of items(300, 6)) { assert.deepEqual(SK.validateItem(it), []); const m = it.stem.match(/from (\d+) to (\d+)/); const c = SK.ielts.describeChange(Number(m[1]), Number(m[2])); assert.ok(it.choices[it.answer].startsWith(c.verb)); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
