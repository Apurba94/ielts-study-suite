/* Speculating and Comparing: the language Part 3 needs for the future, the past and balanced views. */
(function () {
  'use strict';
  const QUESTIONS = ['How do you think cities will change in the next twenty years?', 'How has the way people shop changed since your parents were young?', 'What would happen if public transport were free?', 'Do you think people will read fewer books in the future?', 'Is life easier for young people today than it was in the past?'];
  const App = {
    about: 'Part 3 questions ask you to predict, compare past and present, imagine situations and weigh both sides, which needs specific grammar and phrases: I\'d imagine that, used to, if ... were, on the whole, to some extent. Sixteen questions on that language, then five Part 3 questions to answer aloud.',
    how: ['Pick an area in **Practice**, or All, and read each explanation.', 'In **Your turn**, answer the questions aloud, using the language you practised, and record yourself.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.speculating, { sizes: [8, 16] }),
      { id: 'yours', label: 'Your turn', render(el) { el.appendChild(SK.card('Your turn', SK.h('p', { class: 'sk-muted', text: 'Five Part 3 questions that need speculation and comparison.' }), SK.btn('Start', () => SK.askAndRecord(el, QUESTIONS, { title: 'Part 3 question', seconds: 75 }), '', { 'data-auto': 'once' }))); } },
    ],
    checks: { 'every question is valid': (data, assert) => { for (const it of data.speculating) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
