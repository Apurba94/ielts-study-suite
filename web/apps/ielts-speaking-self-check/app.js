/* Speaking Self-Check: listen back to recordings and check them against the four things examiners judge. */
(function () {
  'use strict';
  // The four speaking criteria, with questions written for this suite.
  const CRITERIA = [
    ['Fluency and coherence', 'Did I keep going without long pauses, and were my ideas in a clear order?'],
    ['Lexical resource', 'Did I use precise words, and paraphrase when I did not know a word?'],
    ['Grammatical range and accuracy', 'Did I use a mix of simple and complex sentences, mostly correctly?'],
    ['Pronunciation', 'Was I easy to understand, with clear sounds, stress and intonation?'],
  ];
  const average = (ratings) => { const v = Object.values(ratings).filter((x) => typeof x === 'number'); return v.length ? SK.round(SK.sum(v) / v.length, 1) : null; };
  const App = {
    about: 'Speaking is judged on four criteria: fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation, each a quarter of the score. Listen back to the recordings from any speaking app in the suite, rate each one against plain-language questions, and see which criterion is weakest over time. This is a reflection tool, not a band score.',
    how: ['Record answers in any speaking app of the suite.', 'Open **Rate**, play a recording and rate it on the four questions (1 to 5).', 'Look at **Summary** to see your weakest criterion.'],
    tabs: [
      { id: 'rate', label: 'Rate', render(el) {
        const card = SK.card('Your recordings');
        el.appendChild(card);
        const all = SK.store.get('ielts-speaking-self-check.ratings', {});
        SK.clips.list().then((clips) => {
          if (!clips.length) { card.appendChild(SK.h('p', { class: 'sk-muted', text: 'No recordings yet. Record answers in the Speaking Part 1, Cue Cards or Speaking Test apps.' })); return; }
          clips.slice(0, 15).forEach((c) => {
            const r = all[c.id] || {};
            card.appendChild(SK.h('div', { style: { borderTop: '1px solid var(--line)', padding: '10px 0' } }, SK.h('p', { class: 'sk-small' }, SK.h('strong', { text: c.day + ' ' + (c.app || '').replace('ielts-', '') + ': ' }), String(c.q || '').replace(/\*/g, '').slice(0, 120)),
              SK.h('audio', { controls: true, src: URL.createObjectURL(c.blob), style: { width: '100%' } }),
              SK.h('div', { class: 'sk-grid' }, CRITERIA.map(([name, q], k) => SK.select([['', 'Rate'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5']], r[k] === undefined ? '' : r[k], (v) => { r[k] = v === '' ? undefined : Number(v); all[c.id] = r; SK.store.set('ielts-speaking-self-check.ratings', all); }, name + ': ' + q)))));
          });
        }).catch(() => card.appendChild(SK.note('Recordings are not available in this browser.', 'wrong')));
      } },
      { id: 'summary', label: 'Summary', render(el) {
        const all = SK.store.get('ielts-speaking-self-check.ratings', {});
        const rows = CRITERIA.map(([name], k) => { const v = {}; Object.entries(all).forEach(([id, r]) => { if (typeof r[k] === 'number') v[id] = r[k]; }); return [name, Object.keys(v).length, average(v) === null ? '-' : average(v)]; });
        el.appendChild(SK.card('Your ratings by criterion', SK.table(['Criterion', 'Recordings rated', 'Average (1 to 5)'], rows, false), SK.note('Your own ratings, not IELTS bands. Ask a teacher to rate one or two recordings so you can check yours.')));
      } },
    ],
    CRITERIA, average,
    checks: { 'four criteria and averages ignore unrated items': (data, assert) => { assert.equal(CRITERIA.length, 4); assert.equal(average({ a: 3, b: 5, c: undefined }), 4); assert.equal(average({}), null); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
