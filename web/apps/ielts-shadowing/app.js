/* Shadowing Coach: speak along with a voice, sentence by sentence, to build rhythm and natural pronunciation. */
(function () {
  'use strict';
  const sentences = (talk) => SK.text.sentences(talk.text).filter((s) => SK.text.wordCount(s) >= 5 && SK.text.wordCount(s) <= 28);
  const App = {
    about: 'Shadowing means speaking along with a recording, a fraction of a second behind, copying its rhythm, stress and linking. A few minutes a day improves the flow of your speech and your ear at the same time. Choose one of the Part 2 talks, then play it sentence by sentence and speak along, recording yourself if you like.',
    how: ['Choose a talk and press **Play sentence**. Listen once.', 'Play it again and speak along with it, copying the rhythm.', 'Move on with **Next sentence**. Record a few sentences and compare them with the computer voice.'],
    tabs: [{ id: 'shadow', label: 'Shadow', render(el, ctx) {
      const talks = ctx.data.listening_talks;
      const pref = SK.store.get('ielts-shadowing.pref', { t: 0, i: 0 });
      const t = talks[pref.t % talks.length], ss = sentences(t);
      const s = ss[pref.i % ss.length];
      const save = () => SK.store.set('ielts-shadowing.pref', pref);
      el.appendChild(SK.card('Shadowing: ' + t.title, SK.select(talks.map((x, k) => [k, x.title]), pref.t % talks.length, (v) => { pref.t = Number(v); pref.i = 0; save(); SK.show('shadow'); }, 'Talk'),
        SK.h('p', { class: 'sk-small sk-muted', text: 'Sentence ' + (pref.i % ss.length + 1) + ' of ' + ss.length }), SK.h('div', { class: 'sk-passage', text: s }),
        SK.h('div', { class: 'sk-row', style: { margin: '10px 0' } }, SK.btn('Play sentence', () => { SK.speech.say(s); SK.logPractice(0.2, 'Shadowing'); }), SK.btn('Slowly', () => SK.speech.say(s, { rateScale: 0.8 }), 'ghost'),
          SK.btn('Next sentence', () => { pref.i++; save(); SK.show('shadow'); }, 'ghost', { 'data-auto': 'once' })), SK.recorder({ seconds: 20 })));
    } }],
    sentences,
    checks: { 'every talk gives enough shadowing sentences of a speakable length': (data, assert) => { for (const t of data.listening_talks) { const ss = sentences(t); assert.ok(ss.length >= 10, t.id); for (const s of ss) assert.ok(SK.text.wordCount(s) <= 28); } } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
