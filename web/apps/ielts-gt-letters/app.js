/* Task 1 Letters (General Training): formal, semi-formal and informal letters in 20 minutes. */
(function () {
  'use strict';
  const OPEN = { formal: ['Dear Sir or Madam,', 'Yours faithfully,'], 'semi-formal': ['Dear Mr or Ms (surname),', 'Yours sincerely,'], informal: ['Dear (first name),', 'Best wishes,'] };
  const prompt = (l) => l.situation + '\n' + l.task + ' In your letter:\n' + l.bullets.map((b) => '- ' + b).join('\n') + '\nWrite at least 150 words. You do not need to write any addresses.\nBegin your letter as follows: ' + OPEN[l.tone][0];
  const check = (l) => ['I covered all three bullet points, each in its own paragraph.', 'My opening and closing match the tone: ' + OPEN[l.tone].join(' ... ') + '.', 'The first sentence says why I am writing.', l.tone === 'informal' ? 'My language is friendly and natural.' : 'I avoided slang and contractions.', 'I wrote at least 150 words.'];
  const App = {
    about: 'General Training Writing Task 1 is a letter of at least 150 words in about 20 minutes, in response to a situation with three bullet points. The tone must match the reader: formal for a company, semi-formal for a landlord or manager, informal for a friend. Twenty-four original situations, eight of each tone.',
    how: ['Choose a tone, or Any, and press **New letter** for another.', 'Plan one paragraph for each bullet point, then write. The 20-minute timer is optional.', 'Read the feedback and tick the checklist, especially the opening, closing and tone.'],
    tabs: [{ id: 'write', label: 'Write', render(el, ctx) {
      const pref = SK.store.get('ielts-gt-letters.pref', { tone: 'any', i: 0 });
      const pool = ctx.data.letters.filter((l) => pref.tone === 'any' || l.tone === pref.tone);
      const l = pool[pref.i % pool.length];
      el.appendChild(SK.card('Choose a letter', SK.h('div', { class: 'sk-row' }, SK.select([['any', 'Any tone'], ['formal', 'Formal'], ['semi-formal', 'Semi-formal'], ['informal', 'Informal']], pref.tone, (v) => { pref.tone = v; pref.i = 0; SK.store.set('ielts-gt-letters.pref', pref); SK.show('write'); }, 'Tone'),
        SK.btn('New letter', () => { pref.i++; SK.store.set('ielts-gt-letters.pref', pref); SK.show('write'); }, 'ghost')), SK.h('p', { class: 'sk-small sk-muted', text: 'This letter is ' + l.tone + '.' })));
      const box = SK.h('div', {});
      el.appendChild(box);
      SK.writer(box, { key: l.id, title: 'Task 1 letter', prompt: prompt(l), minutes: 20, target: [150, 200], paragraphs: 4, checklist: check(l) });
    } }],
    prompt,
    checks: { 'eight letters of each tone, each with its opening in the task': (data, assert) => {
      assert.equal(data.letters.length, 24);
      for (const t of Object.keys(OPEN)) assert.equal(data.letters.filter((l) => l.tone === t).length, 8);
      for (const l of data.letters) assert.ok(prompt(l).includes(OPEN[l.tone][0]));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
