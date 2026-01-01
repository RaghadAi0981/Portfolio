// Simple SPA router that swaps page content into #spa-root.
(function () {
  const root = document.querySelector('#spa-root');
  if (!root) return;

  const contentSelector = '[data-spa-content]';

  function normalizePath(pathname) {
    const parts = pathname.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1] : 'index.html';
  }

  function setActiveLink(pathname) {
    const current = normalizePath(pathname);
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const linkPath = normalizePath(url.pathname);
      link.classList.toggle('active', linkPath === current);
    });
  }

  function runPageScripts() {
    if (window.initNavMenu) window.initNavMenu();
    if (window.initProjectsSlider) window.initProjectsSlider();
    if (window.initEffects) window.initEffects();
    if (window.initTransitions) window.initTransitions();
  }

  async function loadPage(href, options = {}) {
    const push = options.push !== false;
    const url = new URL(href, window.location.href);
    const path = url.pathname === '/' ? '/index.html' : url.pathname;

    try {
      const response = await fetch(path, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const content = doc.querySelector(contentSelector);
      if (!content) throw new Error('Missing data-spa-content wrapper');

      root.innerHTML = content.innerHTML;
      document.title = doc.title || document.title;
      setActiveLink(path);
      if (push) history.pushState({}, '', path);
      window.scrollTo(0, 0);
      runPageScripts();
    } catch (error) {
      console.error(error);
      if (push) window.location.href = href;
    }
  }

  window.spaNavigate = (href) => loadPage(href, { push: true });

  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname, { push: false });
  });

  document.addEventListener('DOMContentLoaded', () => {
    setActiveLink(window.location.pathname);
    runPageScripts();
  });
})();
