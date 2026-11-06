/* Part 2 Cue Cards: one minute to prepare with notes, then up to two minutes of speaking, recorded. */
(function () {
  'use strict';
  const cardText = (c) => '**' + c.title + '**\nYou should say:\n' + c.points.map((p) => '- ' + p).join('\n') + '\n' + c.explain;
  const App = {
    about: 'In Speaking Part 2 you get a task card, one minute to prepare and make notes, and then you speak for up to two minutes. The examiner stops you at two minutes. Forty original cue cards about people, places, objects, events and experiences, with a one-minute preparation countdown, a notes box and a two-minute recording.',
    how: ['Press **New card**. Read it and press Start: you have one minute to make notes.', 'Recording starts automatically after the minute. Speak until the two minutes run out, covering every point.', 'Listen back. Did you keep going for at least a minute and a half?'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) {
        const c = ctx.data.cue_cards[SK.store.get('ielts-cue-cards.i', SK.daySeed('cue')) % ctx.data.cue_cards.length];
        const notes = SK.h('textarea', { style: { minHeight: '90px' }, placeholder: 'Notes: keywords only', 'aria-label': 'Notes' });
        el.appendChild(SK.card('Part 2 task card', SK.h('div', { class: 'sk-passage', style: { whiteSpace: 'pre-line' } }, SK.rich(cardText(c))), notes,
          SK.h('div', { style: { marginTop: '10px' } }, SK.recorder({ prep: 60, seconds: 120, onDone: (blob, s) => { SK.clips.save({ id: 'c-' + Date.now(), at: Date.now(), app: 'ielts-cue-cards', day: SK.dayKey(), q: c.title, seconds: s, blob }).catch(() => {}); SK.logPractice(3, 'Part 2'); SK.store.set('ielts-cue-cards.lengths', SK.store.get('ielts-cue-cards.lengths', []).concat([{ day: SK.dayKey(), s: Math.round(s) }]).slice(-100)); } })),
          SK.btn('New card', () => { SK.store.set('ielts-cue-cards.i', SK.seedNow()); SK.show('practice'); }, 'ghost small', { 'data-auto': 'once' })));
        const lens = SK.store.get('ielts-cue-cards.lengths', []);
        if (lens.length > 1) el.appendChild(SK.card('How long you spoke', SK.chart.line(lens.slice(-20).map((x) => ({ y: x.s, label: x.day })), { min: 0, max: 120, label: 'Seconds spoken' })));
      } },
      { id: 'cards', label: 'All cards', render(el, ctx) { el.appendChild(SK.card('All cue cards', SK.table(['Theme', 'Card'], ctx.data.cue_cards.map((c) => [c.theme, c.title])))); } },
      { id: 'recordings', label: 'Recordings', render(el) { const c = SK.card('Your Part 2 talks'); el.appendChild(c); SK.recordingsList(c, 'ielts-cue-cards'); } },
    ],
    cardText,
    checks: { 'forty cards, each with points and an explain line': (data, assert) => { assert.equal(data.cue_cards.length, 40); for (const c of data.cue_cards) { assert.ok(c.title.startsWith('Describe')); assert.ok(cardText(c).includes('You should say')); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
