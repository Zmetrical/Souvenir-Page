/**
 * pages/products/products.js
 *
 * Client-side filtering, searching, and sorting.
 * No framework — plain DOM manipulation.
 *
 * When Phase 2 (Laravel) arrives:
 *   Option A: keep this JS as-is (works fine for < ~200 products)
 *   Option B: replace with fetch() calls to /api/products?cat=&q=&sort=
 */

(function () {
  'use strict';

  /* ── Element refs ────────────────────────────────── */
  const grid    = document.getElementById('prodGrid');
  const empty   = document.getElementById('prodEmpty');
  const catBtns = document.querySelectorAll('.pf-cat');
  const search  = document.getElementById('pfSearch');
  const sort    = document.getElementById('pfSort');
  const count   = document.getElementById('pfCount');
  const clear   = document.getElementById('pfClear');
  const cards   = Array.from(document.querySelectorAll('.pcard'));

  /* ── State ───────────────────────────────────────── */
  let activeCat  = 'all';
  let searchTerm = '';
  let sortMode   = 'default';

  /* ── Core filter + render ────────────────────────── */
  function applyFilters() {
    let visible = cards.filter(card => {
      const cat  = card.dataset.cat;
      const name = card.dataset.name; // already lowercased in PHP

      const catMatch  = activeCat === 'all' || cat === activeCat;
      const termMatch = !searchTerm || name.includes(searchTerm);

      return catMatch && termMatch;
    });

    // Sort
    if (sortMode === 'name-asc') {
      visible.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
    } else if (sortMode === 'price-asc') {
      visible.sort((a, b) => parseInt(a.dataset.priceRaw) - parseInt(b.dataset.priceRaw));
    } else if (sortMode === 'price-desc') {
      visible.sort((a, b) => parseInt(b.dataset.priceRaw) - parseInt(a.dataset.priceRaw));
    }

    // Show / hide
    const visibleSet = new Set(visible);
    cards.forEach(card => {
      card.classList.toggle('pcard-hidden', !visibleSet.has(card));
    });

    // Re-append in sorted order
    visible.forEach(card => grid.appendChild(card));

    // Update count label
    const n = visible.length;
    count.textContent = n === cards.length
      ? `Showing all ${n} products`
      : `${n} product${n !== 1 ? 's' : ''} found`;

    // Empty state
    empty.style.display = n === 0 ? 'block' : 'none';
    grid.style.display  = n === 0 ? 'none'  : '';

    // Clear button
    const hasFilter = activeCat !== 'all' || searchTerm !== '';
    clear.style.display = hasFilter ? '' : 'none';
  }

  /* ── Category pills ──────────────────────────────── */
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCat = btn.dataset.cat;
      catBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      applyFilters();
      // Smooth scroll to grid on mobile
      if (window.innerWidth < 768) {
        document.getElementById('prod-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Search ──────────────────────────────────────── */
  let searchTimer;
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchTerm = search.value.toLowerCase().trim();
      applyFilters();
    }, 180); // debounce
  });

  /* ── Sort ────────────────────────────────────────── */
  sort.addEventListener('change', () => {
    sortMode = sort.value;
    applyFilters();
  });

  /* ── Clear button ────────────────────────────────── */
  clear.addEventListener('click', resetFilters);

  /* ── Global reset (called from empty-state button) ── */
  window.resetFilters = function () {
    activeCat  = 'all';
    searchTerm = '';
    sortMode   = 'default';
    search.value = '';
    sort.value   = 'default';
    catBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.cat === 'all');
      b.setAttribute('aria-selected', b.dataset.cat === 'all' ? 'true' : 'false');
    });
    applyFilters();
  };

  /* ── URL hash category pre-select ───────────────────
     Allows linking directly to a category:
     products/index.php#prints → auto-selects Prints tab
  ─────────────────────────────────────────────────── */
  function checkHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && hash !== 'all') {
      const matchBtn = Array.from(catBtns).find(b => b.dataset.cat === hash);
      if (matchBtn) matchBtn.click();
    }
  }
  window.addEventListener('hashchange', checkHash);
  checkHash();

  /* ── Initial render ──────────────────────────────── */
  applyFilters();

})