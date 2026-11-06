/* Spelling Pitfalls: hear and type the words test takers misspell most. */
(function () {
  'use strict';
  const items = (words, n, seed) => { const r = SK.rng(seed); return SK.sample(r, words, n).map((w) => ({ id: 'sp-' + w.id, type: 'text', topic: 'Spelling', stem: 'Type the word you hear.', audio: { title: 'Word', text: w.w }, answer: w.w, accept: w.w === 'license' ? ['licence'] : [], explanation: '**' + w.w + '**: ' + w.tip })); };
  const App = {
    about: 'In IELTS Listening and Reading, a misspelled answer is a wrong answer. About a hundred words cause most of the trouble: double letters (accommodation, necessary), silent letters (government, Wednesday) and words that sound alike (affect and effect). Hear each word, type it, and learn a tip that fixes it in memory.',
    how: ['In **Practice**, press Play and type the word.', 'Read the tip for each word you miss; it goes to the error log too.', 'Learn the whole list in **List**. British and American spellings are both accepted if you are consistent.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'Spell it', sizes: [10, 20, 40], make: (t, n, s) => items(ctx.data.spelling_words, n, s), seconds: (n) => n * 15 }); } },
      { id: 'list', label: 'List', render(el, ctx) { el.appendChild(SK.card('Words to watch', SK.table(['Word', 'Tip'], ctx.data.spelling_words.map((w) => [SK.h('strong', { text: w.w }), w.tip])))); } },
    ],
    items,
    checks: { 'every word marks itself and no word repeats': (data, assert) => {
      const ws = data.spelling_words.map((w) => w.w.toLowerCase());
      assert.equal(new Set(ws).size, ws.length);
      for (const it of items(data.spelling_words, 60, 2)) { assert.ok(SK.isCorrect(it, it.answer)); assert.ok(!SK.isCorrect(it, it.answer.slice(0, -1))); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
