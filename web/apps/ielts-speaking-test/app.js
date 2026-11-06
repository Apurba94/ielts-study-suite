/* Speaking Test Simulator: Part 1, Part 2 and Part 3 in order, read aloud and recorded. */
(function () {
  'use strict';
  // One test: four Part 1 questions on one topic, one cue card, and its three Part 3 questions.
  const build = (data, seed) => {
    const r = SK.rng(seed);
    const p1 = SK.pick(r, data.speaking_part1), card = SK.pick(r, data.cue_cards);
    return { p1, card, parts: [
      { label: 'Part 1', questions: p1.questions, seconds: 40, intro: 'Part 1: the examiner asks about ' + p1.topic.toLowerCase() + '. Answer in 20 to 30 seconds.' },
      { label: 'Part 2', questions: ['**' + card.title + '**\nYou should say:\n' + card.points.map((p) => '- ' + p).join('\n') + '\n' + card.explain], seconds: 120, prep: 60, speak: false, intro: 'Part 2: one minute to prepare, then speak for up to two minutes.' },
      { label: 'Part 3', questions: card.part3, seconds: 75, intro: 'Part 3: a discussion linked to Part 2. Give reasons and examples.' },
    ] };
  };
  const App = {
    about: 'A full practice Speaking test in the real order: Part 1 questions about yourself (four to five minutes), a Part 2 long turn with one minute to prepare and up to two minutes to speak, then Part 3 discussion questions linked to Part 2 (four to five minutes). In all, it takes 11 to 14 minutes. Every answer is recorded on this device so you can listen back or share it with a teacher.',
    how: ['Find a quiet room and allow 15 minutes. Allow the microphone when asked.', 'Press **Start the test** and answer each question as the computer reads it.', 'At the end, listen to your recordings and rate them in the Speaking Self-Check app.'],
    tabs: [
      { id: 'test', label: 'Test', render(el, ctx) {
        el.appendChild(SK.card('Speaking test', SK.h('p', { class: 'sk-muted', text: 'Three parts, about 11 to 14 minutes.' }), SK.btn('Start the test', () => {
          const t = build(ctx.data, SK.seedNow());
          let k = 0;
          const next = () => { if (k >= t.parts.length) { SK.clear(el); el.appendChild(SK.card('Test finished', SK.h('p', { text: 'Listen to your recordings below. Then rate them in the Speaking Self-Check app.' }))); SK.recordingsList(el, 'ielts-speaking-test', 8); return; }
            const p = t.parts[k++]; SK.askAndRecord(el, p.questions, { title: p.label, seconds: p.seconds, prep: p.prep, intro: p.intro, speak: p.speak, doneTitle: p.label + ' done', onDone: () => { el.appendChild(SK.h('div', { class: 'sk-row', style: { margin: '10px 0' } }, SK.btn(k < t.parts.length ? 'Go on to ' + t.parts[k].label : 'Finish the test', next, '', { 'data-auto': 'once' }))); } }); };
          next();
        }, '', { 'data-auto': 'once' })));
      } },
      { id: 'recordings', label: 'Recordings', render(el) { const c = SK.card('Your test recordings'); el.appendChild(c); SK.recordingsList(c, 'ielts-speaking-test'); } },
    ],
    build,
    checks: { 'a test has three parts with the right timings': (data, assert) => {
      for (let s = 1; s < 30; s++) { const t = build(data, s); assert.deepEqual(t.parts.map((p) => p.label), ['Part 1', 'Part 2', 'Part 3']); assert.equal(t.parts[1].prep, 60); assert.equal(t.parts[1].seconds, 120); assert.equal(t.parts[2].questions.length, 3); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
