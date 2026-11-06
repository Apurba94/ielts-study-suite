/* Numbers, Dates and Times: hear phone numbers, prices, dates, times, years and amounts, and write them in figures. */
(function () {
  'use strict';
  const LABEL = { phone: 'Phone numbers', price: 'Prices', year: 'Years', date: 'Dates', time: 'Times', large: 'Large numbers', teens: 'Teens and tens', percent: 'Percentages' };
  const items = (topic, n, seed) => {
    const r = SK.rng(seed);
    const kind = Object.keys(LABEL).find((k) => LABEL[k] === topic);
    return SK.range(n).map(() => { const it = SK.ielts.numberItem(r, kind || null); return Object.assign(it, { topic: LABEL[it.id.split('-')[1]] || it.topic, audio: { title: 'Listen', text: it.say } }); });
  };
  const RULES = [['0 in phone numbers', 'said "oh": oh seven seven'], ['Repeated digits', 'said "double": double five = 55'], ['Years', '1998 = nineteen ninety-eight; 2005 = two thousand and five; 2024 = twenty twenty-four'], ['Prices', '£12.50 = twelve pounds fifty'], ['Dates', 'the fifteenth of March = 15 March'], ['Times', 'half past seven = 7.30; quarter to nine = 8.45'], ['Teens and tens', 'fifTEEN is stressed at the end; FIFty at the start']];
  const App = {
    about: 'Numbers are in almost every Listening test: phone numbers with "oh" and "double", prices in pounds and pence, years said in pairs, dates with ordinals, times such as quarter to nine, and the 15 or 50 problem. Every item is generated, so you can practise for as long as you like.',
    how: ['Read the rules in **Rules**.', 'In **Practice**, choose a kind or All. Press Play, then write the number in figures.', 'Dates and times are accepted in any common form, such as 15 March or 7:30.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el) { SK.quizStarter(el, { title: 'Numbers, dates and times', topics: Object.values(LABEL), sizes: [10, 20, 30], make: items, seconds: (n) => n * 20 }); } },
      { id: 'rules', label: 'Rules', render(el) { el.appendChild(SK.card('How numbers are said', SK.table(['What', 'How it sounds'], RULES, false))); } },
    ],
    items,
    checks: { 'every kind gives a markable answer that is said aloud': (data, assert) => {
      for (const t of ['All'].concat(Object.values(LABEL))) for (const it of items(t, 25, 3)) { assert.ok(SK.isCorrect(it, it.answer), it.id); assert.ok(it.audio.text.length > 5); if (t !== 'All') assert.equal(it.topic, t); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
