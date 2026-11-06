/* Part 4 Lectures: an academic talk with notes to complete, one word only. */
(function () {
  'use strict';
  const sets = (l) => l.map((x) => SK.listeningSet(x, { instructions: 'Listen to the lecture and complete the notes.' }));
  const App = {
    about: 'Listening Part 4 is a lecture on an academic subject with no break in the middle, usually with notes to complete in ONE WORD ONLY. Eight original lectures, from the history of the bicycle to coral reefs, each with nine gaps. Every answer is a word the lecturer actually says.',
    how: ['Before you play, read the notes and predict each gap: a noun, an adjective, a plural?', 'The notes follow the lecture in order, and headings tell you when the topic moves on.', 'Write the word exactly as you hear it, spelled correctly. One word only: no articles.'],
    tabs: [{ id: 'lectures', label: 'Lectures', render(el, ctx) { SK.setBank(el, { title: 'Part 4 lectures', sets: sets(ctx.data.listening_lectures), audio: true,
      tips: ['Signpost phrases such as "turning now to" or "the second cause" tell you the next heading is coming.', 'The word in the gap is usually a noun. Check if it should be plural.', 'You will not hear the words around the gap exactly as printed; listen for their meaning.'] }); } }],
    sets,
    checks: { 'every gap is one word that the lecture says': (data, assert) => {
      for (const set of sets(data.listening_lectures)) for (const q of set.questions) {
        assert.ok(SK.ielts.fitsLimit(q.answer, 'ONE WORD ONLY').ok, q.id);
        assert.ok(set.audio.text.toLowerCase().includes(q.answer.toLowerCase()) || (q.accept || []).some((a) => set.audio.text.toLowerCase().includes(a.toLowerCase())), q.id);
      }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
