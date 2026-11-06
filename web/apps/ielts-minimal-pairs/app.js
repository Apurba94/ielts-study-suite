/* Minimal Pairs Trainer: hear one of two close words, such as ship and sheep, and pick which. */
(function () {
  'use strict';
  const items = (groups, contrast, n, seed) => {
    const r = SK.rng(seed);
    const pool = groups.filter((g) => contrast === 'All' || g.contrast === contrast).flatMap((g) => g.pairs.map((p) => [g, p]));
    return SK.sample(r, pool, n).map(([g, p]) => {
      const k = Math.floor(r() * 2);
      return { id: 'mp-' + p.join('-') + k, type: 'single', topic: g.contrast, stem: 'Which word do you hear?', audio: { title: 'Word', text: p[k] }, choices: p.slice(), answer: k, fixedOrder: true, explanation: 'You heard **' + p[k] + '**. The pair is ' + p[0] + ' / ' + p[1] + ' (' + g.contrast + ').' };
    });
  };
  const App = {
    about: 'Pronunciation is a quarter of your Speaking score, and it is judged on how easily you are understood, not on your accent. Minimal pairs are words that differ in one sound, such as ship and sheep: hearing the difference helps Listening, and saying it helps Speaking. Ten common contrasts for English learners.',
    how: ['Pick a sound contrast in **Practice**, or All.', 'Press Play and choose the word you heard.', 'Then say both words aloud, slowly, and feel the difference in your mouth.', 'Computer voices are clear but not perfect: if a pair sounds the same, try another voice.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { const groups = ctx.data.minimal_pairs; SK.quizStarter(el, { title: 'Minimal pairs', topics: groups.map((g) => g.contrast), sizes: [10, 20], make: (t, n, s) => items(groups, t, n, s), seconds: (n) => n * 10 }); } },
      { id: 'pairs', label: 'Pairs', render(el, ctx) { el.appendChild(SK.card('Contrasts', SK.table(['Sounds', 'Pairs'], ctx.data.minimal_pairs.map((g) => [g.contrast, g.pairs.map((p) => p.join(' / ')).join(', ')]), false), SK.voicePicker())); } },
    ],
    items,
    checks: { 'questions offer exactly the pair and the right word is the one spoken': (data, assert) => {
      for (const it of items(data.minimal_pairs, 'All', 60, 4)) { assert.equal(it.choices.length, 2); assert.equal(it.choices[it.answer], it.audio.text); assert.deepEqual(SK.validateItem(it), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
