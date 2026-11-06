/* Task 2 Essay Writer: at least 250 words in 40 minutes, with original prompts of every type. */
(function () {
  'use strict';
  const TYPES = { opinion: 'Opinion', discussion: 'Discuss both views', problem: 'Problem and solution', advantages: 'Advantages and disadvantages', 'two-part': 'Two-part question' };
  const CHECK = { opinion: 'I gave a clear opinion in the introduction and kept to it.', discussion: 'I discussed both views and gave my own opinion.', problem: 'I covered both the causes or problems and the solutions.', advantages: 'I covered both sides and, if asked, said which outweighs the other.', 'two-part': 'I answered both questions.' };
  const prompt = (e) => 'Write about the following topic:\n\n' + e.prompt + '\n' + e.question + '\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.';
  const App = {
    about: 'Writing Task 2 is an essay of at least 250 words, with about 40 minutes for it, and it counts for more than Task 1. This app has 48 original prompts across the five common types: opinion, discuss both views, problem and solution, advantages and disadvantages, and two-part questions, with feedback on length, paragraphs and linking, and a checklist for each type.',
    how: ['Choose a type or topic, or take a random prompt.', 'Plan for five minutes (the Task 2 Planner helps), then write. The 40-minute timer is optional.', 'Read the feedback and tick the checklist. The feedback counts what a program can count; it is not a band.'],
    tabs: [{ id: 'write', label: 'Write', render(el, ctx) {
      const pref = SK.store.get('ielts-task2-writer.pref', { type: 'all', i: 0 });
      const pool = ctx.data.essay_prompts.filter((e) => pref.type === 'all' || e.type === pref.type);
      const e = pool[pref.i % pool.length];
      el.appendChild(SK.card('Choose a prompt', SK.h('div', { class: 'sk-row' }, SK.select([['all', 'Any type']].concat(Object.entries(TYPES)), pref.type, (v) => { pref.type = v; pref.i = 0; SK.store.set('ielts-task2-writer.pref', pref); SK.show('write'); }, 'Essay type'),
        SK.btn('New prompt', () => { pref.i++; SK.store.set('ielts-task2-writer.pref', pref); SK.show('write'); }, 'ghost')), SK.h('p', { class: 'sk-small sk-muted', text: TYPES[e.type] + ' essay on ' + e.topic.toLowerCase() + '.' })));
      const box = SK.h('div', {});
      el.appendChild(box);
      SK.writer(box, { key: e.id, title: 'Task 2 essay', prompt: prompt(e), minutes: 40, target: [250, 320], paragraphs: 4,
        checklist: [CHECK[e.type], 'My introduction paraphrases the prompt rather than copying it.', 'Each body paragraph has one main idea, explained and supported with an example.', 'My conclusion sums up my position without adding new ideas.', 'I wrote at least 250 words.'] });
    } }],
    TYPES, prompt,
    checks: { 'every type has prompts and every prompt asks for 250 words': (data, assert) => {
      for (const t of Object.keys(TYPES)) assert.ok(data.essay_prompts.filter((e) => e.type === t).length >= 8, t);
      for (const e of data.essay_prompts) assert.ok(prompt(e).includes('250'));
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
