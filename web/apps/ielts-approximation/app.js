/* Proportions and Approximation: turn percentages into accurate phrases such as just over a third. */
(function () {
  'use strict';
  const items = (n, seed) => { const r = SK.rng(seed); return SK.range(n).map(() => SK.shuffleItem(r, SK.ielts.approxItem(r))); };
  const TABLE = [[5, 'one in twenty'], [10, 'a tenth, one in ten'], [20, 'a fifth'], [25, 'a quarter'], [33, 'a third'], [40, 'two fifths'], [50, 'half'], [60, 'three fifths'], [67, 'two thirds'], [75, 'three quarters'], [80, 'four fifths'], [90, 'nine out of ten']];
  const App = {
    about: 'Good Task 1 reports mix exact figures with natural approximations: just over a quarter, nearly half, roughly two thirds. Every question here starts from a generated percentage, and the right phrase is calculated, so you learn exactly when "just over" and "just under" fit.',
    how: ['Learn the fractions in **Fractions**.', 'In **Practice**, choose the phrase that fits the percentage.', 'In your writing, give the exact figure sometimes and an approximation at other times.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el) { SK.quizStarter(el, { title: 'Which phrase fits?', sizes: [10, 20], make: (t, n, s) => items(n, s), seconds: (n) => n * 20 }); } },
      { id: 'fractions', label: 'Fractions', render(el) { el.appendChild(SK.card('Percentages as fractions', SK.table(['Per cent', 'Phrase'], TABLE, false), SK.note('Within about three points of a simple fraction: "just over" or "just under". Further away: give the figure.'))); } },
    ],
    items,
    checks: { 'the right phrase is the calculated one': (data, assert) => {
      for (const it of items(300, 2)) { assert.deepEqual(SK.validateItem(it), []); const p = Number(it.stem.match(/^(\d+)%/)[1]); assert.equal(it.choices[it.answer].toLowerCase(), SK.ielts.approx(p)); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
