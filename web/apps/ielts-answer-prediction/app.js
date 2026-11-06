/* Answer Prediction: before listening, predict the kind of word each gap needs. */
(function () {
  'use strict';
  const CLUES = [['a / an before the gap', 'a singular countable noun (an: starts with a vowel sound)'], ['no article, plural verb after', 'a plural or uncountable noun'], ['more ... than / too / very', 'an adjective'], ['is / are / was + gap', 'a past participle (passive) or an adjective'], ['£, %, weeks printed next to the gap', 'a number only'], ['at + gap in a timetable', 'a time'], ['on + gap', 'a day or date'], ['in + gap', 'a place, month, year or season'], ['Mr / Ms + gap', 'a surname, usually spelled out']];
  const App = {
    about: 'Good listeners know what they are listening for before the recording starts. Grammar around a gap tells you whether you need a noun, a plural, an adjective, a number or a name, which halves the chance of being caught by a distractor. Practise predicting with 24 gaps from notes, forms and flow-charts, and learn the clues.',
    how: ['Learn the clues in **Clues**.', 'In **Practice**, choose the kind of answer that fits each gap.', 'In real practice, write your prediction lightly next to each gap before you play.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.prediction, { sizes: [8, 16, 24], modes: false }),
      { id: 'clues', label: 'Clues', render(el) { el.appendChild(SK.card('Clues around a gap', SK.table(['Clue', 'Likely answer'], CLUES, false))); } },
    ],
    checks: { 'every prediction item is valid': (data, assert) => { assert.ok(data.prediction.length >= 20); for (const it of data.prediction) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
