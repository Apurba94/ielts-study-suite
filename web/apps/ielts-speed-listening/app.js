/* Speed Listening: hear the same line slow, normal and fast, and train your ear for natural speech. */
(function () {
  'use strict';
  const SPEEDS = [[0.75, 'Slow'], [1, 'Normal'], [1.25, 'Fast'], [1.45, 'Very fast']];
  // Questions heard at a chosen speed: which of four sentences was it?
  const items = (dict, n, seed, rate) => {
    const r = SK.rng(seed);
    return SK.sample(r, dict, n).map((d) => SK.shuffleItem(r, { id: 'spd-' + d.id, type: 'single', topic: 'Speed ' + rate, stem: 'Which sentence did you hear?', audio: { title: 'Sentence', text: d.text }, audioOpts: {}, rate, choices: [d.text].concat(SK.sample(r, dict.filter((o) => o.id !== d.id && o.level === d.level), 3).map((o) => o.text)), answer: 0, explanation: d.text }));
  };
  const App = {
    about: 'Recordings in IELTS are spoken at a natural speed, and Part 4 lectures can feel fast. Train up from slow to very fast: hear the same sentence at four speeds, then test yourself at a speed a little above what feels comfortable.',
    how: ['In **Ladder**, play one sentence at each speed in turn and read along.', 'In **Quiz**, set the speed and choose the sentence you heard.', 'Move up a speed when you get 9 out of 10 right.'],
    tabs: [
      { id: 'ladder', label: 'Ladder', render(el, ctx) {
        const out = SK.h('div', {});
        const go = () => {
          const d = SK.pick(SK.rng(SK.seedNow()), ctx.data.dictation);
          SK.clear(out).appendChild(SK.h('p', { class: 'sk-passage', text: d.text }));
          out.appendChild(SK.h('div', { class: 'sk-row' }, SPEEDS.map(([r, l]) => SK.btn(l, () => SK.speech.say(d.text, { rateScale: r }), 'ghost small'))));
          SK.logPractice(0.5, 'Speed listening');
        };
        el.appendChild(SK.card('One sentence, four speeds', SK.btn('New sentence', go, '', { 'data-auto': 'once' }), out));
      } },
      { id: 'quiz', label: 'Quiz', render(el, ctx) {
        let rate = 1.25;
        SK.quizStarter(el, { title: 'Fast listening', sizes: [10, 20], make: (t, n, s) => items(ctx.data.dictation, n, s, rate).map((it) => Object.assign(it, { audio: Object.assign({}, it.audio, { title: 'Sentence at ' + rate + ' x', rate }) })), seconds: (n) => n * 20,
          extra: () => SK.select(SPEEDS.map(([r, l]) => [r, l + ' (' + r + ' x)']), rate, (v) => { rate = Number(v); SK.store.set('ielts-speed-listening.rate', rate); }, 'Speed') });
      } },
    ],
    items,
    checks: { 'quiz sentences are distinct and the right one is spoken': (data, assert) => { for (const it of items(data.dictation, 20, 3, 1.25)) { assert.equal(new Set(it.choices).size, 4); assert.equal(it.choices[it.answer], it.audio.text); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
