/* IELTS Study Planner: a week-by-week plan from your test date, hours and weakest skills. */
(function () {
  'use strict';
  const AREAS = [
    { name: 'Listening', tasks: ['One Part 1 form and one Part 4 lecture', 'Numbers, spelling and distractor drills'] },
    { name: 'Reading', tasks: ['One passage with mixed questions in 20 minutes', 'True, False or Not Given practice'] },
    { name: 'Writing Task 1', tasks: ['One chart or letter in 20 minutes', 'Language of change or letter tone drills'] },
    { name: 'Writing Task 2', tasks: ['Plan two essays in 5 minutes each', 'Write one essay in 40 minutes'] },
    { name: 'Speaking', tasks: ['A Part 2 card and Part 3 questions, recorded', 'Speaking journal every day'] },
    { name: 'Vocabulary and grammar', tasks: ['15 academic or topic words a day', 'One grammar or error drill'] },
  ];
  const App = {
    about: 'Tell the planner your IELTS date, your weekly study hours and how confident you feel in each part of the test. It gives each week a focus, more weeks for weaker skills, a final week of full practice tests, and tasks that point to the apps in this suite.',
    how: ['Set your test date and hours in **Plan**.', 'Rate each area honestly.', 'Tick weeks off as you go and update your ratings as you improve.'],
    tabs: [{ id: 'plan', label: 'Plan', render(el) { SK.plannerView(el, { areas: AREAS }); } }],
    AREAS,
    checks: { 'the plan covers every area when all are equally weak': (data, assert) => {
      const plan = SK.planWeeks('2026-11-09', '2027-01-18', AREAS.map((a) => ({ name: a.name, weight: 3, tasks: a.tasks })), 8);
      assert.equal(plan.length, 10);
      for (const a of AREAS) assert.ok(plan.some((w) => w.focus === a.name), a.name);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
