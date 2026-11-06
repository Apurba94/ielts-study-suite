/* Reference Words: work out what this, it, they, such and the former refer to. */
(function () {
  'use strict';
  const GUIDE = [['it, its', 'a singular noun or idea mentioned just before'], ['they, them, their, these, those', 'a plural noun'], ['this, that', 'a noun, or a whole idea or action just described'], ['such + noun', 'things of the kind just described'], ['the former / the latter', 'the first / the second of two things named'], ['there, then', 'a place / a time just mentioned'], ['doing so, the move, the increase', 'a noun phrase that renames an action or change']];
  const App = {
    about: 'Long passages avoid repeating nouns by using reference words: it, this, they, such, the latter. If you link one to the wrong idea, you misread the sentence, and the question built on it. Twenty-four short exercises, each with the reference word in bold.',
    how: ['Learn the patterns in **Guide**.', 'In **Practice**, find the word in bold and choose what it refers to.', 'Try replacing the word with your answer: the sentence should still make sense.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.reference, { sizes: [8, 16, 24], modes: false }),
      { id: 'guide', label: 'Guide', render(el) { el.appendChild(SK.card('What reference words point to', SK.table(['Word', 'Usually refers to'], GUIDE, false))); } },
    ],
    checks: { 'every item is valid and shows the word in bold': (data, assert) => { for (const it of data.reference) { assert.deepEqual(SK.validateItem(it), []); assert.ok(/\*\*.+\*\*/.test(it.stem)); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
