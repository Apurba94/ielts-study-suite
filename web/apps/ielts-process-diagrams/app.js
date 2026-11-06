/* Task 1 Process Diagrams: describe processes with sequencing language and the passive voice. */
(function () {
  'use strict';
  const orderItem = (p) => ({ id: 'ord-' + p.id, type: 'order', topic: 'Sequence', stem: 'Put the stages of "' + p.title + '" in order. Click them in sequence.', answer: p.steps.slice(), explanation: p.steps.map((s, i) => (i + 1) + '. ' + s).join('\n') });
  const task = (p) => 'The diagram below shows ' + p.title.replace(/^\w/, (c) => c.toLowerCase()) + '.\nSummarise the information by choosing and reporting the main features.\nWrite at least 150 words.';
  const LANG = [['First stage', 'To begin with, / First, / The process begins when'], ['Next stages', 'Next, / After that, / Once this is done, / At the following stage,'], ['At the same time', 'Meanwhile, / At the same time,'], ['Last stage', 'Finally, / In the final stage,'], ['Man-made process', 'Use the passive: the clay is dug, the bricks are heated'], ['Natural process', 'Use active verbs: the frog lays eggs, water evaporates'], ['Overview', 'Say how many stages there are and where it begins and ends.']];
  const App = {
    about: 'Process diagrams ask you to describe how something is made or how it happens, step by step. Man-made processes are usually described in the passive (the clay is dug), and natural ones in the active (water evaporates). Six original processes, from making bricks to the water cycle, with ordering practice and timed writing.',
    how: ['In **Order**, put the stages of a process in the right sequence.', 'Learn the sequencing language and the passive in **Language**.', 'In **Write**, describe a process in at least 150 words, starting with an overview.'],
    tabs: [
      { id: 'order', label: 'Order', render(el, ctx) { const r = SK.rng(SK.seedNow()); SK.quiz(el, SK.shuffle(r, ctx.data.processes).map((p) => SK.shuffleItem(r, orderItem(p))), { title: 'Order the stages', mode: 'practice' }); } },
      { id: 'write', label: 'Write', render(el, ctx) {
        const p = ctx.data.processes[SK.store.get('ielts-process-diagrams.i', 0) % ctx.data.processes.length];
        const prompt = SK.h('div', {}, SK.h('p', { style: { whiteSpace: 'pre-line' }, text: task(p) }), SK.figures.process({ title: p.title, steps: p.steps }),
          SK.btn('Another process', () => { SK.store.set('ielts-process-diagrams.i', SK.store.get('ielts-process-diagrams.i', 0) + 1); SK.show('write'); }, 'ghost small'));
        SK.writer(el, { key: p.id, title: 'Describe the process', prompt, promptText: task(p), minutes: 20, target: [150, 200], paragraphs: 3, checklist: ['I began with an overview: how many stages, where it starts and ends.', 'I described every stage in order.', p.natural ? 'I used active verbs for a natural process.' : 'I used the passive for a man-made process.', 'I used sequencing words, but not the same one every time.', 'I wrote at least 150 words.'] });
      } },
      { id: 'lang', label: 'Language', render(el) { el.appendChild(SK.card('Language for processes', SK.table(['Use', 'Language'], LANG, false))); } },
    ],
    orderItem, task,
    checks: { 'every process orders correctly and has a writing task': (data, assert) => {
      for (const p of data.processes) { const it = orderItem(p); assert.deepEqual(SK.validateItem(it), []); assert.ok(SK.isCorrect(it, p.steps)); assert.ok(p.steps.length >= 6); assert.ok(task(p).includes('150')); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
