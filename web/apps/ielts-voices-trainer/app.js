/* Different Voices Trainer: hear the same sentences in every English voice on the computer, at several speeds. */
(function () {
  'use strict';
  const RATES = [[0.8, 'Slow'], [0.95, 'Normal'], [1.15, 'Fast']];
  // One quiz item: a sentence and three distractors made by changing one word, so you must hear every word.
  const items = (dict, n, seed) => {
    const r = SK.rng(seed);
    return SK.sample(r, dict, n).map((d) => {
      const words = d.text.split(' ');
      const wrong = [];
      for (const other of SK.shuffle(r, dict)) { if (other.id !== d.id && Math.abs(other.text.length - d.text.length) < 40 && wrong.length < 3) wrong.push(other.text); }
      return SK.shuffleItem(r, { id: 'vt-' + d.id, type: 'single', topic: 'Level ' + d.level, stem: 'Which sentence did you hear?', audio: { title: 'Sentence', text: d.text }, choices: [d.text].concat(wrong), answer: 0, explanation: 'You heard: "' + d.text + '" (' + words.length + ' words).' });
    });
  };
  const App = {
    about: 'IELTS recordings use a range of accents, mainly British, Australian, North American and New Zealand. This app plays sentences in whichever English voices are installed on your computer, one after another and at different speeds, so your ear gets used to variety. In Windows you can add voices for English (United Kingdom), (Australia), (India) and more under Settings, Time and language, Speech.',
    how: ['See which voices you have in **Voices**, and add more in Windows settings if you can.', 'In **Hear all voices**, play one sentence in every voice, one after another.', 'In **Quiz**, choose the sentence you heard; change the voice in Voices between rounds.'],
    tabs: [
      { id: 'all', label: 'Hear all voices', render(el, ctx) {
        const vs = SK.speech.voices();
        const out = SK.h('div', {});
        let rate = 0.95;
        const play = () => {
          const d = SK.pick(SK.rng(SK.seedNow()), ctx.data.dictation);
          SK.clear(out).appendChild(SK.h('p', { class: 'sk-passage', text: d.text }));
          if (!SK.speech.ok() || !vs.length) { out.appendChild(SK.note('No voices are available in this browser.', 'wrong')); return; }
          speechSynthesis.cancel();
          vs.forEach((v) => { const u = new SpeechSynthesisUtterance(d.text); u.voice = v; u.rate = rate; speechSynthesis.speak(u); out.appendChild(SK.h('div', { class: 'sk-small', text: '🔊 ' + v.name + ' (' + v.lang + ')' })); });
          SK.logPractice(0.5, 'Voices');
        };
        el.appendChild(SK.card('One sentence, every voice', SK.h('p', { class: 'sk-muted', text: vs.length + ' English voice' + (vs.length === 1 ? '' : 's') + ' found.' }), SK.select(RATES, rate, (v) => { rate = Number(v); }, 'Speed'),
          SK.h('div', { style: { marginTop: '10px' } }, SK.btn('Play a sentence', play, '', { 'data-auto': 'once' }), ' ', SK.btn('Stop', () => SK.speech.stop(), 'ghost')), out));
      } },
      { id: 'quiz', label: 'Quiz', render(el, ctx) { SK.quizStarter(el, { title: 'Which sentence did you hear?', sizes: [8, 16], make: (t, n, s) => items(ctx.data.dictation, n, s), seconds: (n) => n * 30 }); } },
      { id: 'voices', label: 'Voices', render(el) { el.appendChild(SK.card('Voices for the whole suite', SK.voicePicker(), SK.note('The two voices chosen here are used in every app. Part 3 discussions sound clearer with two different voices.'))); } },
    ],
    items,
    checks: { 'quiz items offer four different sentences with the spoken one right': (data, assert) => {
      for (const it of items(data.dictation, 20, 2)) { assert.equal(new Set(it.choices).size, it.choices.length); assert.equal(it.choices[it.answer], it.audio.text); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
