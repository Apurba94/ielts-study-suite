/* Extending Your Answers: compare short and developed answers, then practise adding reasons and examples. */
(function () {
  'use strict';
  const PATTERNS = [['Part 1', 'Answer + reason + small detail (2 or 3 sentences, about 20 seconds)'], ['Part 3', 'Answer + reason + example or comparison + short conclusion (30 to 60 seconds)'], ['Adding a reason', 'because, since, the main reason is'], ['Adding an example', 'for instance, take my brother, for example'], ['Adding a contrast', 'although, but on the other hand, whereas']];
  const QUESTIONS = ['Do you like cooking?', 'What do you usually do at weekends?', 'Do you prefer the city or the countryside?', 'Is it important to learn a second language?', 'Should children have mobile phones?', 'What makes a good friend?'];
  const App = {
    about: 'One-word answers keep your fluency and vocabulary hidden, while long memorised speeches sound unnatural. The sweet spot is an answer with a reason and a detail in Part 1, and a developed answer with an example or comparison in Part 3. Compare good and weak answers to twelve questions, then practise extending your own.',
    how: ['Learn the patterns in **Patterns**.', 'In **Practice**, choose the best answer and read why.', 'In **Your turn**, answer each question aloud using the pattern, and record yourself.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.extend_answers, { sizes: [6, 12], modes: false }),
      { id: 'patterns', label: 'Patterns', render(el) { el.appendChild(SK.card('Extending an answer', SK.table(['Use', 'Pattern'], PATTERNS, false))); } },
      { id: 'yours', label: 'Your turn', render(el) { el.appendChild(SK.card('Your turn', SK.h('p', { class: 'sk-muted', text: 'Answer each question with an answer, a reason and an example.' }), SK.btn('Start', () => SK.askAndRecord(el, QUESTIONS, { title: 'Question', seconds: 45 }), '', { 'data-auto': 'once' }))); } },
    ],
    checks: { 'every comparison question is valid': (data, assert) => { for (const it of data.extend_answers) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
