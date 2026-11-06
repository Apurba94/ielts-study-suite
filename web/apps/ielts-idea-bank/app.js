/* Idea Bank: arguments and examples for common Part 3 and Task 2 topics, for and against. */
(function () {
  'use strict';
  const items = (ideas, n, seed) => {
    const r = SK.rng(seed);
    const pool = ideas.flatMap((x) => x.for.map((p) => [x, p, 0]).concat(x.against.map((p) => [x, p, 1])));
    return SK.sample(r, pool, n).map(([x, p, side]) => ({ id: 'ib-' + x.id + '-' + p.length, type: 'single', fixedOrder: true, noLetters: true, topic: x.topic, stem: '**' + x.question + '**\nIs this point for or against?\n' + p, choices: ['For', 'Against'], answer: side, explanation: 'This is an argument ' + (side ? 'against.' : 'for.') }));
  };
  const App = {
    about: 'Running out of ideas is a common problem in Part 3 and Task 2. This bank gives fourteen common debates, each with three arguments for, three against and a real-world example to make points concrete. Use it to build your own views, not to memorise answers.',
    how: ['Browse a topic in **Topics** and decide what you think.', 'Sort arguments in **Practice** to see both sides quickly.', 'Before an essay or Part 3 practice, read the related topic and add one idea of your own.'],
    tabs: [
      { id: 'topics', label: 'Topics', render(el, ctx) { ctx.data.ideas.forEach((x) => el.appendChild(SK.card(x.topic + ': ' + x.question, SK.h('div', { class: 'sk-split' }, SK.h('div', {}, SK.h('h3', { text: 'For' }), SK.h('ul', {}, x.for.map((p) => SK.h('li', { text: p })))), SK.h('div', {}, SK.h('h3', { text: 'Against' }), SK.h('ul', {}, x.against.map((p) => SK.h('li', { text: p }))))), SK.h('p', { class: 'sk-small sk-muted', text: 'Examples: ' + x.examples.join('; ') }))));} },
      { id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'For or against?', sizes: [10, 20], make: (t, n, s) => items(ctx.data.ideas, n, s), seconds: (n) => n * 15, modes: false }); } },
    ],
    items,
    checks: { 'every topic has three points each way': (data, assert) => { for (const x of data.ideas) { assert.equal(x.for.length, 3); assert.equal(x.against.length, 3); } for (const it of items(data.ideas, 40, 1)) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
