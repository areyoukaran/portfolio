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

  Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.ok ? r.json() : Promise.reject(r.status)),
    fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`).then(r => r.ok ? r.json() : Promise.reject(r.status))
  ]).then(([user, repos]) => {
    const nonForks = repos.filter(r => !r.fork);
    const langCount = {};
    nonForks.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
    const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0];
    const latestPush = nonForks.reduce((latest, r) =>
      (!latest || new Date(r.pushed_at) > new Date(latest.pushed_at)) ? r : latest, null);

    grid.innerHTML = `
      <div class="pulse-card"><span class="pulse-k">Public repos</span><strong>${user.public_repos}</strong></div>
      <div class="pulse-card"><span class="pulse-k">Followers</span><strong>${user.followers}</strong></div>
      <div class="pulse-card"><span class="pulse-k">Top language</span><strong>${topLang ? topLang[0] : '—'}</strong></div>
      <div class="pulse-card"><span class="pulse-k">Latest push</span><strong>${latestPush ? timeAgo(latestPush.pushed_at) : '—'}</strong></div>
    `;

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
  }).catch(() => {
    grid.innerHTML = `<div class="pulse-error" style="grid-column:1/-1">Couldn't reach the GitHub API right now — see the latest directly on <a href="https://github.com/${USERNAME}" target="_blank" rel="noopener">github.com/${USERNAME}</a>.</div>`;
    const refresh = document.getElementById('pulseRefresh');
    if (refresh) refresh.style.display = 'none';
  });
});
