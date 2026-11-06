/* Sentence Completion Listening: hear a short extract and complete a sentence about it. */
(function () {
  'use strict';
  const LIMIT = 'NO MORE THAN TWO WORDS AND/OR A NUMBER';
  const items = (clips, n, seed) => { const r = SK.rng(seed); return SK.sample(r, clips, n).map((c) => ({ id: c.id, type: 'text', topic: 'Sentence completion', stem: c.stem + '\n(' + LIMIT + ')', audio: { title: 'Extract', text: c.say }, answer: c.answer, accept: c.accept || [], explanation: 'You heard: "' + c.say + '"' })); };
  const App = {
    about: 'Sentence completion asks you to finish a sentence that paraphrases what you hear, using words from the recording. The trap is that the sentence uses different words, so you must match meaning, not sound. Thirty-six short original extracts, each with one sentence to complete.',
    how: ['Read the sentence first and predict the kind of word that fits.', 'Press Play and listen for the meaning of the sentence, not its exact words.', 'Write the words you hear, within the limit, spelled correctly.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'Complete the sentence', sizes: [10, 20, 36], make: (t, n, s) => items(ctx.data.listening_clips, n, s), seconds: (n) => n * 30 }); } }],
    items,
    checks: { 'every answer is in its extract and keeps to the limit': (data, assert) => {
      for (const c of data.listening_clips) { assert.ok(SK.ielts.fitsLimit(c.answer, LIMIT).ok, c.id); }
      for (const it of items(data.listening_clips, 36, 1)) assert.ok(SK.isCorrect(it, it.answer));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
