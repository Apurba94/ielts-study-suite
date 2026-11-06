/* IELTS Dashboard: study time, accuracy, bands, streaks and weak areas from every app in one page. */
(function () {
  'use strict';
  // Totals per skill area, using the catalogue to place each app.
  const summary = (sessions, practice, catalogue) => {
    const area = Object.fromEntries(catalogue.map((a) => [a.name, a.area]));
    const out = {};
    for (const a of [...new Set(catalogue.map((x) => x.area))]) out[a] = { sessions: 0, right: 0, total: 0, minutes: 0 };
    for (const s of sessions) { const a = out[area[s.app]]; if (a) { a.sessions++; a.right += s.correct; a.total += s.total; } }
    for (const p of practice) { const a = out[area[p.app]]; if (a) a.minutes += p.minutes; }
    return Object.entries(out).map(([name, a]) => ({ name, sessions: a.sessions, answers: a.total, accuracy: a.total ? Math.round((100 * a.right) / a.total) : null, minutes: SK.round(a.minutes, 0) }));
  };
  const App = {
    about: 'One page for everything you have practised in the suite: sessions, answers, accuracy and minutes for Listening, Reading, Writing, Speaking and vocabulary; your streak; your latest bands from the Score Tracker; and your weakest question types, with the error log count.',
    how: ['Practise in any app; the dashboard updates itself.', 'Look at the weakest topics first, and open the app that trains each.', 'Save a backup of all your progress from the Progress tab.'],
    tabs: [{ id: 'dash', label: 'Dashboard', render(el, ctx) {
      const S = SK.store.get('suite.sessions', []).filter((x) => x.exam === 'IELTS'), P = SK.store.get('suite.practice', []).filter((x) => x.exam === 'IELTS'), M = SK.store.get('suite.mistakes', []).filter((x) => x.exam === 'IELTS');
      const scores = SK.store.get('ielts-score-tracker.scores', []);
      const last = scores.length ? scores[scores.length - 1] : null;
      el.appendChild(SK.card('Overview', SK.stats([['Day streak', SK.streak(P.map((x) => x.day).concat(S.map((x) => x.day)))], ['Hours', SK.round(SK.sum(P.map((x) => x.minutes)) / 60, 1)], ['Apps used', new Set(S.map((x) => x.app).concat(P.map((x) => x.app))).size], ['Mistakes to review', M.length]]),
        last ? SK.h('p', { class: 'sk-small', text: 'Latest practice bands (' + last.day + '): ' + ['listening', 'reading', 'writing', 'speaking'].filter((k) => typeof last[k] === 'number').map((k) => k + ' ' + last[k]).join(', ') + '.' }) : SK.h('p', { class: 'sk-small sk-muted', text: 'Log practice bands in the Score Tracker to see them here.' })));
      el.appendChild(SK.card('By skill', SK.table(['Skill', 'Sessions', 'Answers', 'Accuracy', 'Minutes'], summary(S, P, ctx.data.catalogue).map((s) => [s.name, s.sessions, s.answers, s.accuracy === null ? '-' : s.accuracy + '%', s.minutes]))));
      const weak = SK.weakAreas(S.map((x) => Object.assign({}, x, { exam: '' })), 3).slice(0, 8);
      el.appendChild(SK.card('Weakest question types', weak.length ? SK.table(['Topic', 'Answers', 'Accuracy'], weak.map((w) => [w.topic.trim(), w.total, w.pct + '%'])) : SK.h('p', { class: 'sk-muted', text: 'Practise in a few apps to see your weakest types.' })));
    } }],
    summary,
    checks: { 'totals are placed in the right skill': (data, assert) => {
      const s = summary([{ app: 'ielts-tfng', correct: 3, total: 4 }, { app: 'ielts-dictation', correct: 1, total: 4 }], [{ app: 'ielts-tfng', minutes: 12.4 }], data.catalogue);
      const r = s.find((x) => x.name === 'Reading'), l = s.find((x) => x.name === 'Listening');
      assert.deepEqual([r.sessions, r.accuracy, r.minutes, l.accuracy], [1, 75, 12, 25]);
      assert.equal(s.length, 5);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
