/* Word Stress Trainer: choose the stressed syllable of common words, and learn the patterns. */
(function () {
  'use strict';
  const items = (bank) => bank.map((x) => ({ id: x.id, type: 'single', topic: 'Word stress', stem: 'Which syllable is stressed in **' + x.w + '**?', audio: { title: 'Word', text: x.w }, choices: x.syl.map((s, i) => s.toLowerCase() + ' (' + ['1st', '2nd', '3rd', '4th', '5th', '6th'][i] + ')'), answer: x.s, fixedOrder: true, explanation: x.syl.join('-') + '. ' + x.rule }));
  const RULES = [['-tion, -sion', 'Stress the syllable just before: in-for-MA-tion.'], ['-ic, -ical', 'Stress the syllable just before: e-co-NOM-ic, an-a-LYT-i-cal.'], ['-ity', 'Stress the syllable just before: u-ni-VER-si-ty.'], ['-ology, -graphy', 'Stress the syllable just before: bi-OL-o-gy, ge-OG-ra-phy.'], ['Word families', 'Stress can move: PHO-to-graph, pho-TO-gra-pher, pho-to-GRA-phic.']];
  const App = {
    about: 'Wrong word stress makes a word hard to recognise, even when every sound is right, and examiners judge pronunciation on how easy you are to understand. This app drills 29 words, including families where the stress moves (PHOtograph, phoTOgrapher, photoGRAPHic), and teaches the ending rules that predict stress.',
    how: ['Learn the rules in **Rules**.', 'In **Practice**, choose the stressed syllable, then press Play to hear the word.', 'Say the word aloud with the stress, clapping on the strong syllable.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => items(ctx.data.stress), { sizes: [10, 20, 29], modes: false }),
      { id: 'rules', label: 'Rules', render(el) { el.appendChild(SK.card('Rules that predict stress', SK.table(['Ending', 'Rule'], RULES, false))); } },
    ],
    items,
    checks: { 'the right syllable is the one in capitals': (data, assert) => { for (const [i, it] of items(data.stress).entries()) { const x = data.stress[i]; assert.equal(x.syl[it.answer], x.syl[it.answer].toUpperCase()); assert.deepEqual(SK.validateItem(it), []); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
