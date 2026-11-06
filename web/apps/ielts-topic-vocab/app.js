/* Topic Vocabulary: words for the topics IELTS returns to, with cards and quizzes. */
(function () {
  'use strict';
  const words = (ctx) => ctx.data.topic_vocab;
  const App = {
    about: 'Writing Task 2 and Speaking Part 3 keep returning to the same topics: the environment, education, health, technology, work, cities, culture, society and the economy. Precise topic words (emissions, curriculum, sedentary, urbanisation) let you say more with fewer words. Ninety words in nine topics, with cards, quizzes and examples written for the suite.',
    how: ['Choose a topic in **Cards** and learn a few words a day.', 'Test yourself by topic in **Quiz**.', 'Before writing an essay, read the words for its topic in **List** and use two or three of them.'],
    tabs: [
      SK.cardsTab('cards', 'Cards', (ctx) => SK.wordCards(words(ctx)), { reversible: true, newPerDay: 10 }),
      SK.wordQuizTab('quiz', 'Quiz', words, ['meaning', 'word', 'blank']),
      { id: 'list', label: 'List', render(el, ctx) {
        for (const t of [...new Set(words(ctx).map((w) => w.tag))]) el.appendChild(SK.card(t, SK.table(['Word', 'Meaning', 'Example'], words(ctx).filter((w) => w.tag === t).map((w) => [SK.h('strong', { text: w.w }), w.d, w.e]))));
      } },
    ],
    checks: { 'nine topics of ten words each, with valid quizzes': (data, assert) => {
      const tags = {}; data.topic_vocab.forEach((w) => { tags[w.tag] = (tags[w.tag] || 0) + 1; });
      assert.equal(Object.keys(tags).length, 9);
      for (const n of Object.values(tags)) assert.equal(n, 10);
      for (const it of SK.wordItems(data.topic_vocab, 30, 2, ['meaning', 'word'])) assert.deepEqual(SK.validateItem(it), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
