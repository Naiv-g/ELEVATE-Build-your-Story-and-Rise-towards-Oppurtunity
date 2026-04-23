import { portfolioStore } from '../data.js';
import { renderNavbar } from '../components/navbar.js';

export function renderFindTeammates(username) {
  const allProfiles = portfolioStore.getAllProfiles();

 
  const allSkills = new Set();
  allProfiles.forEach(p => {
    (p.topSkills || []).forEach(s => allSkills.add(s));
    (p.skills || []).forEach(s => allSkills.add(typeof s === 'string' ? s : s.name));
  });
  const skillFilters = [...allSkills].sort().map(s =>
    `<button class="filter-chip" data-skill="${s}">${s}</button>`
  ).join('');

  const html = `
    ${renderNavbar(username, 'find-teammates')}
    <div class="bg-orbs"><div class="bg-orb bg-orb--1"></div><div class="bg-orb bg-orb--2"></div><div class="bg-orb bg-orb--3"></div></div>
    <div class="teammates-page page">
      <div class="teammates-hero">
        <h1>Find Your <span class="gradient-text">Teammates</span></h1>
        <p>Search by name or filter by skills to find the perfect collaborator for your next project.</p>
      </div>

      <div class="search-section glass-card">
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="text" class="form-input search-input" id="teammate-search" placeholder="Search by name, role, or skill...">
        </div>
        <div class="filter-chips-section">
          <span class="filter-label">Filter by skills:</span>
          <div class="filter-chips" id="filter-chips">${skillFilters}</div>
        </div>
      </div>

      <div class="search-results-info" id="results-info">
        <span>Showing <strong id="results-count">${allProfiles.length}</strong> developers</span>
      </div>

      <div class="teammates-grid" id="teammates-grid"></div>
    </div>
  `;

  return {
    html,
    init: () => initFindTeammates(username)
  };
}

function initFindTeammates(username) {
  const searchInput = document.getElementById('teammate-search');
  const grid = document.getElementById('teammates-grid');
  const resultsCount = document.getElementById('results-count');
  let activeFilters = new Set();

  function renderResults() {
    const query = searchInput.value.toLowerCase().trim();
    let profiles = portfolioStore.getAllProfiles();

   
    if (query) {
      profiles = profiles.filter(p => {
        const searchable = `${p.name} ${p.role} ${(p.topSkills||[]).join(' ')} ${(p.skills||[]).map(s => typeof s === 'string' ? s : s.name).join(' ')}`.toLowerCase();
        return searchable.includes(query);
      });
    }

   
    if (activeFilters.size > 0) {
      profiles = profiles.filter(p => {
        const pSkills = new Set([
          ...(p.topSkills || []).map(s => s.toLowerCase()),
          ...(p.skills || []).map(s => (typeof s === 'string' ? s : s.name).toLowerCase())
        ]);
        return [...activeFilters].every(f => pSkills.has(f.toLowerCase()));
      });
    }

    resultsCount.textContent = profiles.length;

    if (profiles.length === 0) {
      grid.innerHTML = `<div class="no-results glass-card"><h3>No developers found</h3><p>Try adjusting your search or filters.</p></div>`;
      return;
    }

    grid.innerHTML = profiles.map((m, idx) => {
      const avatarContent = m.avatar
        ? `<img src="${m.avatar}" alt="${m.name}">`
        : `<div class="avatar-initials">${m.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase()}</div>`;

      const connStatus = portfolioStore.getConnectionStatus(username, m.id);
      const isMe = m.name === username || m.id === (window.ElevateApp?.profileId || username);
      let actionBtn = '';
      if (isMe) {
        actionBtn = '<span class="you-badge">You</span>';
      } else if (connStatus === 'pending') {
        actionBtn = '<button class="btn-connected-sm" disabled>✓ Sent</button>';
      } else if (connStatus === 'incoming_pending') {
        actionBtn = '<button class="btn-connected-sm" disabled style="color: #f59f00; border-color: rgba(245, 159, 0, 0.3); background: rgba(245, 159, 0, 0.1);">Req Received</button>';
      } else if (connStatus === 'connected') {
        actionBtn = '<button class="btn-connected-sm" disabled style="background: rgba(81, 207, 102, 0.15); color: #51cf66; border-color: rgba(81, 207, 102, 0.3);">🤝 Connected</button>';
      } else {
        actionBtn = `<button class="btn-connect-sm" data-id="${m.id}" data-name="${m.name}">🤝 Connect</button>`;
      }

      const badge = m.isTeam ? '<span class="card-badge card-badge--team">Core Team</span>' : '<span class="card-badge card-badge--community">Community</span>';
      const skillTags = (m.topSkills || []).slice(0,3).map((s,i) => {
        const colors = m.skillColors || ['purple','cyan','pink'];
        return `<span class="skill-tag skill-tag--${colors[i%colors.length]}">${s}</span>`;
      }).join('');

      return `
        <div class="glass-card teammate-card" style="animation-delay:${idx * 0.05}s">
          ${badge}
          <div class="teammate-card-top">
            <div class="avatar-ring avatar-ring--sm">${avatarContent}</div>
            <div class="teammate-card-info">
              <h3 class="teammate-name">${m.name}</h3>
              <p class="teammate-role">${m.role}</p>
            </div>
            ${actionBtn}
          </div>
          <p class="teammate-bio">${m.shortBio || (m.bio||'').substring(0,100)+'...'}</p>
          <div class="teammate-skills">${skillTags}</div>
          <button class="view-profile-btn-sm" onclick="window.location.hash='#/profile/${m.id}'">View Profile →</button>
        </div>
      `;
    }).join('');

   
    grid.querySelectorAll('.btn-connect-sm').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        portfolioStore.sendConnectionRequest(username, id);
        btn.textContent = '✓ Sent';
        btn.classList.add('btn-connected-sm');
        btn.classList.remove('btn-connect-sm');
        btn.disabled = true;
        showToast(`🤝 Connection request sent to ${name}!`);
      });
    });
  }

 
  searchInput.addEventListener('input', renderResults);

 
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const skill = chip.dataset.skill;
      if (activeFilters.has(skill)) {
        activeFilters.delete(skill);
        chip.classList.remove('filter-chip--active');
      } else {
        activeFilters.add(skill);
        chip.classList.add('filter-chip--active');
      }
      renderResults();
    });
  });

 
  renderResults();
}

function showToast(msg) {
  const t = document.querySelector('.toast');
  if (t) t.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}
