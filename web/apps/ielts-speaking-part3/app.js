/* Speaking Part 3 Discussion: deeper questions linked to the Part 2 topics. */
(function () {
  'use strict';
  const TIPS = ['Give a direct answer first, then explain why.', 'Talk about people in general, not only yourself: "Many young people...", "In my country...".', 'Give an example, compare past and present, or look at both sides.', 'It is fine to say "That\'s a difficult question" and take a moment.', 'Aim for 30 to 60 seconds per answer.'];
  const App = {
    about: 'Speaking Part 3 is a four-to-five-minute discussion of more abstract questions linked to the Part 2 topic: not "describe your teacher" but "what makes a good teacher?". You are expected to give reasons, compare, speculate and give balanced views. Each of the forty cue-card themes has three Part 3 questions, read aloud and recorded.',
    how: ['Choose a theme and press **Start**.', 'Answer each question in 30 to 60 seconds, with a reason and an example.', 'Listen back. Did you develop the answer, or stop after one sentence?'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) {
        const cards = ctx.data.cue_cards;
        let id = 'random';
        el.appendChild(SK.card('Part 3 discussion', SK.select([['random', 'Random theme']].concat(cards.map((c) => [c.id, c.title.replace('Describe ', '')])), id, (v) => { id = v; }, 'Linked to'),
          SK.h('div', { style: { marginTop: '12px' } }, SK.btn('Start', () => { const c = id === 'random' ? SK.pick(SK.rng(SK.seedNow()), cards) : cards.find((x) => x.id === id); SK.askAndRecord(el, c.part3, { title: 'Part 3: question', seconds: 75 }); }, '', { 'data-auto': 'once' }))));
        el.appendChild(SK.card('How to answer', SK.h('ul', {}, TIPS.map((t) => SK.h('li', { text: t })))));
      } },
      { id: 'recordings', label: 'Recordings', render(el) { const c = SK.card('Your Part 3 answers'); el.appendChild(c); SK.recordingsList(c, 'ielts-speaking-part3'); } },
    ],
    checks: { 'every card has three discussion questions': (data, assert) => { for (const c of data.cue_cards) { assert.equal(c.part3.length, 3); for (const q of c.part3) assert.ok(q.endsWith('?')); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
