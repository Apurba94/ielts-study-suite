/* IELTS Test Day Planner: a countdown and checklist for the final weeks, the day and the Speaking test. */
(function () {
  'use strict';
  const GROUPS = [
    { name: 'Four weeks before', daysBefore: 28, items: ['Check your booking: Academic or General Training, date, centre, and whether the test is on computer.', 'Check that the name on your booking matches your ID exactly.', 'Find out the date and time of your Speaking test, which may be on a different day.', 'Take a full mock test.'] },
    { name: 'One week before', daysBefore: 7, items: ['Do one last full Listening and Reading test, then focus on review.', 'Practise typing your essays if you take the test on computer.', 'Plan your route to the centre and how long it takes.', 'Speak English aloud every day, even for ten minutes.'] },
    { name: 'The day before', daysBefore: 1, items: ['Light review only: a few vocabulary cards and one Part 2 card.', 'Put your ID (the same one you booked with) by the door.', 'Read the centre\'s rules on what you may bring.', 'Sleep well.'] },
    { name: 'Test day', daysBefore: 0, items: ['Arrive early; you must be checked in before the test starts.', 'Listening: read ahead while you can, and use the checking time at the end.', 'Reading: spend about 20 minutes per section, and answer every question.', 'Writing: Task 2 counts for more, so do not overrun on Task 1.', 'Speaking: answer naturally, extend your answers, and ask the examiner to repeat if needed.'] },
  ];
  const App = {
    about: 'A countdown to your IELTS date with four checklists, from four weeks out to test day, including the Speaking test, which may be on a different day. Rules on ID, timing and what you can bring are set by the test centre and can change, so the list reminds you to check them.',
    how: ['Set your test date in **Checklist**.', 'Tick each item; each group shows the date to finish it by.', 'Check your centre\'s current rules before the test.'],
    tabs: [{ id: 'list', label: 'Checklist', render(el) { SK.countdownChecklist(el, { groups: GROUPS, footer: 'Rules for ID, check-in and what you may bring are set by the test centre and can change. Check your booking confirmation and ielts.org before your test.' }); } }],
    GROUPS,
    checks: { 'groups run from earliest to test day': (data, assert) => { assert.deepEqual(GROUPS.map((g) => g.daysBefore), [28, 7, 1, 0]); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
