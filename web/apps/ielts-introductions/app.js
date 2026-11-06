/* Introduction Trainer: introductions that paraphrase the prompt and give a clear position. */
(function () {
  'use strict';
  const RECIPE = ['Sentence 1: paraphrase the prompt in your own words. Change the words and the structure, keep the meaning.', 'Sentence 2: give your answer, your thesis. Say what you think, or what the essay will show.', 'That is enough. Two or three sentences, about 40 to 50 words.'];
  const App = {
    about: 'A good Task 2 introduction does two things in two or three sentences: it paraphrases the question and it answers it. Choose the best of four introductions for twelve prompts, where the wrong ones copy the prompt, say nothing or never take a position, then write your own.',
    how: ['Learn the two-sentence recipe in **Recipe**.', 'In **Practice**, choose the best introduction and read why.', 'In **Write**, write an introduction for a random prompt and check it against the recipe.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.introductions, { sizes: [6, 12], modes: false }),
      { id: 'recipe', label: 'Recipe', render(el) { el.appendChild(SK.card('A two-sentence introduction', SK.h('ol', {}, RECIPE.map((r) => SK.h('li', { text: r }))))); } },
      { id: 'write', label: 'Write', render(el, ctx) {
        const e = SK.pick(SK.rng(SK.daySeed('ielts-introductions')), ctx.data.essay_prompts);
        SK.writer(el, { key: 'intro-' + e.id, title: 'Write an introduction', prompt: e.prompt + '\n' + e.question, target: [35, 60], checklist: ['I did not copy more than three words in a row from the prompt.', 'My second sentence gives a clear answer.', 'It is two or three sentences long.'] });
      } },
    ],
    checks: { 'every introduction question is valid': (data, assert) => { for (const it of data.introductions) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
