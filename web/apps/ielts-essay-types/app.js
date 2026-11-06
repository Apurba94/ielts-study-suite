/* Essay Type Spotter: decide what kind of answer a Task 2 prompt asks for. */
(function () {
  'use strict';
  const NAMES = { opinion: 'Opinion: agree or disagree', discussion: 'Discuss both views and give your opinion', problem: 'Problem and solution (or causes and solutions)', advantages: 'Advantages and disadvantages', 'two-part': 'Two-part question' };
  const CLUES = [['To what extent do you agree or disagree?', 'Opinion: take a clear position'], ['Discuss both views and give your own opinion.', 'Discussion: both sides, then your view'], ['What are the causes ... and what solutions ...?', 'Problem and solution: cover both parts'], ['Do the advantages outweigh the disadvantages?', 'Advantages: weigh them and say which is greater'], ['Why is this? Is it positive or negative?', 'Two-part: answer both questions directly']];
  const items = (bank, n, seed) => { const r = SK.rng(seed); return SK.sample(r, bank, n).map((e) => ({ id: 'et-' + e.id, type: 'single', fixedOrder: true, topic: NAMES[e.type], stem: e.prompt + '\n**' + e.question + '**\nWhat kind of essay is this?', choices: Object.values(NAMES), answer: Object.keys(NAMES).indexOf(e.type), explanation: 'This is: ' + NAMES[e.type] + '.' })); };
  const App = {
    about: 'Many low Task 2 scores come from answering the wrong question: discussing both sides when asked for your opinion, or giving advantages without saying whether they outweigh the disadvantages. Learn to read the question line and classify 48 prompts into the five common types.',
    how: ['Learn the question lines in **Clues**.', 'In **Practice**, read the final question of each prompt and choose the essay type.', 'Before every essay, write the type at the top of your plan.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'What kind of essay?', sizes: [10, 20, 48], make: (t, n, s) => items(ctx.data.essay_prompts, n, s), seconds: (n) => n * 20, modes: false }); } },
      { id: 'clues', label: 'Clues', render(el) { el.appendChild(SK.card('Read the question line', SK.table(['Question', 'What to do'], CLUES, false))); } },
    ],
    items,
    checks: { 'every prompt classifies to its own type': (data, assert) => { for (const it of items(data.essay_prompts, 48, 1)) { assert.deepEqual(SK.validateItem(it), []); assert.equal(it.choices[it.answer], it.topic); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
