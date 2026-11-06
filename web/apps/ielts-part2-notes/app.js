/* Part 2 Note Planner: use the one minute of preparation well, then speak from your notes. */
(function () {
  'use strict';
  // One note box for each point on the card, plus one for the "explain" line.
  const boxes = (c) => c.points.concat([c.explain.replace(/^and /, '')]);
  const App = {
    about: 'You get one minute to prepare in Part 2, with paper and a pencil. The best notes are a few keywords for each point on the card, not sentences, so you can glance down and keep talking. Practise making keyword notes for each point against a one-minute countdown, then speak for two minutes from them.',
    how: ['Press **New card**, then **Start the minute**.', 'Write two or three keywords for each point. Do not write sentences.', 'When the minute is up, record yourself speaking from your notes for up to two minutes.'],
    tabs: [{ id: 'plan', label: 'Plan', render(el, ctx) {
      const c = ctx.data.cue_cards[SK.store.get('ielts-part2-notes.i', SK.daySeed('notes')) % ctx.data.cue_cards.length];
      const timeBox = SK.h('span', {});
      const areas = boxes(c).map((p) => SK.field(p, SK.h('input', { type: 'text', placeholder: 'keywords' })));
      const after = SK.h('div', {});
      el.appendChild(SK.card(c.title, SK.h('div', { class: 'sk-row' }, SK.btn('Start the minute', (e) => { e.target.remove(); timeBox.appendChild(SK.timer(60, () => { SK.clear(after).appendChild(SK.note('Time to speak. Press Start recording.')); }).el); }, '', { 'data-auto': 'once' }), timeBox,
        SK.btn('New card', () => { SK.store.set('ielts-part2-notes.i', SK.seedNow()); SK.show('plan'); }, 'ghost small')), areas, after, SK.recorder({ seconds: 120, onDone: (b, s) => { SK.logPractice(3, 'Part 2 notes'); SK.clips.save({ id: 'c-' + Date.now(), at: Date.now(), app: 'ielts-part2-notes', day: SK.dayKey(), q: c.title, seconds: s, blob: b }).catch(() => {}); } })));
      el.appendChild(SK.card('Good notes', SK.h('ul', {}, ['Keywords, not sentences: "Mr Ahmed / maths / age 14 / patient / jokes".', 'One line per point on the card, in order.', 'Add one story or example you can tell in detail.', 'Use the last line for the "explain" part, which carries your best ideas.'].map((t) => SK.h('li', { text: t })))));
    } }],
    boxes,
    checks: { 'every card gives a note box per point plus the explain line': (data, assert) => { for (const c of data.cue_cards) assert.equal(boxes(c).length, c.points.length + 1); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
