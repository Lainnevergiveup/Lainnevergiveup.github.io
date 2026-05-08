/**
 * Renderer — builds all page sections from config data.
 * Each render* method: check data → empty? hide section → else build DOM.
 */

/* ── Badge / Icon lookup tables ── */

const BADGE_MAP = {
  'Python':       { color: '3776AB', logo: 'python',      lgc: 'white' },
  'Java':         { color: '007396', logo: 'openjdk',     lgc: 'white' },
  'JavaScript':   { color: 'F7DF1E', logo: 'javascript',  lgc: 'black' },
  'SQL':          { color: '4479A1', logo: 'mysql',       lgc: 'white' },
  'Bash':         { color: '4EAA25', logo: 'gnubash',     lgc: 'white' },
  'Spring Boot':  { color: '6DB33F', logo: 'springboot',  lgc: 'white' },
  'FastAPI':      { color: '009688', logo: 'fastapi',     lgc: 'white' },
  'Flask':        { color: '000000', logo: 'flask',       lgc: 'white' },
  'Node.js':      { color: '339933', logo: 'nodedotjs',   lgc: 'white' },
  'MySQL':        { color: '4479A1', logo: 'mysql',       lgc: 'white' },
  'Redis':        { color: 'DC382D', logo: 'redis',       lgc: 'white' },
  'PostgreSQL':   { color: '4169E1', logo: 'postgresql',  lgc: 'white' },
  'PyTorch':      { color: 'EE4C2C', logo: 'pytorch',     lgc: 'white' },
  'NumPy':        { color: '013243', logo: 'numpy',       lgc: 'white' },
  'Pandas':       { color: '150458', logo: 'pandas',      lgc: 'white' },
  'Git':          { color: 'F05032', logo: 'git',         lgc: 'white' },
  'Linux':        { color: 'FCC624', logo: 'linux',       lgc: 'black' },
  'Docker':       { color: '2496ED', logo: 'docker',      lgc: 'white' },
  'LangChain':    { color: '1C3C3C', logo: '',            lgc: 'white' },
  'Vector DB':    { color: '4A90D9', logo: '',            lgc: 'white' },
};

const ICON_MAP = {
  hashnode:    'M24.509 0c-1.418 0-2.786.531-3.822 1.487l-7.37 6.802-7.37-6.802C4.786.531 3.418 0 2 0 .895 0 0 .895 0 2v20c0 1.105.895 2 2 2 1.418 0 2.786-.531 3.822-1.487l7.37-6.802 7.37 6.802c1.036.956 2.404 1.487 3.822 1.487 1.105 0 2-.895 2-2V2c0-1.105-.895-2-2-2z',
  github:      'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  flask:       'M7.042 20.196h9.916L19.07 24H4.93l2.112-3.804zM20.595 9.37H3.405L.174 17.914h23.652L20.595 9.37zM12 2.006l-4.2 6.994h8.4L12 2.006z',
  scholar:     'M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',
  flask2:      'M7 4V2h10v2l3 8-3 8H7l-3-8 3-8zm3 0h4l2 6H8l2-6z',
  docs:        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z',
  wiki:        'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c1.5 0 2.5 2.5 3 4 .5-1.5 1.5-4 3-4s2.5 2 2.5 4c0 1-.5 2-1 3l-4.5 8-4.5-8c-.5-1-1-2-1-3 0-2 1-4 2.5-4z',
  file:        'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z',
  play:        'M8 5v14l11-7z',
  twitter:     'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  zhihu:       'M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.56C21.751 24 24 21.75 24 18.281V5.72C24 2.249 21.75 0 18.281 0zm1.964 4.078h6.882c.201 0 .398.014.597.033-.686.753-1.233 1.564-1.582 2.366-.412-.269-.859-.426-1.324-.426-1.299 0-2.354 1.042-2.354 2.325 0 .84.446 1.576 1.116 1.998-.458 1.582-1.218 2.896-2.084 3.856-.304.34-.62.636-.933.886-.293.234-.582.427-.857.582-.207.116-.397.208-.565.279a.992.992 0 0 1-.238.07c-.137.024-.253-.04-.326-.118-.074-.079-.103-.186-.082-.296.014-.072.054-.15.112-.23.146-.2.32-.446.508-.722.293-.428.628-.928.965-1.484a24.3 24.3 0 0 0 .732-1.454c.328-.707.526-1.394.56-2.016a3.13 3.13 0 0 1-.297.07c-.372.067-.793.033-1.212-.124a3.352 3.352 0 0 1-.597-.248c-.237-.124-.469-.273-.688-.426-.064-.047-.125-.094-.183-.14a2.505 2.505 0 0 1-.154-.124l-.044-.038-.035-.031-.035-.032-.03-.027-.032-.028-.027-.025c-.084-.076-.15-.148-.195-.212-.033-.049-.054-.09-.06-.122-.01-.048-.004-.072.006-.09.005-.007.013-.013.028-.018.02-.008.05-.015.09-.023a1.5 1.5 0 0 0 .146-.034c.08-.022.17-.049.269-.082.198-.065.426-.149.673-.253.494-.208 1.063-.497 1.653-.868a14.1 14.1 0 0 0 1.335-1.066c.213-.198.41-.405.586-.616zm-2.647.89c-.468.348-.925.73-1.352 1.138-.258.248-.498.504-.714.763a7.98 7.98 0 0 0-.395.502c-.035.052-.068.103-.098.152l.01.007c.135.095.297.187.48.274.298.142.634.258.99.323.138.025.28.043.424.043.378 0 .747-.086 1.08-.255a2.39 2.39 0 0 0 .868-.688c.229-.297.384-.652.444-1.022.03-.186.03-.373-.003-.552-.083-.457-.303-.863-.609-1.163a2.14 2.14 0 0 0-.624-.43z',
  bilibili:    'M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z',
  linkedin:    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  google_scholar: 'M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',
  orcid:       'M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.894-1.278-3.722-3.997-3.722h-2.322z',
  huggingface: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm-2 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 4h6c0 2-1.5 3.5-3 4-1.5-.5-3-2-3-4z',
  kaggle:      'M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.119.011.266-.104.439l-6.588 8.075 6.838 8.496c.117.15.151.297.105.439',
  email:       'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  blog:        'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
};

const SOCIAL_PLATFORMS = [
  { key: 'TWITTER',       label: 'X / Twitter',   iconKey: 'twitter',        urlPrefix: 'https://x.com/' },
  { key: 'ZHIHU',         label: 'Zhihu',         iconKey: 'zhihu',          urlPrefix: 'https://www.zhihu.com/people/' },
  { key: 'BILIBILI',      label: 'Bilibili',      iconKey: 'bilibili',       urlPrefix: 'https://space.bilibili.com/' },
  { key: 'LINKEDIN',      label: 'LinkedIn',      iconKey: 'linkedin',       urlPrefix: 'https://linkedin.com/in/' },
  { key: 'GOOGLE_SCHOLAR',label: 'Google Scholar',iconKey: 'google_scholar', urlPrefix: 'https://scholar.google.com/citations?user=' },
  { key: 'ORCID',         label: 'ORCID',         iconKey: 'orcid',          urlPrefix: 'https://orcid.org/' },
  { key: 'HUGGINGFACE',   label: 'Hugging Face',  iconKey: 'huggingface',    urlPrefix: 'https://huggingface.co/' },
  { key: 'KAGGLE',        label: 'Kaggle',        iconKey: 'kaggle',         urlPrefix: 'https://kaggle.com/' },
];

function badgeUrl(name) {
  const b = BADGE_MAP[name];
  if (!b) return '';
  return `https://img.shields.io/badge/${encodeURIComponent(name)}-${b.color}?style=flat-square&logo=${b.logo}&logoColor=${b.lgc}`;
}

function svgIcon(key) {
  const d = ICON_MAP[key];
  if (!d) return '';
  return `<svg class="nav-card-icon" viewBox="0 0 24 24" fill="currentColor"><path d="${d}"/></svg>`;
}

function socialIcon(key) {
  const d = ICON_MAP[key];
  if (!d) return '';
  return `<svg class="social-item-icon" viewBox="0 0 24 24" fill="currentColor"><path d="${d}"/></svg>`;
}

function show(el) { el.classList.remove('hidden'); }
function hide(el) { el.classList.add('hidden'); }
function $(id) { return document.getElementById(id); }

/* ── Render functions ── */

const Renderer = {

  typingAnim: null,

  renderHeader(config, lang) {
    const el = $('header');
    const subtitle = lang === 'cn' ? config.SITE_SUBTITLE_CN : config.SITE_SUBTITLE_EN;
    if (!subtitle) { hide(el); return; }

    const typingEl = el.querySelector('.typing-line');
    const lines = lang === 'cn'
      ? ['计算机科学学生', '后端 / AI / 开源', '构建. 学习. 迭代.']
      : ['Computer Science Student', 'Backend / AI / Open Source', 'Building. Learning. Iterating.'];

    if (!typingEl) {
      el.innerHTML = `
        <h1 class="typing-line" id="typing-target"></h1>
        <p class="subtitle">${subtitle}</p>
        <div class="header-links" id="header-links"></div>
      `;
      const target = $('typing-target');
      this.typingAnim = new TypingAnimation(target, lines);
    } else {
      if (this.typingAnim) this.typingAnim.setLines(lines);
    }

    // Header badges
    const linksEl = $('header-links');
    if (linksEl) {
      let html = '';
      html += `<a class="header-badge" href="https://github.com/${config.USERNAME}" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="${ICON_MAP.github}"/></svg>
        GitHub
      </a>`;
      if (config.EMAIL) {
        html += `<a class="header-badge" href="mailto:${config.EMAIL}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="${ICON_MAP.email}"/></svg>
          Email
        </a>`;
      }
      linksEl.innerHTML = html;
    }
    show(el);
  },

  renderAbout(config, lang) {
    const el = $('about');
    const text = lang === 'cn' ? config.ABOUT_CN : config.ABOUT_EN;
    if (!text || !text.trim()) { hide(el); return; }
    const title = lang === 'cn' ? '关于我' : 'About Me';
    el.innerHTML = `<h2 class="section-title">${title}</h2><p>${text}</p>`;
    show(el);
  },

  renderNavHub(config, lang) {
    const el = $('nav-hub');
    const cards = config.NAV_CARDS;
    if (!Array.isArray(cards) || !cards.length) { hide(el); return; }

    // Filter cards that have a URL configured
    const visibleCards = cards.filter(c => config[c.key] && config[c.key].trim());
    if (!visibleCards.length) { hide(el); return; }

    const title = lang === 'cn' ? '导航' : 'Navigation';
    let html = `<h2 class="section-title">${title}</h2><div class="nav-grid">`;
    for (const c of visibleCards) {
      const url = config[c.key];
      const label = lang === 'cn' ? c.label_cn : c.label_en;
      const desc = lang === 'cn' ? c.desc_cn : c.desc_en;
      html += `
        <a class="nav-card" href="${url}" target="_blank" rel="noopener">
          ${svgIcon(c.icon)}
          <div class="nav-card-label">${label}</div>
          <div class="nav-card-desc">${desc}</div>
        </a>`;
    }
    html += '</div>';
    el.innerHTML = html;
    show(el);
  },

  renderSocial(config, lang) {
    const el = $('social');
    const visible = SOCIAL_PLATFORMS.filter(p => config[p.key] && config[p.key].trim());
    if (!visible.length) { hide(el); return; }

    const title = lang === 'cn' ? '社交平台' : 'Social Platforms';
    let html = `<h2 class="section-title">${title}</h2><div class="social-grid">`;
    for (const p of visible) {
      const handle = config[p.key];
      html += `
        <a class="social-item" href="${p.urlPrefix}${handle}" target="_blank" rel="noopener">
          ${socialIcon(p.iconKey)}
          <span class="social-item-name">${p.label}</span>
          <span class="social-item-handle">${handle}</span>
        </a>`;
    }
    html += '</div>';
    el.innerHTML = html;
    show(el);
  },

  renderTechStack(config, lang) {
    const el = $('tech-stack');
    const stack = config.TECH_STACK;
    if (!stack || typeof stack !== 'object') { hide(el); return; }

    const title = lang === 'cn' ? '技术栈' : 'Tech Stack';
    let html = `<h2 class="section-title">${title}</h2>`;

    for (const [_, cat] of Object.entries(stack)) {
      if (!cat.items || !cat.items.length) continue;
      const catLabel = lang === 'cn' ? cat.label_cn : cat.label_en;
      html += `<div class="tech-category"><div class="tech-category-title">${catLabel}</div><div class="tech-badges">`;
      for (const item of cat.items) {
        const url = badgeUrl(item);
        if (url) {
          html += `<a class="tech-badge" href="https://github.com/search?q=${encodeURIComponent(item)}" target="_blank" rel="noopener">
            <img src="${url}" alt="${item}" loading="lazy"> ${item}
          </a>`;
        } else {
          html += `<span class="tech-badge">${item}</span>`;
        }
      }
      html += '</div></div>';
    }
    el.innerHTML = html;
    show(el);
  },

  renderProjects(config, lang) {
    const el = $('projects');
    const projects = config.FEATURED_PROJECTS;
    if (!Array.isArray(projects) || !projects.length) { hide(el); return; }

    const title = lang === 'cn' ? '精选项目' : 'Featured Projects';
    let html = `<h2 class="section-title">${title}</h2><div class="project-grid">`;
    for (const p of projects) {
      const desc = lang === 'cn' ? p.desc_cn : p.desc_en;
      const tagsHtml = (p.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('');
      html += `
        <div class="project-card">
          <h3><a href="${p.url}" target="_blank" rel="noopener">${p.name}</a></h3>
          <p>${desc}</p>
          <div class="project-tags">${tagsHtml}</div>
        </div>`;
    }
    html += '</div>';
    el.innerHTML = html;
    show(el);
  },

  renderLearning(config, lang) {
    const el = $('learning');
    const topics = lang === 'cn' ? config.LEARNING_TOPICS_CN : config.LEARNING_TOPICS_EN;
    if (!Array.isArray(topics) || !topics.length) { hide(el); return; }

    const title = lang === 'cn' ? '学习方向' : 'Learning & Research';
    let html = `<h2 class="section-title">${title}</h2><ul class="learning-list">`;
    for (const t of topics) {
      html += `<li class="learning-item">${t}</li>`;
    }
    html += '</ul>';
    el.innerHTML = html;
    show(el);
  },

  /* ── Client-side GitHub stats (no external service dependency) ── */

  _statsCache: null,

  async _fetchGitHubStats(username) {
    if (this._statsCache) return this._statsCache;
    const proxy = 'https://api.github.com';
    const [userRes, reposRes] = await Promise.all([
      fetch(`${proxy}/users/${username}`),
      fetch(`${proxy}/users/${username}/repos?per_page=100&sort=updated`)
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');
    const user = await userRes.json();
    const repos = await reposRes.json();
    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
    const langs = {};
    for (const r of repos) {
      if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
    }
    this._statsCache = { user, totalStars, totalForks, langs, repoCount: repos.length };
    return this._statsCache;
  },

  _statsCardSVG(stats, lang) {
    const label = lang === 'cn'
      ? ['公开仓库', '总星数', '关注者', '总 Fork']
      : ['Public Repos', 'Total Stars', 'Followers', 'Total Forks'];
    const values = [stats.repoCount, stats.totalStars, stats.user.followers, stats.totalForks];
    const icons = [
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
      'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
      'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
      'M6 2v6H2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h-4V2H6zm2 2h8v4H8V4zm-4 8h16v8H4v-8z'
    ];

    let items = '';
    for (let i = 0; i < 4; i++) {
      items += `
        <g transform="translate(${i * 130}, 0)">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#A8B8D8" stroke-width="1.5" opacity="0.3"/>
          <path d="${icons[i]}" transform="translate(8, 8) scale(0.85)" fill="#A8B8D8" opacity="0.7"/>
          <text x="48" y="16" fill="#A8B8D8" font-size="20" font-weight="600" font-family="Segoe UI, Ubuntu, sans-serif">${values[i]}</text>
          <text x="48" y="32" fill="#8B949E" font-size="11" font-family="Segoe UI, Ubuntu, sans-serif">${label[i]}</text>
        </g>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="48" viewBox="0 0 520 48">${items}</svg>`;
  },

  _langChartSVG(stats, lang) {
    const entries = Object.entries(stats.langs).sort((a, b) => b[1] - a[1]).slice(0, 6);
    if (!entries.length) return '';
    const total = entries.reduce((s, e) => s + e[1], 0);
    const colors = { 'Java': '007396', 'Python': '3776AB', 'JavaScript': 'F7DF1E', 'TypeScript': '3178C6', 'Shell': '89E051', 'Go': '00ADD8', 'Rust': 'DEA584', 'C++': '00599C', 'C': '555555', 'HTML': 'E34C26', 'CSS': '563D7C', 'Ruby': '701516' };
    const fallback = ['6B7280', '9CA3AF', '4B5563', '374151', '1F2937', '111827'];
    const title = lang === 'cn' ? 'Top 语言' : 'Top Languages';

    let bars = '';
    let x = 0;
    entries.forEach((entry, i) => {
      const pct = (entry[1] / total * 100);
      const w = Math.max(pct * 4.8, 2);
      const c = colors[entry[0]] || fallback[i % fallback.length];
      bars += `<rect x="${x}" y="0" width="${w}" height="14" rx="3" fill="#${c}" opacity="0.85"/>`;
      x += w + 2;
    });

    let legend = '';
    entries.forEach((entry, i) => {
      const pct = (entry[1] / total * 100).toFixed(1);
      const c = colors[entry[0]] || fallback[i % fallback.length];
      const col = i < 3 ? 0 : 200;
      const row = i < 3 ? i : i - 3;
      legend += `
        <g transform="translate(${col}, ${26 + row * 20})">
          <circle cx="6" cy="6" r="5" fill="#${c}"/>
          <text x="16" y="10" fill="#C9D1D9" font-size="12" font-family="Segoe UI, Ubuntu, sans-serif">${entry[0]}</text>
          <text x="120" y="10" fill="#8B949E" font-size="12" font-family="Segoe UI, Ubuntu, sans-serif">${pct}%</text>
        </g>`;
    });

    const h = 26 + Math.ceil(entries.length / 3) * 20 + 10;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="${h}" viewBox="0 0 520 ${h}">
      <text x="0" y="12" fill="#A8B8D8" font-size="14" font-weight="600" font-family="Segoe UI, Ubuntu, sans-serif">${title}</text>
      <g transform="translate(0, 18)">${bars}</g>
      ${legend}
    </svg>`;
  },

  async renderGitHubStats(config, lang) {
    const el = $('github-stats');
    if (config.SHOW_GITHUB_STATS !== 'yes') { hide(el); return; }

    const title = lang === 'cn' ? 'GitHub 统计' : 'GitHub Stats';
    el.innerHTML = `<h2 class="section-title">${title}</h2><div class="stats-container" id="stats-content"><span class="loading-text">${lang === 'cn' ? '加载中...' : 'Loading...'}</span></div>`;
    show(el);

    try {
      const stats = await this._fetchGitHubStats(config.USERNAME);
      const contentEl = $('stats-content');
      if (!contentEl) return;
      contentEl.innerHTML = this._statsCardSVG(stats, lang) + this._langChartSVG(stats, lang);
    } catch (e) {
      const contentEl = $('stats-content');
      if (contentEl) contentEl.innerHTML = `<span class="loading-text">${lang === 'cn' ? '加载失败' : 'Failed to load stats'}</span>`;
      console.error('Stats load failed:', e);
    }
  },

  async renderActivity(config, lang) {
    const el = $('activity');
    if (config.SHOW_ACTIVITY_GRAPH !== 'yes' && config.SHOW_CONTRIBUTION_SNAKE !== 'yes') { hide(el); return; }

    const user = config.USERNAME;
    const title = lang === 'cn' ? '贡献' : 'Contributions';
    let html = `<h2 class="section-title">${title}</h2><div class="stats-container">`;

    if (config.SHOW_ACTIVITY_GRAPH === 'yes') {
      html += `<a href="https://github.com/${user}" target="_blank" rel="noopener"><img src="https://ghchart.rshah.org/${user}?theme=tokyonight" alt="Contribution Chart" loading="lazy" onerror="this.style.display='none'"></a>`;
    }
    if (config.SHOW_CONTRIBUTION_SNAKE === 'yes') {
      html += `<img src="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg" alt="Contribution Snake" loading="lazy" onerror="this.style.display='none'">`;
    }
    html += '</div>';
    el.innerHTML = html;
    show(el);
  },

  renderContact(config, lang) {
    const el = $('contact');
    const title = lang === 'cn' ? '联系' : 'Contact';
    let html = `<h2 class="section-title">${title}</h2><div class="contact-badges">`;

    html += `<a class="contact-badge" href="https://github.com/${config.USERNAME}" target="_blank" rel="noopener">GitHub</a>`;
    if (config.EMAIL) {
      html += `<a class="contact-badge" href="mailto:${config.EMAIL}">Email</a>`;
    }
    if (config.BLOG) {
      html += `<a class="contact-badge" href="${config.BLOG}" target="_blank" rel="noopener">Blog</a>`;
    }
    if (config.TWITTER) {
      html += `<a class="contact-badge" href="https://x.com/${config.TWITTER}" target="_blank" rel="noopener">Twitter</a>`;
    }

    html += '</div>';
    el.innerHTML = html;
    show(el);
  },

  renderFooter(config, lang) {
    const el = $('footer');
    const text = lang === 'cn'
      ? '以工程纪律构建，以长期主义维护。'
      : 'Built with engineering discipline. Maintained with long-term vision.';
    el.innerHTML = `<sub>${text}</sub>`;
  }
};
