/* IELTS Suite Home: find any of the 100 apps by skill, and see what to practise today. */
(function () {
  'use strict';
  const search = (cat, term, area, module) => cat.filter((a) => (area === 'All' || a.area === area) && (module === 'All' || a.module === module || a.module === 'Both') && (!term || SK.norm(a.title + ' ' + a.desc + ' ' + a.area).includes(SK.norm(term))));
  // Today's suggestion: the daily mix, plus the app for the weakest topic if one stands out.
  const suggest = (cat, weakTopic) => {
    const out = [cat.find((a) => a.name === 'ielts-daily-mix')];
    if (weakTopic) { const words = SK.norm(weakTopic).split(/[^a-z]+/).filter((w) => w.length > 3); let best = null, top = 0; for (const a of cat) { if (a.name === 'ielts-daily-mix') continue; const sc = SK.sum(words.map((w) => (SK.norm(a.title).includes(w) ? 2 : 0) + (SK.norm(a.desc).includes(w) ? 1 : 0))); if (sc > top) { top = sc; best = a; } } if (best) out.unshift(best); }
    return out.filter(Boolean);
  };
  const App = {
    about: 'The home screen for all 100 apps of the IELTS Study Suite. Search by name or skill, filter by Academic or General Training, and see a suggestion for today based on your weakest question type. On the website every app opens in the browser; each is also a free Windows program.',
    how: ['Search or filter in **All apps**, then open one.', 'Check **Today** for a suggestion.', 'Every app keeps its progress on your device; the Dashboard app brings it together.'],
    tabs: [
      { id: 'today', label: 'Today', render(el, ctx) {
        const weak = SK.weakAreas(SK.store.get('suite.sessions', []).filter((s) => s.exam === 'IELTS').map((x) => Object.assign({}, x, { exam: '' })), 3)[0];
        el.appendChild(SK.card('Suggested for today', weak ? SK.h('p', { class: 'sk-muted', text: 'Your weakest question type so far: ' + weak.topic.trim() + ' (' + weak.pct + '%).' }) : SK.h('p', { class: 'sk-muted', text: 'Start with the daily mix; suggestions improve as you practise.' }),
          SK.h('ul', {}, suggest(ctx.data.catalogue, weak && weak.topic.trim()).map((a) => SK.h('li', {}, SK.appLink(a.name, a.title), ': ' + a.desc)))));
      } },
      { id: 'all', label: 'All apps', render(el, ctx) {
        let term = '', area = 'All', module = 'All';
        const out = SK.h('div', {});
        const draw = () => {
          SK.clear(out);
          const hits = search(ctx.data.catalogue, term, area, module);
          out.appendChild(SK.h('p', { class: 'sk-muted sk-small', text: hits.length + ' apps' }));
          for (const a of [...new Set(hits.map((x) => x.area))]) { out.appendChild(SK.h('h3', { text: a })); out.appendChild(SK.table(['App', 'What it does'], hits.filter((x) => x.area === a).map((x) => [SK.appLink(x.name, x.title), x.desc]))); }
        };
        el.appendChild(SK.card('All 100 apps', SK.h('div', { class: 'sk-row' }, SK.field('Search', SK.h('input', { type: 'text', oninput: (e) => { term = e.target.value; draw(); } })),
          SK.select(['All'].concat([...new Set(ctx.data.catalogue.map((a) => a.area))]), 'All', (v) => { area = v; draw(); }, 'Skill'), SK.select([['All', 'Both modules'], ['Academic', 'Academic'], ['General Training', 'General Training']], 'All', (v) => { module = v; draw(); }, 'Module')), out));
        draw();
      } },
    ],
    search, suggest,
    checks: {
      'the catalogue lists all 100 apps and search finds them': (data, assert) => {
        assert.equal(data.catalogue.length, 100);
        assert.ok(search(data.catalogue, 'not given', 'All', 'All').some((a) => a.name === 'ielts-tfng'));
        assert.equal(search(data.catalogue, '', 'Listening', 'All').length, 20);
        assert.ok(!search(data.catalogue, '', 'All', 'General Training').some((a) => a.module === 'Academic'));
      },
      'today always suggests the daily mix': (data, assert) => { assert.ok(suggest(data.catalogue, null).some((a) => a.name === 'ielts-daily-mix')); assert.equal(suggest(data.catalogue, 'Matching headings')[0].name, 'ielts-matching-headings'); },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
