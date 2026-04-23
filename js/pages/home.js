import { TEAM_DATA, portfolioStore } from '../data.js';
import { renderNavbar } from '../components/navbar.js';

window.acceptConnection = async (from, toId) => {
  await portfolioStore.acceptConnectionRequest(from, toId);
  if (window.ElevateApp) window.ElevateApp.route();
};

function makeCard(m) {
  const skillTags = (m.topSkills || m.skills?.slice(0,3).map(s=>s.name) || []).map((s, i) => {
    const colors = m.skillColors || ['purple','cyan','pink'];
    return `<span class="skill-tag skill-tag--${colors[i % colors.length]}">${typeof s === 'string' ? s : s.name}</span>`;
  }).join('');

  const avatarContent = m.avatar
    ? `<img src="${m.avatar}" alt="${m.name}">`
    : `<div class="avatar-initials">${m.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase()}</div>`;

  const badge = m.isTeam ? '<span class="card-badge card-badge--team">Core Team</span>' : '<span class="card-badge card-badge--community">Community</span>';

  return `
    <div class="glass-card team-card" data-id="${m.id}" onclick="window.location.hash='#/profile/${m.id}'">
      ${badge}
      <div class="avatar-ring">${avatarContent}</div>
      <h3 class="team-card-name">${m.name}</h3>
      <p class="team-card-role">${m.role}</p>
      <p class="team-card-bio">${m.shortBio || m.bio?.substring(0,80) + '...'}</p>
      <div class="team-card-skills">${skillTags}</div>
      <button class="view-profile-btn">View Profile →</button>
    </div>
  `;
}

export function renderHome(username) {
  const teamCards = TEAM_DATA.map(makeCard).join('');
  const communityProfiles = portfolioStore.getCommunityProfiles();
  const communityCards = communityProfiles.map(makeCard).join('');
  const html = `
    ${renderNavbar(username, 'home')}
    <div class="bg-orbs">
      <div class="bg-orb bg-orb--1"></div>
      <div class="bg-orb bg-orb--2"></div>
      <div class="bg-orb bg-orb--3"></div>
    </div>
    <div class="home-page page">
      <div class="home-hero">
        <h1>Meet the <span class="gradient-text">Elevate</span> Team</h1>
        <p>The brilliant minds building the future of student collaboration. Click on any profile to explore their skills and projects.</p>
      </div>

      <!-- Quick Action Cards -->
      <div class="quick-actions">
        <div class="glass-card quick-action-card" onclick="window.location.hash='#/builder'">
          <span class="qa-icon">🚀</span>
          <div>
            <strong>Build Your Portfolio</strong>
            <p>Create a stunning portfolio with our template</p>
          </div>
        </div>
        <div class="glass-card quick-action-card" onclick="window.location.hash='#/find-teammates'">
          <span class="qa-icon">🤝</span>
          <div>
            <strong>Find Teammates</strong>
            <p>Search by skills and connect with developers</p>
          </div>
        </div>
        <div class="glass-card quick-action-card" onclick="window.location.hash='#/collaborate'">
          <span class="qa-icon">⚡</span>
          <div>
            <strong>Collaborate</strong>
            <p>Join or create real-time project workspaces</p>
          </div>
        </div>
      </div>

      <div class="section-header">
        <h2 class="section-title">Core Team</h2>
        <span class="section-badge">${TEAM_DATA.length} Members</span>
      </div>
      <div class="team-grid">${teamCards}</div>

      ${communityProfiles.length > 0 ? `
        <div class="section-header" style="margin-top:2rem;">
          <h2 class="section-title">Community Portfolios</h2>
          <span class="section-badge">${communityProfiles.length} Portfolios</span>
        </div>
        <div class="team-grid">${communityCards}</div>
      ` : ''}

      <div class="build-portfolio-section">
        <div class="glass-card build-portfolio-cta">
          <h2>✨ Build Your Own Portfolio</h2>
          <p>Use our pre-designed template to create a stunning portfolio in minutes. Your portfolio will appear in the Community section above for everyone to see!</p>
          <button class="btn-build-portfolio" onclick="window.location.hash='#/builder'">
            Start Building <span class="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  `;
  return { html };
}
