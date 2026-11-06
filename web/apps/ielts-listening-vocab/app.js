/* Listening Topic Words: hear and spell the words that come up again and again in IELTS Listening. */
(function () {
  'use strict';
  // Hear the word in its sentence, then type the word alone.
  const items = (words, topic, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, words.filter((w) => topic === 'All' || w.tag === topic), n).map((w) => ({ id: 'lv-' + w.id, type: 'text', topic: w.tag, stem: 'Type the ' + w.tag.toLowerCase() + ' word you hear in the sentence.', audio: { title: 'Sentence', text: w.e }, answer: w.w, explanation: '"' + w.e + '" The word is **' + w.w + '**.' }));
  };
  const App = {
    about: 'IELTS Listening returns to the same everyday and academic settings: accommodation, services, travel, study, health, the environment, community, work and business. About ninety words from these topics come up again and again, and each has to be spelled correctly. Hear each one in a sentence and type it.',
    how: ['Choose a topic in **Practice**, or All.', 'Press Play, listen to the sentence and type the topic word you heard.', 'Learn the list in **Words**; say each word aloud.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { const w = ctx.data.listening_words; SK.quizStarter(el, { title: 'Hear it, spell it', topics: [...new Set(w.map((x) => x.tag))], sizes: [10, 20], make: (t, n, s) => items(w, t, n, s), seconds: (n) => n * 25 }); } },
      { id: 'words', label: 'Words', render(el, ctx) { el.appendChild(SK.card('Topic words', SK.table(['Word', 'Topic', 'Example'], ctx.data.listening_words.map((w) => [SK.h('strong', { text: w.w }), w.tag, w.e])))); } },
    ],
    items,
    checks: { 'every sentence contains its word, and items mark': (data, assert) => {
      assert.ok(data.listening_words.length >= 80);
      for (const w of data.listening_words) assert.ok(w.e.toLowerCase().includes(w.w.toLowerCase()), w.w);
      for (const it of items(data.listening_words, 'All', 40, 1)) assert.ok(SK.isCorrect(it, it.answer));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
