/* Speaking Journal: a daily one-minute recording diary with prompts. */
(function () {
  'use strict';
  const today = (cards, day) => cards[SK.daySeed('ielts-speaking-journal', day) % cards.length];
  const App = {
    about: 'Speaking every day, even for one minute, builds confidence faster than an hour once a week. Each day this journal gives you a prompt from the Part 2 cards, records your answer, and keeps it with the date, so you can hear how your English sounded a month ago. Recordings stay on this device.',
    how: ['Open the journal once a day and read **Today**\'s prompt.', 'Record up to one minute. Speak naturally; mistakes are fine.', 'Listen to old entries in **Entries** to hear your progress.'],
    tabs: [
      { id: 'today', label: 'Today', render(el, ctx) {
        const d = SK.dayKey(), c = today(ctx.data.cue_cards, d);
        const days = SK.store.get('ielts-speaking-journal.days', []);
        el.appendChild(SK.card('Today, ' + d, SK.h('div', { class: 'sk-passage', text: c.title + ' ' + c.explain.replace(/^and /, 'Explain ') }), SK.stats([['Day streak', SK.streak(days)], ['Entries', days.length]]),
          SK.recorder({ seconds: 60, onDone: (blob, s) => {
            SK.clips.save({ id: 'j-' + Date.now(), at: Date.now(), app: 'ielts-speaking-journal', day: d, q: c.title, seconds: s, blob }).then(() => {
              const all = SK.store.get('ielts-speaking-journal.days', []); if (!all.includes(d)) all.push(d); SK.store.set('ielts-speaking-journal.days', all);
              SK.logPractice(s / 60, 'Speaking journal');
            }).catch((e) => SK.warn('The recording could not be saved: ' + e.message));
          } })));
      } },
      { id: 'entries', label: 'Entries', render(el) { const c = SK.card('Your entries'); el.appendChild(c); SK.recordingsList(c, 'ielts-speaking-journal', 60); } },
    ],
    today,
    checks: { 'the prompt is fixed for a day and changes across days': (data, assert) => {
      assert.equal(today(data.cue_cards, '2026-11-06'), today(data.cue_cards, '2026-11-06'));
      assert.ok(new Set(SK.range(7).map((i) => today(data.cue_cards, SK.addDays('2026-11-01', i)).id)).size >= 4);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
