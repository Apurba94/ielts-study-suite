/* Part 2 Talks: one speaker describes a place, an event or a service; multiple choice, notes and choose TWO. */
(function () {
  'use strict';
  const sets = (talks) => talks.map((t) => SK.listeningSet(t, { instructions: 'Listen to the talk and answer the questions. For gaps, write ONE WORD AND/OR A NUMBER unless the heading says otherwise.' }));
  const App = {
    about: 'In Listening Part 2 one speaker talks about a local place, service or event: a volunteer briefing, a library reopening, a festival or a castle tour. This app has eight original talks with 64 questions in the IELTS styles: multiple choice, note and table completion, and choose TWO from five.',
    how: ['Choose whether to hear each talk once, as in the test.', 'Press **Start the next new set**, read the questions first, then press Play.', 'Questions follow the order of the talk. If you miss one, move on to the next.', 'After checking, read the transcript to find where each answer was.'],
    tabs: [{ id: 'talks', label: 'Talks', render(el, ctx) { SK.setBank(el, { title: 'Part 2 talks', sets: sets(ctx.data.listening_talks), audio: true,
      tips: ['Speakers often mention two or three options before giving the answer. Wait for the final one.', 'In choose TWO questions, the two answers can come in either order.', 'Gaps in a table usually need the same kind of word as the other entries in that column.'] }); } }],
    sets,
    checks: { 'eight talks, each a valid set': (data, assert) => {
      const s = sets(data.listening_talks);
      assert.equal(s.length, 8);
      for (const set of s) { assert.ok(set.audio.text.length > 800); for (const q of set.questions) { assert.deepEqual(SK.validateItem(q), []); assert.ok(SK.isCorrect(q, q.answer)); } }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
