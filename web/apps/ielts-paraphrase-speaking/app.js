/* Say It Another Way: describe a word you have forgotten, so you never stop mid-sentence. */
(function () {
  'use strict';
  const items = (bank, n, seed) => { const r = SK.rng(seed); return SK.sample(r, bank, n).map((x) => SK.shuffleItem(r, { id: 'cl-' + x.id, type: 'single', topic: 'Paraphrase', stem: 'A speaker forgot a word and said:\n"' + x.desc + '"\nWhich word were they describing?', choices: [x.word].concat(SK.sample(r, bank.filter((o) => o.id !== x.id), 3).map((o) => o.word)), answer: 0, explanation: 'The word is **' + x.word + '**. A description like this keeps you speaking.' })); };
  const FRAMES = ['It\'s a kind of... / It\'s a type of...', 'It\'s something you use to...', 'It\'s the person who...', 'It\'s the place where...', 'It\'s when... / It means to...', 'I can\'t remember the word, but it\'s a bit like...'];
  const App = {
    about: 'Everyone forgets a word sometimes. Stopping hurts your fluency score, but describing the word shows the examiner you can paraphrase, which is part of lexical resource. Learn six frames for describing what you cannot name, guess twenty descriptions, then describe words yourself.',
    how: ['Learn the frames in **Frames**.', 'In **Practice**, guess which word each description is about.', 'In **Your turn**, describe each word without saying it, and record yourself.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'Which word?', sizes: [10, 20], make: (t, n, s) => items(ctx.data.circumlocution, n, s), seconds: (n) => n * 20, modes: false }); } },
      { id: 'frames', label: 'Frames', render(el) { el.appendChild(SK.card('Frames for describing a word', SK.h('ul', {}, FRAMES.map((f) => SK.h('li', { text: f }))))); } },
      { id: 'yours', label: 'Your turn', render(el, ctx) { const ws = SK.sample(SK.rng(SK.seedNow()), ctx.data.circumlocution, 5).map((x) => 'Describe this without saying it: **' + x.word + '**'); el.appendChild(SK.card('Your turn', SK.btn('Start', () => SK.askAndRecord(el, ws, { title: 'Word', seconds: 30, speak: false }), '', { 'data-auto': 'once' }))); } },
    ],
    items,
    checks: { 'descriptions never contain their word': (data, assert) => { for (const x of data.circumlocution) assert.ok(!x.desc.toLowerCase().includes(x.word.toLowerCase()), x.word); for (const it of items(data.circumlocution, 20, 1)) assert.deepEqual(SK.validateItem(it), []); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
