/* Body Paragraph Builder: put topic sentences, explanations and examples in order. */
(function () {
  'use strict';
  const items = (bank) => bank.map((p) => ({ id: 'pg-' + p.id, type: 'order', topic: 'Paragraph order', stem: 'Build the paragraph about **' + p.topic + '**: click the sentences in order.', answer: p.sentences.slice(), explanation: 'Topic sentence, explanation, example, link back: ' + p.sentences.join(' ') }));
  const SHAPE = [['1. Topic sentence', 'The main idea of the paragraph, in one sentence.'], ['2. Explanation', 'Why or how: develop the idea.'], ['3. Example', 'A specific case, figure or experience: for example, in Wales...'], ['4. Link', 'What it means for the question: therefore, as a result.']];
  const App = {
    about: 'Examiners look for paragraphs with one clear central idea that is developed, not a list of points. A strong body paragraph usually moves from a topic sentence, to an explanation, to an example, to a sentence that links back to the question. Rebuild ten model paragraphs sentence by sentence.',
    how: ['Learn the four-part shape in **Shape**.', 'In **Practice**, click the sentences in the right order.', 'Use the same shape in your own Task 2 body paragraphs.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { const r = SK.rng(SK.seedNow()); SK.quiz(el, SK.shuffle(r, items(ctx.data.paragraphs)).map((it) => SK.shuffleItem(r, it)), { title: 'Build the paragraph', mode: 'practice' }); } },
      { id: 'shape', label: 'Shape', render(el) { el.appendChild(SK.card('The shape of a body paragraph', SK.table(['Part', 'What it does'], SHAPE, false))); } },
    ],
    items,
    checks: { 'every paragraph orders from its own sentences': (data, assert) => { for (const it of items(data.paragraphs)) { assert.deepEqual(SK.validateItem(it), []); assert.equal(it.answer.length, 4); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
