/* Academic Word Trainer: spaced-repetition cards and quizzes for academic words. */
(function () {
  'use strict';
  const words = (ctx) => ctx.data.academic_words;
  const App = {
    about: 'Academic words such as analyse, significant and hypothesis appear in every Reading passage and lecture, and using them accurately raises your Writing score for lexical resource. This app teaches about 370 of them, each with a plain definition and an example sentence written for the suite, through spaced-repetition cards and three kinds of quiz.',
    how: ['Learn 10 to 20 new words a day in **Cards**. Cards come back just before you would forget them.', 'Test yourself in **Quiz**: meaning, word, or the word in a sentence.', 'Say each word aloud with **Hear it**, and use new words in your writing practice.'],
    tabs: [
      SK.cardsTab('cards', 'Cards', (ctx) => SK.wordCards(words(ctx)), { reversible: true, newPerDay: 15 }),
      SK.wordQuizTab('quiz', 'Quiz', words, ['meaning', 'word', 'blank']),
      { id: 'list', label: 'Word list', render(el, ctx) {
        let term = '';
        const out = SK.h('div', {});
        const draw = () => { SK.clear(out); const hits = words(ctx).filter((w) => !term || SK.norm(w.w + ' ' + w.d).includes(SK.norm(term))); out.appendChild(SK.table(['Word', 'Part of speech', 'Meaning', 'Example'], hits.slice(0, 150).map((w) => [SK.h('strong', { text: w.w }), w.pos, w.d, w.e]))); };
        el.appendChild(SK.card('Word list', SK.field('Search', SK.h('input', { type: 'text', oninput: (e) => { term = e.target.value; draw(); } })), out));
        draw();
      } },
    ],
    checks: { 'quizzes are valid with five different choices': (data, assert) => {
      assert.ok(data.academic_words.length >= 350);
      for (let s = 1; s < 20; s++) for (const it of SK.wordItems(data.academic_words, 20, s, ['meaning', 'word', 'blank'])) assert.deepEqual(SK.validateItem(it), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
