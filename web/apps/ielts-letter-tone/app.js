/* Letter Tone Trainer: openings, closings and phrasing for formal, semi-formal and informal letters. */
(function () {
  'use strict';
  const TONES = [['Formal', 'To a company or someone you do not know', 'Dear Sir or Madam, ... Yours faithfully,', 'I am writing to complain about...; I would be grateful if you could...'], ['Semi-formal', 'To someone you know a little: a landlord, a manager, a neighbour', 'Dear Mr Patel, ... Yours sincerely, (or Kind regards,)', 'I was wondering if you could...; Perhaps we could...'], ['Informal', 'To a friend or relative', 'Dear Sam, ... Best wishes, / Love,', 'It was great to hear from you!; Why don\'t you...?']];
  const App = {
    about: 'In General Training Task 1, using the wrong tone costs marks: "Dear Sir or Madam" to a friend, or "Hey!" to a company. Learn how openings, closings and requests change across formal, semi-formal and informal letters, then practise with 22 questions.',
    how: ['Study the three tones in **Tones**.', 'Answer the questions in **Practice**.', 'When you write, decide the tone from who you are writing to, before you start.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.letter_tone, { sizes: [10, 22], modes: false }),
      { id: 'tones', label: 'Tones', render(el) { el.appendChild(SK.card('Three tones', SK.table(['Tone', 'Who to', 'Open and close', 'Typical phrases'], TONES))); } },
    ],
    checks: { 'every question is valid': (data, assert) => { for (const it of data.letter_tone) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
