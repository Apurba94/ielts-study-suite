/* Spelled Names and Codes: hear names, postcodes, references and emails spelled letter by letter, and type them. */
(function () {
  'use strict';
  const KINDS = ['surname', 'postcode', 'reference', 'street', 'email'];
  const items = (kind, n, seed) => { const r = SK.rng(seed); return SK.range(n).map(() => { const it = SK.ielts.spellItem(r, kind === 'All' ? null : kind.toLowerCase()); return Object.assign(it, { audio: { title: 'Listen', text: it.say } }); }); };
  const ALPHABET = [['A, H, J, K', 'all rhyme with "day"'], ['B, C, D, E, G, P, T, V', 'all rhyme with "see"'], ['F, L, M, N, S, X', 'start with an "e" sound: ef, el, em'], ['I, Y', 'rhyme with "my"'], ['Q, U, W', 'all contain "you"'], ['R', 'sounds like "are"'], ['Z', '"zed" in British English, "zee" in American']];
  const App = {
    about: 'In Listening Part 1 you often write a name, postcode or reference that the speaker spells out. One wrong letter makes the answer wrong. Hear generated surnames, postcodes, booking references, street names and email addresses spelled letter by letter, including "double" letters, and type them exactly.',
    how: ['Learn the letter groups in **Alphabet**: letters that sound alike are the usual trap.', 'In **Practice**, choose a kind or All, press Play and type exactly what you hear.', 'Listen for "double": double L means LL.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el) { SK.quizStarter(el, { title: 'Spelled names and codes', topics: KINDS.map((k) => k[0].toUpperCase() + k.slice(1)), sizes: [10, 20], make: (t, n, s) => items(t, n, s), seconds: (n) => n * 30 }); } },
      { id: 'alphabet', label: 'Alphabet', render(el) { el.appendChild(SK.card('Letters that sound alike', SK.table(['Letters', 'Sound'], ALPHABET, false), SK.note('Most confusions: B and V, M and N, G and J, A and E, I and E. Write each letter as it comes, not the whole word at the end.'), SK.voicePicker())); } },
    ],
    items,
    checks: { 'items mark their own answer and the spelling is spoken': (data, assert) => {
      for (const k of ['All'].concat(KINDS)) for (const it of items(k, 30, 7)) { assert.ok(SK.isCorrect(it, it.answer)); assert.ok(it.say.includes(',')); assert.ok(!SK.isCorrect(it, it.answer + 'x')); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
