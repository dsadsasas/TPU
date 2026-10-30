/* Plain JavaScript. No packages or build step needed. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  if (toggle && nav) {
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); } });
    document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) close(); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', close);
  }
  const library = document.querySelector('[data-guide-library]');
  if (!library) return;
  const search = library.querySelector('#guide-search');
  const buttons = [...library.querySelectorAll('[data-filter]')];
  const cards = [...library.querySelectorAll('.guide-card')];
  // Category URLs also work on file:// and GitHub Pages project sites.
  const requested = new URLSearchParams(window.location.search).get('category');
  let selected = buttons.some(button => button.dataset.filter === requested) ? requested : 'All';
  function filterGuides() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const match = (selected === 'All' || card.dataset.category === selected) && terms.every(term => card.dataset.search.includes(term));
      card.hidden = !match; if (match) count++;
    });
    buttons.forEach(button => {
      const active = button.dataset.filter === selected;
      button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
    });
    library.querySelector('#result-count').textContent = `Showing ${count} ${count === 1 ? 'guide' : 'guides'}`;
    library.querySelector('.empty-state').hidden = count !== 0;
  }
  search.addEventListener('input', filterGuides);
  buttons.forEach(button => button.addEventListener('click', () => { selected = button.dataset.filter; filterGuides(); }));
  library.querySelector('#reset-search').addEventListener('click', () => { search.value = ''; selected = 'All'; filterGuides(); search.focus(); });
  filterGuides();
})();
