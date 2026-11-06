/* Sentence Stress Trainer: which word is stressed and what it adds to the meaning. */
(function () {
  'use strict';
  const DRILL = [['I didn\'t say SHE took it.', 'someone else did'], ['I didn\'t SAY she took it.', 'I only thought it'], ['I prefer TEA, not coffee.', 'contrast'], ['No, I went in JULY.', 'correcting'], ['It was REALLY difficult.', 'emphasis'], ['We need the RED folder.', 'not another colour']];
  const App = {
    about: 'In natural English, content words are stressed and small grammar words are weak, and moving the stress changes the meaning: "I didn\'t say SHE took it" means someone else did. Good stress and rhythm make you easier to follow in the Speaking test. Fourteen questions on meaning, weak forms and intonation, and a drill to say aloud.',
    how: ['Answer the questions in **Practice**; capital letters show the stressed word.', 'In **Say it**, read each sentence aloud with the stress in capitals, and record yourself.', 'Listen back: does the stressed word stand out?'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => ctx.data.sentence_stress, { sizes: [7, 14], modes: false }),
      { id: 'say', label: 'Say it', render(el) { el.appendChild(SK.card('Say these aloud', SK.table(['Sentence', 'Meaning'], DRILL, false), SK.recorder({ seconds: 60 }))); } },
    ],
    checks: { 'every question is valid': (data, assert) => { for (const it of data.sentence_stress) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
