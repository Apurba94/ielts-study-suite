/* Flow-Chart and Diagram Completion: read a process and complete the flow-chart. */
(function () {
  'use strict';
  const sets = (bank) => bank.map((p) => ({ id: p.id, title: p.title, passageTitle: p.title, passage: p.text, limit: 'ONE WORD ONLY', instructions: 'Complete the flow-chart. Choose ONE WORD ONLY from the passage for each answer.',
    figure: { kind: 'process', title: p.title, steps: p.steps.map((s, i) => s.label.replace('___', '(' + (i + 1) + ')')) },
    questions: p.steps.map((s, k) => ({ id: p.id + '-' + k, type: 'text', topic: 'Flow-chart', stem: '(' + (k + 1) + ') ' + s.label, answer: s.answer, accept: s.accept || [], explanation: 'Step ' + (k + 1) + ': ' + s.label.replace('___', s.answer) + '.' })) }));
  const App = {
    about: 'Flow-charts and labelled diagrams describe a process, and you fill the gaps with words from the passage. The steps follow the order of the text. Five original process texts, from making chocolate to how a bill becomes law, each drawn as a flow-chart.',
    how: ['Look at the flow-chart first: it shows the order and gives you the structure.', 'Find the start of the process in the text and follow it step by step.', 'Copy one word exactly from the passage for each gap.'],
    tabs: [{ id: 'sets', label: 'Processes', render(el, ctx) { SK.setBank(el, { title: 'Flow-chart completion', sets: sets(ctx.data.reading_processes),
      tips: ['Sequence words help you keep your place: first, then, once, finally.', 'The word in a gap is often a noun after "a" or "the", or a past participle after "is".', 'Check the spelling of every word you copy.'] }); } }],
    sets,
    checks: { 'every gap is one word found in its text': (data, assert) => {
      for (const set of sets(data.reading_processes)) for (const q of set.questions) { assert.ok(SK.ielts.fitsLimit(q.answer, 'ONE WORD ONLY').ok); assert.ok(set.passage.toLowerCase().includes(q.answer.toLowerCase()), q.id); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
