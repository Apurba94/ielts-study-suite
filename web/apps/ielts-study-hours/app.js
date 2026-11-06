/* Study Hours Tracker: minutes practised in every app of the suite, by day and skill, against a weekly goal. */
(function () {
  'use strict';
  const KEY = 'ielts-study-hours.goal';
  const perDay = (practice, today, n) => SK.range(n).map((i) => { const d = SK.addDays(today, i - n + 1); return { day: d, minutes: SK.round(SK.sum(practice.filter((p) => p.day === d).map((p) => p.minutes)), 0) }; });
  const thisWeek = (practice, today) => SK.sum(perDay(practice, today, 7).map((d) => d.minutes));
  // The skill area of each app comes from the catalogue.
  const bySkill = (practice, catalogue) => { const area = Object.fromEntries(catalogue.map((a) => [a.name, a.area])); const out = {}; for (const p of practice) { const k = area[p.app] || 'Other'; out[k] = (out[k] || 0) + p.minutes; } return out; };
  const App = {
    about: 'Every app in the suite records the minutes you practise. This tracker brings them together: minutes per day for the last two weeks, totals by skill (Listening, Reading, Writing, Speaking, Vocabulary and Planning), your streak, and progress towards a weekly goal you set.',
    how: ['Practise in any app of the suite; minutes are counted automatically.', 'Set a weekly goal in **Overview**. Five to eight hours a week is a common target.', 'Look at **By skill** to check your time matches your weakest skills.'],
    tabs: [
      { id: 'overview', label: 'Overview', render(el) {
        const pr = SK.store.get('suite.practice', []), goal = SK.store.get(KEY, 300), d = SK.dayKey();
        const week = thisWeek(pr, d);
        el.appendChild(SK.card('This week', SK.stats([['Minutes in the last 7 days', SK.round(week, 0)], ['Weekly goal', goal], ['Day streak', SK.streak(pr.map((p) => p.day))], ['All time, hours', SK.round(SK.sum(pr.map((p) => p.minutes)) / 60, 1)]]), SK.bar((100 * week) / goal),
          SK.h('div', { style: { marginTop: '10px' } }, SK.select([[120, '2 hours a week'], [300, '5 hours'], [480, '8 hours'], [720, '12 hours'], [1200, '20 hours']], goal, (v) => { SK.store.set(KEY, Number(v)); SK.show('overview'); }, 'Weekly goal'))));
        el.appendChild(SK.card('Last 14 days', SK.chart.bars(perDay(pr, d, 14).map((x) => ({ label: x.day.slice(5), value: x.minutes })), { label: 'Minutes per day' })));
      } },
      { id: 'skills', label: 'By skill', render(el, ctx) {
        const s = bySkill(SK.store.get('suite.practice', []), ctx.data.catalogue);
        el.appendChild(SK.card('Minutes by skill', Object.keys(s).length ? SK.chart.bars(Object.entries(s).map(([k, v]) => ({ label: k.split(' ')[0], value: SK.round(v, 0) })), { label: 'Minutes by skill' }) : SK.h('p', { class: 'sk-muted', text: 'No practice recorded yet.' })));
      } },
    ],
    perDay, thisWeek, bySkill,
    checks: { 'minutes are summed per day and per skill': (data, assert) => {
      const pr = [{ day: '2026-11-06', minutes: 10, app: 'ielts-tfng' }, { day: '2026-11-06', minutes: 5, app: 'ielts-dictation' }, { day: '2026-11-04', minutes: 20, app: 'ielts-tfng' }];
      assert.deepEqual(perDay(pr, '2026-11-06', 3).map((x) => x.minutes), [20, 0, 15]);
      assert.equal(thisWeek(pr, '2026-11-06'), 35);
      assert.deepEqual(bySkill(pr, data.catalogue), { Reading: 30, Listening: 5 });
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
