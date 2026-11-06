/* Task 2 Planner: plan an essay in five minutes with the right structure for its type. */
(function () {
  'use strict';
  const PLANS = {
    opinion: ['Introduction: paraphrase the prompt and state your position', 'Body 1: first reason, explained, with an example', 'Body 2: second reason, explained, with an example', 'Conclusion: restate your position'],
    discussion: ['Introduction: paraphrase both views and say which you prefer', 'Body 1: the first view, with reasons', 'Body 2: the second view, with reasons, including your own', 'Conclusion: your opinion, briefly justified'],
    problem: ['Introduction: paraphrase the issue and preview the causes and solutions', 'Body 1: two main causes or problems', 'Body 2: a solution for each', 'Conclusion: sum up'],
    advantages: ['Introduction: paraphrase and say which side outweighs, if asked', 'Body 1: advantages, with examples', 'Body 2: disadvantages, with examples', 'Conclusion: your overall judgement'],
    'two-part': ['Introduction: paraphrase and briefly answer both questions', 'Body 1: answer to question one', 'Body 2: answer to question two', 'Conclusion: sum up both answers'],
  };
  const App = {
    about: 'Five minutes of planning saves time and marks: a planned Task 2 essay answers the right question, in a clear order, without running out of ideas halfway. Get a prompt, see the structure that fits its type, write short notes for each paragraph against a five-minute timer, then save the plan or start writing.',
    how: ['Press **New prompt**.', 'Start the five-minute timer and note one or two ideas for each paragraph. Notes, not sentences.', 'Use the Idea Bank app if you are short of ideas, then write the essay in the Task 2 Essay Writer.'],
    tabs: [{ id: 'plan', label: 'Plan', render(el, ctx) {
      const i = SK.store.get('ielts-essay-planner.i', 0);
      const e = ctx.data.essay_prompts[i % ctx.data.essay_prompts.length];
      const saved = SK.store.get('ielts-essay-planner.plans', {});
      const notes = saved[e.id] || PLANS[e.type].map(() => '');
      const timeBox = SK.h('span', {});
      const fields = PLANS[e.type].map((p, k) => SK.field(p, SK.h('textarea', { style: { minHeight: '56px' }, oninput: (ev) => { notes[k] = ev.target.value; saved[e.id] = notes; SK.store.set('ielts-essay-planner.plans', saved); } }, notes[k])));
      el.appendChild(SK.card('Plan this essay', SK.h('div', { class: 'sk-passage' }, e.prompt + '\n' + e.question), SK.h('p', { class: 'sk-small sk-muted', text: 'Type: ' + e.type + '. Structure below.' }),
        SK.h('div', { class: 'sk-row' }, SK.btn('Start 5-minute timer', (ev) => { ev.target.remove(); timeBox.appendChild(SK.timer(300, () => SK.warn('Five minutes: start writing now.')).el); SK.logPractice(5, 'Essay planning'); }, 'ghost small', { 'data-auto': 'once' }), timeBox,
          SK.btn('New prompt', () => { SK.store.set('ielts-essay-planner.i', i + 1); SK.show('plan'); }, 'ghost small')), fields,
        SK.h('p', {}, SK.appLink('ielts-task2-writer', 'Write it in the Task 2 Essay Writer'))));
    } }],
    PLANS,
    checks: { 'every essay type has a four-part plan': (data, assert) => { for (const e of data.essay_prompts) assert.equal(PLANS[e.type].length, 4); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
