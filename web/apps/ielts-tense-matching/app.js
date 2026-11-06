/* Answer in the Right Tense: match the tense of your answer to the tense of the question. */
(function () {
  'use strict';
  const GUIDE = [['What did you do...? / When did you last...?', 'past simple: I went, I saw'], ['Do you usually...? / What do you like...?', 'present simple: I usually go'], ['Have you ever...? / ...recently?', 'present perfect: I have been'], ['How long have you been...?', 'present perfect continuous: I have been learning'], ['What are you going to do...? / Do you think you will...?', 'going to / will'], ['If you could..., what would you...?', 'would: I would live'], ['What did you use to do as a child?', 'used to / would: I used to play']];
  const App = {
    about: 'A common Speaking mistake is answering a question about the past in the present, or a hypothetical question without "would". Examiners notice tense errors in your grammar score. Sixteen questions train you to hear the tense of the question and answer in kind.',
    how: ['Learn the question patterns in **Guide**.', 'In **Practice**, choose the answer whose tense matches the question.', 'In real practice, listen to the first words of each question: did, do, have, would.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.tense_matching, { sizes: [8, 16] }),
      { id: 'guide', label: 'Guide', render(el) { el.appendChild(SK.card('Question and answer tenses', SK.table(['The question', 'Answer with'], GUIDE, false))); } },
    ],
    checks: { 'every question is valid': (data, assert) => { for (const it of data.tense_matching) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
