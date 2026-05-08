/**
 * Main entry point — fetch config, wire events, render page.
 */
(async function () {
  'use strict';

  let config;
  try {
    const resp = await fetch('config.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    config = await resp.json();
  } catch (e) {
    document.querySelector('.container').innerHTML =
      '<p style="color:#f85149;text-align:center;padding:2rem;">Failed to load config.json</p>';
    console.error('Config load failed:', e);
    return;
  }

  // Language
  const savedLang = localStorage.getItem('lang');
  const defaultLang = config.SITE_DEFAULT_LANG || 'zh';
  let currentLang = savedLang || defaultLang;

  function renderAll() {
    document.documentElement.lang = currentLang === 'cn' ? 'zh' : 'en';
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) langToggle.textContent = currentLang === 'cn' ? 'EN' : '中文';

    Renderer.renderHeader(config, currentLang);
    Renderer.renderAbout(config, currentLang);
    Renderer.renderNavHub(config, currentLang);
    Renderer.renderSocial(config, currentLang);
    Renderer.renderTechStack(config, currentLang);
    Renderer.renderProjects(config, currentLang);
    Renderer.renderLearning(config, currentLang);
    Renderer.renderGitHubStats(config, currentLang);
    Renderer.renderActivity(config, currentLang);
    Renderer.renderContact(config, currentLang);
    Renderer.renderFooter(config, currentLang);
  }

  // Language toggle
  document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'cn' ? 'en' : 'cn';
    localStorage.setItem('lang', currentLang);
    renderAll();
  });

  // Scroll to top
  const scrollBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initial render
  renderAll();
})();
