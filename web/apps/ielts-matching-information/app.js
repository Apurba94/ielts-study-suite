/* Matching Information: find which paragraph contains a given piece of information. */
(function () {
  'use strict';
  const sets = (passages) => passages.map((p) => Object.assign(SK.ielts.passageSet(p, ['info'], 1), { instructions: 'Which paragraph, A to F, contains the following information? You may use any letter more than once.' }));
  const App = {
    about: 'Matching information gives you a description of something, such as "a comparison between patients" or "a reason why young trees fail", and asks which paragraph contains it. Unlike headings, the information is usually a detail, and the questions are not in passage order. Six passages, 24 questions.',
    how: ['Read each description and notice what kind of thing it is: an example, a reason, a figure, a comparison.', 'Scan for that kind of thing, not for the same words.', 'The answers are not in order, so do the easy ones first.'],
    tabs: [{ id: 'sets', label: 'Passages', render(el, ctx) { SK.setBank(el, { title: 'Matching information', sets: sets(ctx.data.reading_passages),
      tips: ['"A figure" means look for numbers; "a reference to a scientist" means look for names.', 'The paragraph only needs to contain the information, not be about it.', 'Leave this question type until after questions that follow passage order.'] }); } }],
    sets,
    checks: { 'every question points to a real paragraph': (data, assert) => {
      for (const set of sets(data.reading_passages)) for (const q of set.questions) { assert.deepEqual(SK.validateItem(q), []); assert.ok(q.answer < 6); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
