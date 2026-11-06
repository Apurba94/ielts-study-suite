/* IELTS Daily Mix: fifteen minutes a day across listening, reading, grammar and vocabulary, with a streak. */
(function () {
  'use strict';
  const KEY = 'ielts-daily-mix.days';
  const today = (data, day) => {
    const seed = SK.daySeed('ielts-daily-mix', day), r = SK.rng(seed);
    const listen = SK.sample(r, data.listening_clips, 3).map((c) => ({ id: 'dm-' + c.id, type: 'text', topic: 'Listening', stem: c.stem, audio: { title: 'Extract', text: c.say }, answer: c.answer, accept: c.accept || [], explanation: c.say }));
    const nums = SK.range(2).map(() => { const it = SK.ielts.numberItem(r); return Object.assign(it, { id: 'dm-' + it.id, topic: 'Numbers', audio: { title: 'Listen', text: it.say } }); });
    const read = SK.sample(r, data.tfng, 4).map((t) => Object.assign(SK.ielts.tfItem(t), { id: 'dm-' + t.id, topic: 'Reading', stem: '**Text:** ' + t.text + '\n\n**Statement:** ' + t.s }));
    const gram = SK.fromBank(r, data.grammar, 'All', 2).map((x) => Object.assign(x, { topic: 'Grammar' }));
    return listen.concat(nums, read, gram, SK.wordItems(data.academic_words, 4, seed, ['meaning', 'blank']).map((x) => Object.assign(x, { topic: 'Vocabulary' })));
  };
  const App = {
    about: 'Fifteen minutes, every day: three listening extracts, two spoken numbers, four True, False or Not Given statements, two grammar questions and four academic words. The set stays the same all day, and a streak counts the days in a row you finish it.',
    how: ['Open the app each day and press **Start**.', 'Turn the sound on for the listening items.', 'Missed items go to the IELTS Error Log.'],
    tabs: [{ id: 'today', label: 'Today', render(el, ctx) {
      const days = SK.store.get(KEY, {}), d = SK.dayKey(), n = today(ctx.data, d).length;
      el.appendChild(SK.card('Today\'s mix', SK.stats([['Day streak', SK.streak(Object.keys(days))], ['Days done', Object.keys(days).length], ['Today', days[d] !== undefined ? days[d] + ' / ' + n : 'Not yet']]),
        SK.btn(days[d] !== undefined ? 'Do it again' : 'Start', () => SK.quiz(el, today(ctx.data, d), { title: 'IELTS daily mix, ' + d, mode: 'practice', onFinish: (sum) => { const all = SK.store.get(KEY, {}); all[d] = Math.max(all[d] || 0, sum.correct); SK.store.set(KEY, all); } }), '', { 'data-auto': 'once' })));
    } }],
    today,
    checks: { 'fifteen valid items that stay the same all day': (data, assert) => {
      const a = today(data, '2026-11-06');
      assert.equal(a.length, 15);
      assert.deepEqual(a.map((x) => x.id), today(data, '2026-11-06').map((x) => x.id));
      for (const it of a) { assert.deepEqual(SK.validateItem(it), []); assert.ok(SK.isCorrect(it, it.answer)); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
