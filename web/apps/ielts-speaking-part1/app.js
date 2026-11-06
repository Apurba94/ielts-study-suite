/* Speaking Part 1 Practice: everyday questions read aloud and answered on a recording. */
(function () {
  'use strict';
  const App = {
    about: 'Speaking Part 1 lasts four to five minutes: the examiner asks questions about familiar topics such as your home, work, hobbies and daily life. Answers should be natural and extended a little: an answer, a reason, perhaps an example. Thirty topics with four questions each are read aloud by your computer, and each answer is recorded so you can listen back.',
    how: ['Choose a topic, or take a random one, and press **Start**.', 'Listen to the question and answer in about 20 to 30 seconds. Each answer is recorded.', 'Listen back at the end. Did you answer the question and add a reason or example?', 'Recordings stay on this device.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) {
        const topics = ctx.data.speaking_part1;
        let t = 'random';
        el.appendChild(SK.card('Part 1 interview', SK.select([['random', 'Random topic']].concat(topics.map((x) => [x.id, x.topic])), t, (v) => { t = v; }, 'Topic'),
          SK.h('div', { style: { marginTop: '12px' } }, SK.btn('Start', () => { const top = t === 'random' ? SK.pick(SK.rng(SK.seedNow()), topics) : topics.find((x) => x.id === t); SK.askAndRecord(el, top.questions, { title: top.topic + ': question', seconds: 40 }); }, '', { 'data-auto': 'once' })), SK.voicePicker()));
      } },
      { id: 'topics', label: 'Topics', render(el, ctx) { el.appendChild(SK.card('All Part 1 topics', SK.table(['Topic', 'Questions'], ctx.data.speaking_part1.map((x) => [x.topic, x.questions.join(' ')])))); } },
      { id: 'recordings', label: 'Recordings', render(el) { const c = SK.card('Your Part 1 answers'); el.appendChild(c); SK.recordingsList(c, 'ielts-speaking-part1'); } },
    ],
    checks: { 'thirty topics of four questions': (data, assert) => { assert.equal(data.speaking_part1.length, 30); for (const t of data.speaking_part1) { assert.equal(t.questions.length, 4); for (const q of t.questions) assert.ok(q.endsWith('?')); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
