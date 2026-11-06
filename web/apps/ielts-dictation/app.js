/* Dictation Trainer: hear a sentence, type it, and see word by word what you missed. */
(function () {
  'use strict';
  const KEY = 'ielts-dictation.results';
  const App = {
    about: 'Dictation trains you to hear every word, including the small ones that fast speech swallows, and to spell what you hear, which IELTS Listening marks strictly. Hear an original sentence at three levels, type it, and see a word-by-word comparison: words you missed, words you added and words you got right.',
    how: ['Pick a level in **Practice** and press Play. You may play it up to three times.', 'Type the sentence and press Check.', 'Study the missed words: often they are short words such as the, of or have, or plural endings.'],
    tabs: [{ id: 'practice', label: 'Practice', render(el, ctx) {
      let level = 1;
      const run = () => {
        const d = SK.pick(SK.rng(SK.seedNow()), ctx.data.dictation.filter((x) => x.level === level));
        const inp = SK.h('textarea', { style: { minHeight: '80px' }, spellcheck: 'false', 'aria-label': 'What you heard', placeholder: 'Type what you hear' });
        const out = SK.h('div', {});
        SK.clear(el);
        el.appendChild(SK.card('Dictation, level ' + level, SK.audioPlayer({ title: 'Sentence', text: d.text }, { maxPlays: 3 }), inp,
          SK.h('div', { class: 'sk-row', style: { marginTop: '10px' } }, SK.btn('Check', () => {
            const r = SK.text.diff(d.text, inp.value);
            SK.clear(out);
            out.appendChild(SK.h('p', { class: 'sk-diff' }, r.parts.map(([k, w]) => (k === 'same' ? w : k === 'missed' ? SK.h('del', { text: w }) : SK.h('ins', { text: w }))).flatMap((x) => [x, ' '])));
            out.appendChild(SK.stats([['Words right', Math.round(r.accuracy * 100) + '%']]));
            out.appendChild(SK.note('The sentence: ' + d.text + '\nCrossed out: words you missed. Highlighted: words you added.'));
            const all = SK.store.get(KEY, []); all.push({ day: SK.dayKey(), level, acc: r.accuracy }); SK.store.set(KEY, all.slice(-300));
            SK.logSession({ correct: r.accuracy === 1 ? 1 : 0, total: 1, byTopic: { ['Dictation level ' + level]: { right: r.accuracy === 1 ? 1 : 0, total: 1 } } });
            SK.logPractice(1, 'Dictation');
            if (r.accuracy < 1) SK.logMistake({ id: d.id, type: 'text', stem: 'Dictation: ' + d.text, answer: d.text, audio: { text: d.text }, topic: 'Dictation' }, inp.value);
          }, '', { 'data-auto': 'once' }), SK.btn('Next sentence', run, 'ghost', { 'data-auto': 'once' })), out));
      };
      el.appendChild(SK.card('Dictation', SK.select([[1, 'Level 1: short sentences'], [2, 'Level 2: longer sentences'], [3, 'Level 3: academic sentences']], level, (v) => { level = Number(v); }, 'Level'), SK.h('div', { style: { marginTop: '12px' } }, SK.btn('Start', run, '', { 'data-auto': 'once' }))));
      const res = SK.store.get(KEY, []);
      if (res.length > 1) el.appendChild(SK.card('Your accuracy', SK.chart.line(res.slice(-30).map((x) => ({ y: Math.round(x.acc * 100), label: x.day })), { min: 0, max: 100, label: 'Words right, per cent' })));
    } }],
    checks: { 'each level has sentences and the diff marks errors': (data, assert) => {
      for (const lv of [1, 2, 3]) assert.ok(data.dictation.filter((d) => d.level === lv).length >= 8);
      const r = SK.text.diff(data.dictation[0].text, data.dictation[0].text.replace('the ', ''));
      assert.ok(r.accuracy < 1 && r.parts.some((p) => p[0] === 'missed' && p[1] === 'the'));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
