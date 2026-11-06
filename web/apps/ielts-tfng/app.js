/* True, False or Not Given: decide whether statements agree with a text, contradict it, or are not mentioned. */
(function () {
  'use strict';
  const items = (bank) => bank.map((t) => Object.assign(SK.ielts.tfItem(t), { stem: '**Text:** ' + t.text + '\n\n**Statement:** ' + t.s, topic: 'Answer: ' + t.a }));
  const RULES = [['True', 'The text says the same thing, usually in different words.'], ['False', 'The text says the opposite, or something that cannot be true at the same time.'], ['Not Given', 'The text does not say whether it is true or not. Do not use your own knowledge.']];
  const App = {
    about: 'True, False or Not Given is the question type test takers find hardest, mostly because of the difference between False and Not Given. Practise with 48 short texts, each with a statement and an explanation of why the answer is right, and track which of the three answers you get wrong most.',
    how: ['Learn the rule in **Rules**: False means the text contradicts the statement; Not Given means it is silent.', 'In **Practice**, read the text, then the statement, and choose.', 'Watch the topic table at the end: if you often say False when the answer is Not Given, slow down on those.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => items(ctx.data.tfng), { sizes: [12, 24, 48], seconds: (n) => n * 45 }),
      { id: 'rules', label: 'Rules', render(el) { el.appendChild(SK.card('Three answers', SK.table(['Answer', 'When'], RULES, false), SK.note('A useful test: could the statement and the text both be true at the same time? If not, it is False. If the text simply does not cover the point, it is Not Given.'))); } },
    ],
    items,
    checks: { 'all three answers are well represented and items are valid': (data, assert) => {
      const it = items(data.tfng);
      for (const a of SK.ielts.TFNG) assert.ok(data.tfng.filter((t) => t.a === a).length >= 10, a);
      for (const x of it) { assert.deepEqual(SK.validateItem(x), []); assert.equal(x.choices[x.answer], x.topic.replace('Answer: ', '')); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
