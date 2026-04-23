import { TEAM_DATA, portfolioStore } from '../data.js';
import { renderNavbar } from '../components/navbar.js';

export function renderProfile(memberId, username) {
  const member = portfolioStore.getProfileById(memberId);
  if (!member) {
    return { html: `${renderNavbar(username, '')}<div class="bg-orbs"><div class="bg-orb bg-orb--1"></div><div class="bg-orb bg-orb--2"></div><div class="bg-orb bg-orb--3"></div></div><div class="profile-page page"><button class="btn-back" onclick="window.location.hash='#/home'">← Back to Home</button><div class="glass-card" style="padding:3rem;text-align:center;"><h2>Profile not found</h2><p style="color:var(--text-secondary);margin-top:1rem;">This profile may have been removed.</p></div></div>` };
  }

  const skillBars = (member.skills || []).map(s => `
    <div class="skill-bar-item">
      <div class="skill-bar-top">
        <span class="skill-bar-name">${s.name}</span>
        <span class="skill-bar-percent">${s.level}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="--fill: ${s.level}%"></div>
      </div>
    </div>
  `).join('');

  const projectCards = (member.projects || []).map(p => {
    const tags = (p.techStack || []).map(t => `<span class="skill-tag skill-tag--purple">${t}</span>`).join('');
    const statusClass = p.status === 'active' ? 'project-status--active' : 'project-status--completed';
    return `
      <div class="glass-card project-card">
        <div class="project-card-header">
          <span class="project-name">${p.name}</span>
          <span class="project-status ${statusClass}">${p.status}</span>
        </div>
        <p class="project-description">${p.description}</p>
        <div class="project-tech-stack">${tags}</div>
      </div>
    `;
  }).join('');

  const avatarHTML = member.avatar
    ? `<img src="${member.avatar}" alt="${member.name}">`
    : `<div class="profile-avatar-initials">${member.name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase()}</div>`;

  const badgeHTML = member.isTeam
    ? '<span class="profile-badge profile-badge--team">🏆 Core Team Member</span>'
    : '<span class="profile-badge profile-badge--community">🌍 Community Member</span>';

 
  const shareURL = `${window.location.origin}${window.location.pathname}#/profile/${member.id}`;

 
  const connStatus = portfolioStore.getConnectionStatus(username, member.id);
  let connectBtnHTML = '';
  if (member.name !== username && member.id !== (window.ElevateApp?.profileId || username)) {
    if (connStatus === 'pending') {
      connectBtnHTML = '<button class="btn-connected" disabled>✓ Request Sent</button>';
    } else if (connStatus === 'incoming_pending') {
      connectBtnHTML = '<button class="btn-connected" disabled style="background: rgba(245, 159, 0, 0.1); color: #f59f00; border-color: rgba(245, 159, 0, 0.3);">Req Received</button>';
    } else if (connStatus === 'connected') {
      connectBtnHTML = '<button class="btn-connected" disabled style="background: rgba(81, 207, 102, 0.15); color: #51cf66; border-color: rgba(81, 207, 102, 0.3);">🤝 Connected</button>';
    } else {
      connectBtnHTML = `<button class="btn-connect" id="btn-connect" data-id="${member.id}">🤝 Connect</button>`;
    }
  }

  const socialsHTML = member.socials ? `
    <div class="profile-socials">
      ${member.socials.github ? `<a href="${member.socials.github}" class="social-link" title="GitHub">🐙</a>` : ''}
      ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" class="social-link" title="LinkedIn">🔗</a>` : ''}
      ${member.socials.twitter ? `<a href="${member.socials.twitter}" class="social-link" title="Twitter">🐦</a>` : ''}
    </div>
  ` : '';

  const html = `
    ${renderNavbar(username, '')}
    <div class="bg-orbs">
      <div class="bg-orb bg-orb--1"></div>
      <div class="bg-orb bg-orb--2"></div>
      <div class="bg-orb bg-orb--3"></div>
    </div>
    <div class="profile-page page">
      <button class="btn-back" onclick="window.location.hash='#/home'">← Back to Home</button>

      <div class="glass-card profile-header">
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar-ring">${avatarHTML}</div>
        </div>
        <div class="profile-info">
          ${badgeHTML}
          <h1>${member.name}</h1>
          <p class="profile-role">${member.role}</p>
          <p class="profile-bio">${member.bio}</p>
          <div class="profile-actions">
            ${socialsHTML}
            ${connectBtnHTML}
            <button class="btn-share" id="btn-share" title="Copy portfolio link">📋 Share</button>
          </div>
        </div>
      </div>

      ${member.skills && member.skills.length > 0 ? `
      <div class="profile-section">
        <h2 class="profile-section-title"><span class="icon">⚡</span> Skills & Expertise</h2>
        <div class="skills-grid">${skillBars}</div>
      </div>` : ''}

      ${member.education || member.experience ? `
      <div class="profile-section">
        <h2 class="profile-section-title"><span class="icon">🎓</span> Education & Experience</h2>
        <div class="glass-card" style="padding: 1.5rem;">
          ${member.education ? `<div style="margin-bottom: 1rem;">
            <span style="color: var(--accent-purple); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Education</span>
            <p style="color: var(--text-primary); margin-top: 0.4rem;">${member.education}</p>
          </div>` : ''}
          ${member.experience ? `<div>
            <span style="color: var(--accent-cyan); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Experience</span>
            <p style="color: var(--text-primary); margin-top: 0.4rem;">${member.experience}</p>
          </div>` : ''}
        </div>
      </div>` : ''}

      ${member.achievements && member.achievements.length > 0 ? `
      <div class="profile-section">
        <h2 class="profile-section-title"><span class="icon">🏆</span> Achievements</h2>
        <div class="glass-card" style="padding: 1.5rem;">
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${member.achievements.map(a => `<li style="color: var(--text-primary); padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--accent-amber); font-size: 1.1rem;">★</span> ${a}
            </li>`).join('')}
          </ul>
        </div>
      </div>` : ''}

      ${member.projects && member.projects.length > 0 ? `
      <div class="profile-section">
        <h2 class="profile-section-title"><span class="icon">📁</span> Projects</h2>
        <div class="projects-grid">${projectCards}</div>
      </div>` : ''}
    </div>
  `;

  return {
    html,
    init: () => {
     
      const shareBtn = document.getElementById('btn-share');
      if (shareBtn) {
        shareBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(shareURL).then(() => {
            showToast('📋 Portfolio link copied to clipboard!');
          }).catch(() => {
            showToast('📋 Link: ' + shareURL);
          });
        });
      }
     
      const connBtn = document.getElementById('btn-connect');
      if (connBtn) {
        connBtn.addEventListener('click', () => {
          portfolioStore.sendConnectionRequest(username, member.id);
          connBtn.textContent = '✓ Request Sent';
          connBtn.classList.add('btn-connected');
          connBtn.classList.remove('btn-connect');
          connBtn.disabled = true;
          showToast(`🤝 Connection request sent to ${member.name}!`);
        });
      }
    }
  };
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}
