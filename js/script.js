// Scroll-reveal for sections
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.section, .contact-hero, .hero');
  targets.forEach(el => el.classList.add('reveal'));

  // Reveal the first (above-the-fold) section immediately
  if (targets[0]) requestAnimationFrame(() => targets[0].classList.add('is-visible'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-visible'));
  }
});

// Mobile topbar menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const topbar = document.querySelector('.topbar');
  const toggle = document.querySelector('.topbar-toggle');
  if (!topbar || !toggle) return;

  const setOpen = (isOpen) => {
    topbar.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Close' : 'Menu';
  };

  toggle.addEventListener('click', () => {
    setOpen(!topbar.classList.contains('is-open'));
  });

  topbar.querySelectorAll('.topbar-links a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
});

// ---------- GitHub live pulse (Home page) ----------
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('pulseGrid');
  const reposEl = document.getElementById('pulseRepos');
  if (!grid) return; // not on this page

  const USERNAME = 'areyoukaran';
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days < 1) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  };

  const getCommitCount = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/commits?q=author:${USERNAME}&per_page=1`, { headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) return null;
      const results = await response.json();
      return typeof results.total_count === 'number' ? results.total_count : null;
    } catch {
      return null;
    }
  };

  Promise.allSettled([
    fetch(`https://api.github.com/search/repositories?q=user:${USERNAME}&per_page=100&sort=updated`).then(r => r.ok ? r.json() : Promise.reject(r.status))
  ]).then(([reposResult]) => {
    const repositorySearch = reposResult.status === 'fulfilled' ? reposResult.value : null;
    const user = repositorySearch ? { public_repos: repositorySearch.total_count } : null;
    const repos = repositorySearch ? repositorySearch.items : [];
    const nonForks = repos.filter(r => !r.fork);
    const langCount = {};
    nonForks.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
    const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0];
    const latestPush = nonForks.reduce((latest, r) =>
      (!latest || new Date(r.pushed_at) > new Date(latest.pushed_at)) ? r : latest, null);
    grid.innerHTML = `
      <div class="pulse-card"><span class="pulse-k">Public repos</span><strong>${user ? user.public_repos : '—'}</strong></div>
      <div class="pulse-card" id="commitPulse"><span class="pulse-k">Total commits</span><strong>—</strong></div>
      <div class="pulse-card"><span class="pulse-k">Top language</span><strong>${topLang ? topLang[0] : '—'}</strong></div>
      <div class="pulse-card"><span class="pulse-k">Latest push</span><strong>${latestPush ? timeAgo(latestPush.pushed_at) : '—'}</strong></div>
    `;

    getCommitCount().then((totalCommits) => {
      if (totalCommits === null) return;
      const commitPulse = document.getElementById('commitPulse');
      if (commitPulse) commitPulse.querySelector('strong').textContent = totalCommits;
    });

    const topRepos = nonForks
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 3);

    if (topRepos.length && reposEl) {
      reposEl.innerHTML = topRepos.map(r => `
        <a class="pulse-repo" href="${r.html_url}" target="_blank" rel="noopener">
          <span class="repo-name">${r.name} <span class="arrow">→</span></span>
          <span class="repo-meta">
            ${r.language ? `<span class="repo-lang"><span class="lang-dot"></span>${r.language}</span>` : ''}
            <span>updated ${timeAgo(r.pushed_at)}</span>
          </span>
        </a>
      `).join('');
    }
    if (!user && !nonForks.length) {
      const refresh = document.getElementById('pulseRefresh');
      if (refresh) refresh.innerHTML = '<span class="pulse-dot"></span> commits live';
      if (reposEl) {
        reposEl.innerHTML = `<a class="pulse-repo pulse-repo-fallback" href="https://github.com/${USERNAME}" target="_blank" rel="noopener"><span class="repo-name">Open GitHub profile <span class="arrow">↗</span></span><span class="repo-meta">Profile and repository telemetry is temporarily rate-limited</span></a>`;
      }
    }
  });
});
