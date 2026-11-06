/* Reading Strategy Guide: a plan for every Reading question type, with a short practice set for each. */
(function () {
  'use strict';
  const GUIDE = [
    ['headings', 'Matching headings', ['Read the list of headings first.', 'Read each paragraph for its overall point; the first and last sentences often carry it.', 'Reject headings that match only one detail.', 'Cross out headings as you use them.'], 'In order? No.'],
    ['info', 'Matching information', ['Decide what kind of information you are looking for: a reason, an example, a figure.', 'Scan for that kind of thing, not the words.', 'Do these after other question types, when you know the passage.'], 'In order? No.'],
    ['endings', 'Sentence endings', ['Find the sentence beginning in the passage; these follow passage order.', 'Choose the ending that matches meaning, and check grammar.'], 'In order? Yes.'],
    ['summary', 'Summary completion', ['Find which part of the passage the summary covers.', 'Predict the part of speech for each gap.', 'Match meaning, not just words, to the box.'], 'In order? Usually.'],
    ['short', 'Short answers', ['Underline key words in the question.', 'Copy the answer exactly from the passage, within the word limit.'], 'In order? Yes.'],
    ['mcq', 'Multiple choice', ['Read the stem, find the part of the passage, then compare every option.', 'Watch for options that repeat words but change the meaning.'], 'In order? Yes.'],
    ['tfng', 'True / False / Not Given', ['Find the part of the passage the statement is about.', 'False means it contradicts the passage; Not Given means the passage is silent.', 'Never use your own knowledge.'], 'In order? Yes.'],
  ];
  const App = {
    about: 'Each Reading question type needs its own approach: whether to read the questions first, whether answers follow passage order, and which traps to expect. This guide gives a short plan for each of seven types, with a five-minute practice set on a random passage for each.',
    how: ['Pick a question type in **Guide** and read the plan.', 'Press its practice button to try the plan straight away.', 'Use the other Reading apps for longer practice on one type.'],
    tabs: [{ id: 'guide', label: 'Guide', render(el, ctx) {
      for (const [kind, name, steps, order] of GUIDE) {
        el.appendChild(SK.card(name, SK.h('ol', {}, steps.map((s) => SK.h('li', { text: s }))), SK.h('p', { class: 'sk-small sk-muted', text: order }),
          SK.btn('Practise ' + name.toLowerCase(), () => { const p = SK.pick(SK.rng(SK.seedNow()), ctx.data.reading_passages); SK.clear(el); SK.setView(el, SK.ielts.passageSet(p, [kind], SK.seedNow()), {}); }, 'ghost small', { 'data-auto': 'once' })));
      }
    } }],
    GUIDE,
    checks: { 'the guide covers every question group the passages support': (data, assert) => {
      assert.deepEqual(GUIDE.map((g) => g[0]).sort(), Object.keys(SK.ielts.groups).sort());
      for (const [kind] of GUIDE) assert.ok(SK.ielts.passageSet(data.reading_passages[0], [kind], 1).questions.length >= 1);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
