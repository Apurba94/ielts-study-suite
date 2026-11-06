/* Map and Plan Labelling: follow spoken directions round a generated map and label places with letters. */
(function () {
  'use strict';
  const THEMES = { park: 'A park', museum: 'A museum floor plan', campus: 'A college campus', centre: 'A leisure centre' };
  const make = (seed, theme) => {
    const m = SK.ielts.mapPuzzle(seed, theme === 'any' ? null : theme);
    return { id: m.id, title: m.title, instructions: 'Label the map. Choose the correct letter for each place.', figure: m.figure, audio: { title: 'Guide', lines: m.lines }, questions: m.questions };
  };
  const PHRASES = [['as you go in / as you enter', 'from the entrance at the bottom of the map'], ['on your left / on your right', 'facing into the map from the entrance'], ['opposite', 'on the other side of the path, at the same level'], ['just before / further along', 'nearer the entrance / further from it, on the same side'], ['at the far end', 'the end of the path, away from the entrance'], ['next to / beside', 'touching, on the same side']];
  const App = {
    about: 'Map and plan questions give you a drawing with some places lettered, and a speaker describes where things are. This app generates a new map every time: parks, museums, campuses and leisure centres, with places described from the entrance or from a landmark printed on the map.',
    how: ['Study the map before you play: find the entrance and the printed landmarks.', 'Follow the speaker with your finger, starting at the entrance.', 'Choose the letter for each place. There is one spare letter.', 'Learn the direction phrases in **Phrases**.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el) {
        let theme = 'any';
        SK.setPractice(el, { title: 'Map labelling', intro: 'A new map is generated every time.', make: (s) => make(s, theme), again: 'Next map',
          extra: () => SK.select([['any', 'Any place']].concat(Object.entries(THEMES)), theme, (v) => { theme = v; }, 'Place') });
      } },
      { id: 'phrases', label: 'Phrases', render(el) { el.appendChild(SK.card('Direction phrases', SK.table(['Phrase', 'Meaning on the map'], PHRASES, false))); } },
    ],
    make,
    checks: { 'every map is answerable: unique letters and a description for each asked place': (data, assert) => {
      for (let s = 1; s < 200; s++) for (const t of Object.keys(THEMES)) {
        const set = make(s, t);
        assert.equal(set.questions.length, 5);
        for (const q of set.questions) { assert.deepEqual(SK.validateItem(q), []); const place = q.stem.replace('Where is the ', '').replace('?', ''); assert.ok(set.audio.lines.some((l) => l[1].includes(place))); }
      }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
