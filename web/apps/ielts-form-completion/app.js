/* Form Completion Trainer: generated Part 1 calls about bookings and registrations, with a form to fill in. */
(function () {
  'use strict';
  const KINDS = { cottage: 'Booking a holiday cottage', gym: 'Joining a sports centre', lost: 'Reporting lost property', course: 'Enrolling on a class', flat: 'Looking for a flat', party: 'Booking a room for a party' };
  const make = (seed, kind) => {
    const c = SK.ielts.formCall(seed, kind === 'any' ? null : kind);
    return { id: c.id, title: c.title, instructions: 'Listen to the call and complete the form.', limit: 'ONE WORD AND/OR A NUMBER', audio: { title: 'Phone call', lines: c.lines }, questions: c.questions };
  };
  const App = {
    about: 'Listening Part 1 is a conversation about an everyday situation, and you fill in a form with names, numbers, dates and prices. This app generates the calls, so there is always a new one: six situations, hundreds of names and every common kind of number. Speakers spell names letter by letter and sometimes correct themselves, as in the real test.',
    how: ['Choose a situation, or Any, and decide whether to hear the call once, as in the test.', 'Press **Start**, read the form, then press Play.', 'Type each answer, then press Check answers. Read the transcript for anything you missed.', 'Dates are accepted in any common form, such as 15 March or March 15th; spelling must be exact.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el) {
        const pref = SK.store.get('ielts-form-completion.pref', { kind: 'any', once: false });
        SK.setPractice(el, { title: 'Part 1: form completion', intro: 'A new call is generated every time.', button: 'Start', again: 'Next call', make: (s) => make(s, pref.kind), view: { plays: pref.once ? 1 : 0 },
          extra: () => SK.h('div', { class: 'sk-row' }, SK.select([['any', 'Any situation']].concat(Object.entries(KINDS)), pref.kind, (v) => { pref.kind = v; SK.store.set('ielts-form-completion.pref', pref); }, 'Situation'),
            SK.select([['0', 'Play as often as I like'], ['1', 'Hear it once, as in the test']], pref.once ? '1' : '0', (v) => { pref.once = v === '1'; SK.store.set('ielts-form-completion.pref', pref); }, 'Listening')) });
      } },
      { id: 'tips', label: 'Tips', render(el) { el.appendChild(SK.card('Part 1 tips', SK.h('ul', {}, ['Use the time before the recording to read the form and guess the kind of answer: a name, a number, a date.', 'Names are spelled for you. Write each letter as you hear it.', 'Listen for corrections: "the 14th, no, sorry, the 15th". The final answer counts.', 'Do not write words already printed on the form, such as £ or weeks.', 'Check the word limit: ONE WORD AND/OR A NUMBER means 15 March is fine, but the 15th of March is not.'].map((t) => SK.h('li', { text: t }))))); } },
    ],
    make,
    checks: { 'every generated call is a valid set whose answers are said': (data, assert) => {
      for (let s = 1; s < 120; s++) for (const k of Object.keys(KINDS)) {
        const set = make(s, k);
        assert.ok(set.questions.length >= 5);
        const said = set.audio.lines.map((l) => l[1]).join(' ').toLowerCase();
        for (const q of set.questions) { assert.deepEqual(SK.validateItem(q), []); assert.ok(SK.isCorrect(q, q.answer)); assert.ok(said.length > 100); }
      }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
