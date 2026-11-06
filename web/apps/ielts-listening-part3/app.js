/* Part 3 Discussions: students and tutors discuss assignments; multiple choice and matching, read by two voices. */
(function () {
  'use strict';
  const sets = (d) => d.map((x) => SK.listeningSet(x, { instructions: 'Listen to the discussion and answer the questions.' }));
  const App = {
    about: 'Listening Part 3 is a discussion between up to four people in an education setting, often students planning work with a tutor. Opinions change during the conversation, and speakers agree and disagree, which makes it harder than Parts 1 and 2. Eight original discussions are read by two of your computer\'s voices, with 50 questions: multiple choice, matching and short notes.',
    how: ['Read the questions before you play, and underline who each question is about.', 'Listen for agreement and disagreement: "That\'s true, but...", "I see your point".', 'In matching questions, each option may be used more than once.', 'Use the voice settings in the Different Voices Trainer if the two voices sound too similar.'],
    tabs: [{ id: 'discussions', label: 'Discussions', render(el, ctx) { SK.setBank(el, { title: 'Part 3 discussions', sets: sets(ctx.data.listening_discussions), audio: true,
      tips: ['The first opinion you hear is often rejected later. Wait for what they decide.', 'Questions about what someone "thinks" or "suggests" need you to know who is speaking.', 'Paraphrase is everywhere: the option "measure distances" may be said as "measure from the post to the edge".'] }); } }],
    sets,
    checks: { 'eight discussions with at least two speakers each': (data, assert) => {
      const s = sets(data.listening_discussions);
      assert.equal(s.length, 8);
      for (const set of s) { assert.ok(new Set(set.audio.lines.map((l) => l[0])).size >= 2); for (const q of set.questions) assert.deepEqual(SK.validateItem(q), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
