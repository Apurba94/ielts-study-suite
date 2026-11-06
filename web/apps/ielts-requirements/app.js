/* Score Requirements Tracker: the bands your universities or visa need, checked against your scores. */
(function () {
  'use strict';
  const SKILLS = ['listening', 'reading', 'writing', 'speaking'];
  const App = {
    about: 'Universities, employers and visa schemes set IELTS requirements such as "overall 6.5 with no band below 6.0", and some set different minimums for each skill. Record each requirement, enter your latest (or practice) bands, and see which ones you meet and exactly where the gaps are.',
    how: ['Enter your current bands in **My scores**.', 'Add each requirement in **Requirements**: overall, a minimum for every skill, and any skill-specific minimum.', 'Read the check: green means met, and the gaps show what to work on.'],
    tabs: [
      { id: 'req', label: 'Requirements', render(el) {
        const reqs = SK.store.get('ielts-requirements.list', []), mine = SK.store.get('ielts-requirements.mine', {});
        const f = { name: '', overall: '', minimum: '', listening: '', reading: '', writing: '', speaking: '', deadline: '' };
        const inp = (k, label, type) => SK.field(label, SK.h('input', { type: type || 'number', min: 0, max: 9, step: 0.5, style: { width: type ? '18ch' : '7ch' }, oninput: (e) => { f[k] = e.target.value; } }));
        const msg = SK.h('div', {});
        el.appendChild(SK.card('Add a requirement', SK.h('div', { class: 'sk-row' }, inp('name', 'University, course or visa', 'text'), inp('overall', 'Overall'), inp('minimum', 'No band below'), SKILLS.map((k) => inp(k, k[0].toUpperCase() + k.slice(1))), inp('deadline', 'Deadline', 'date')),
          SK.btn('Add', () => {
            if (!f.name.trim()) { SK.clear(msg).appendChild(SK.note('Give the requirement a name.', 'wrong')); return; }
            const row = { name: f.name.trim(), deadline: f.deadline };
            for (const k of ['overall', 'minimum'].concat(SKILLS)) if (f[k] !== '') { const v = Number(f[k]); if (!SK.ielts.isBand(v)) { SK.clear(msg).appendChild(SK.note(k + ' must be a band from 0 to 9 in steps of 0.5.', 'wrong')); return; } row[k] = v; }
            reqs.push(row); SK.store.set('ielts-requirements.list', reqs); SK.show('req');
          }, '', { style: { marginTop: '10px' } }), msg));
        const ok = SKILLS.every((k) => typeof mine[k] === 'number');
        el.appendChild(SK.card('Check', !reqs.length ? SK.h('p', { class: 'sk-muted', text: 'No requirements yet.' }) : SK.table(['Requirement', 'Needs', 'Result', ''], reqs.map((q, i) => {
          const r = ok ? SK.ielts.meets(mine, q) : null;
          return [q.name + (q.deadline ? ' (by ' + q.deadline + ')' : ''), ['overall', 'minimum'].concat(SKILLS).filter((k) => q[k] !== undefined).map((k) => k + ' ' + q[k]).join(', '), r ? (r.ok ? 'Met' : 'Not yet: ' + r.gaps.join('; ')) : 'Enter all four of your bands', SK.confirmTwice(SK.btn('Remove', null, 'ghost small'), 'Remove', () => { reqs.splice(i, 1); SK.store.set('ielts-requirements.list', reqs); SK.show('req'); })];
        }))));
      } },
      { id: 'mine', label: 'My scores', render(el) {
        const mine = SK.store.get('ielts-requirements.mine', {});
        const halves = [['', '-']].concat(SK.range(19).map((x) => [x / 2, String(x / 2)]));
        const ov = SK.h('div', {});
        const draw = () => { const b = SKILLS.map((k) => mine[k]); SK.clear(ov).appendChild(b.every((x) => typeof x === 'number') ? SK.stats([['Overall band', SK.ielts.overall(b)]]) : SK.h('p', { class: 'sk-muted', text: 'Choose all four to see your overall band.' })); };
        el.appendChild(SK.card('Your bands', SK.h('div', { class: 'sk-row' }, SKILLS.map((k) => SK.select(halves, mine[k] === undefined ? '' : mine[k], (v) => { if (v === '') delete mine[k]; else mine[k] = Number(v); SK.store.set('ielts-requirements.mine', mine); draw(); }, k[0].toUpperCase() + k.slice(1)))), ov));
        draw();
      } },
    ],
    checks: { 'requirement checks use the overall rule and per-skill minimums': (data, assert) => {
      const s = { listening: 7, reading: 7, writing: 5.5, speaking: 6.5 };
      assert.equal(SK.ielts.meets(s, { overall: 6.5 }).ok, true);
      assert.equal(SK.ielts.meets(s, { overall: 6.5, minimum: 6 }).ok, false);
      assert.equal(SK.ielts.meets(s, { overall: 6.5, writing: 5.5, minimum: 5.5 }).ok, true);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
