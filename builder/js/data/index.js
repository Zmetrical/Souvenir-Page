// ─── DATA INDEX ─────────────────────────────────────────────────────────────
// Single import point for the rest of the app.
// Nothing outside this folder should import from beads.js / figures.js / charms.js directly.
//
// Usage anywhere in the app:
//   import { BEADS, FIGURES, CHARMS, ELEM_MAP } from './data/index.js';

export { BEADS }  from './beads.js';
export { FIGURES } from './figures.js';
export { CHARMS }  from './charms.js';

import { BEADS }   from './beads.js';
import { FIGURES } from './figures.js';
import { CHARMS }  from './charms.js';

// ─── ELEM_MAP ────────────────────────────────────────────────────────────────
// Fast id → element lookup used by UIController.addElement()
// Rebuilt automatically whenever this module loads, so adding items to any
// of the three data files is all you need — no manual registration required.
export const ELEM_MAP = {};
[...BEADS, ...FIGURES, ...CHARMS].forEach(e => { ELEM_MAP[e.id] = e; });