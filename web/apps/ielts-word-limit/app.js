/* Word Limit Rules: practise instructions such as NO MORE THAN TWO WORDS AND/OR A NUMBER. */
(function () {
  'use strict';
  const items = (bank, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, bank, n).map((x) => {
      const f = SK.ielts.fitsLimit(x.given, x.instr);
      return { id: x.id, type: 'single', fixedOrder: true, topic: f.ok ? 'Within the limit' : 'Breaks the limit', stem: 'Instruction: **' + x.instr + '**\nSentence: ' + x.sentence + '\nAnswer written: "' + x.given + '"\nDoes this answer keep to the instruction?', choices: ['Yes, it keeps to the limit', 'No, it breaks the limit'], answer: f.ok ? 0 : 1, explanation: f.why + ' (' + f.words + ' word' + (f.words === 1 ? '' : 's') + ', ' + f.numbers + ' number' + (f.numbers === 1 ? '' : 's') + '.)' };
    });
  };
  const RULES = [['ONE WORD ONLY', 'Exactly one word. No numbers, no articles.'], ['ONE WORD AND/OR A NUMBER', 'A word, a number, or one of each: 15 March, £45, 7.30 pm.'], ['NO MORE THAN TWO WORDS', 'One or two words; a number written in figures counts as a word here.'], ['NO MORE THAN TWO WORDS AND/OR A NUMBER', 'Up to two words, plus one number if needed.'], ['Hyphenated words', 'well-known counts as one word.'], ['Symbols', '£, % and pm go with their number and do not count as extra words.']];
  const App = {
    about: 'An answer that breaks the word limit is marked wrong, even if it contains the right word. Learn how IELTS counts words and numbers, then judge 24 written answers. A live checker lets you test your own answers against any instruction.',
    how: ['Read **Rules**.', 'In **Practice**, decide whether each written answer keeps to its instruction.', 'Use **Checker** to test answers from your own practice.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'Does it fit?', sizes: [10, 24], make: (t, n, s) => items(ctx.data.word_limits, n, s), seconds: (n) => n * 20 }); } },
      { id: 'rules', label: 'Rules', render(el) { el.appendChild(SK.card('Word limit rules', SK.table(['Instruction', 'What it allows'], RULES, false))); } },
      { id: 'checker', label: 'Checker', render(el) {
        const out = SK.h('div', {});
        let instr = 'NO MORE THAN TWO WORDS AND/OR A NUMBER';
        const inp = SK.h('input', { type: 'text', placeholder: 'Type an answer', 'aria-label': 'Answer', style: { width: '100%' } });
        const run = () => { const f = SK.ielts.fitsLimit(inp.value, instr); SK.clear(out).appendChild(SK.note(f.why + ' Words: ' + f.words + '. Numbers: ' + f.numbers + '.', f.ok ? 'right' : 'wrong')); };
        inp.addEventListener('input', run);
        el.appendChild(SK.card('Check an answer', SK.select(['ONE WORD ONLY', 'ONE WORD AND/OR A NUMBER', 'NO MORE THAN TWO WORDS', 'NO MORE THAN TWO WORDS AND/OR A NUMBER', 'NO MORE THAN THREE WORDS', 'NO MORE THAN THREE WORDS AND/OR A NUMBER'], instr, (v) => { instr = v; run(); }, 'Instruction'), inp, out));
      } },
    ],
    items,
    checks: { 'both kinds of case are in the bank and every item is valid': (data, assert) => {
      const all = items(data.word_limits, 24, 1);
      assert.ok(all.some((x) => x.answer === 0) && all.some((x) => x.answer === 1));
      for (const it of all) assert.deepEqual(SK.validateItem(it), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
