import { portfolioStore } from '../data.js';
import { renderNavbar } from '../components/navbar.js';

export function renderCollaborate(username) {
  const html = `
    ${renderNavbar(username, 'collaborate')}
    <div class="bg-orbs"><div class="bg-orb bg-orb--1"></div><div class="bg-orb bg-orb--2"></div><div class="bg-orb bg-orb--3"></div></div>
    <div class="collab-page page">
      <div class="collab-hero">
        <h1>Collaborate <span class="gradient-text">in Real-Time</span></h1>
        <p>Create or join open projects. Work with talented developers from the Elevate community.</p>
      </div>

      <div class="collab-actions">
        <button class="btn-primary" style="width:auto;padding:12px 28px;" id="btn-new-project">➕ Create New Project</button>
      </div>

      <!-- New project modal -->
      <div class="glass-card new-project-form hidden" id="new-project-form">
        <h3 style="font-family:var(--font-heading);margin-bottom:1rem;">Create a Project</h3>
        <div class="form-group"><label class="form-label">Project Title</label><input type="text" class="form-input" id="np-title" placeholder="e.g. Open Source Chat App"></div>
        <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="np-desc" placeholder="Describe the project and what kind of help you need..."></textarea></div>
        <div class="form-group"><label class="form-label">Skills Needed (comma-separated)</label><input type="text" class="form-input" id="np-skills" placeholder="e.g. React, Node.js, Python"></div>
        <div style="display:flex;gap:1rem;justify-content:flex-end;margin-top:1rem;">
          <button class="btn-secondary" id="btn-cancel-project">Cancel</button>
          <button class="btn-primary" style="width:auto;padding:10px 24px;" id="btn-submit-project">Create Project →</button>
        </div>
      </div>

      <div id="projects-list"></div>
    </div>
  `;

  return { html, init: () => initCollaborate(username) };
}

function initCollaborate(username) {
  const form = document.getElementById('new-project-form');
  const list = document.getElementById('projects-list');

  document.getElementById('btn-new-project').addEventListener('click', () => {
    form.classList.toggle('hidden');
  });
  document.getElementById('btn-cancel-project').addEventListener('click', () => {
    form.classList.add('hidden');
  });
  document.getElementById('btn-submit-project').addEventListener('click', () => {
    const title = document.getElementById('np-title').value.trim();
    const desc = document.getElementById('np-desc').value.trim();
    const skills = document.getElementById('np-skills').value.split(',').map(s => s.trim()).filter(Boolean);
    if (!title) { showToast('⚠️ Please enter a project title.'); return; }
    const project = {
      id: 'proj_' + Date.now(),
      title, description: desc || 'No description provided.',
      owner: username, skillsNeeded: skills,
      members: [username], status: 'open',
      createdAt: new Date().toISOString().slice(0, 10)
    };
    portfolioStore.addCollabProject(project);
    form.classList.add('hidden');
    document.getElementById('np-title').value = '';
    document.getElementById('np-desc').value = '';
    document.getElementById('np-skills').value = '';
    showToast('🎉 Project created! Others can now join.');
    renderProjects();
  });

  function renderProjects() {
    const projects = portfolioStore.getCollabProjects();
    if (projects.length === 0) {
      list.innerHTML = '<div class="glass-card" style="padding:3rem;text-align:center;"><h3>No projects yet</h3><p style="color:var(--text-secondary);">Be the first to create a collaborative project!</p></div>';
      return;
    }

    list.innerHTML = projects.map((p, idx) => {
      const skillTags = (p.skillsNeeded || []).map(s => `<span class="skill-tag skill-tag--cyan">${s}</span>`).join('');
      const memberAvatars = p.members.map(m => {
        const initials = m.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
        return `<div class="member-chip" title="${m}">${initials}</div>`;
      }).join('');

      const isMember = p.members.includes(username);
      const isOwner = p.owner === username;
      const isRequested = (p.joinRequests || []).includes(username);
      
      let actionBtn = '';
      if (isOwner) {
        actionBtn = '<span class="owner-badge">👑 Owner</span>';
      } else if (isMember) {
        actionBtn = '<span class="joined-badge" style="background: rgba(81, 207, 102, 0.15); color: #51cf66; border: 1px solid rgba(81, 207, 102, 0.3); padding: 6px 14px; border-radius: 6px;">✓ Joined</span>';
      } else if (isRequested) {
        actionBtn = '<button class="btn-join" disabled style="background: rgba(245, 159, 0, 0.1); color: #f59f00; border: 1px solid rgba(245, 159, 0, 0.3); opacity: 0.8; cursor: not-allowed;">⏳ Requested</button>';
      } else {
        actionBtn = `<button class="btn-join" data-id="${p.id}">Req to Join →</button>`;
      }

      return `
        <div class="glass-card collab-project-card" style="animation-delay:${idx*0.1}s">
          <div class="collab-project-header">
            <div>
              <h3 class="collab-project-title">${p.title}</h3>
              <p class="collab-project-meta">Created by <strong>${p.owner}</strong> · ${p.createdAt}</p>
            </div>
            <span class="collab-status collab-status--${p.status}">${p.status}</span>
          </div>
          <p class="collab-project-desc">${p.description}</p>
          <div class="collab-project-footer">
            <div>
              <span class="footer-label">Skills Needed:</span>
              <div class="teammate-skills">${skillTags}</div>
            </div>
            <div>
              <span class="footer-label">Team (${p.members.length}):</span>
              <div class="member-chips">${memberAvatars}</div>
            </div>
          </div>
          <div class="collab-project-actions">${actionBtn}</div>
        </div>
      `;
    }).join('');

    // Join buttons
    list.querySelectorAll('.btn-join:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        portfolioStore.sendProjectJoinRequest(id, username);
        btn.textContent = '⏳ Requested';
        btn.style.background = 'rgba(245, 159, 0, 0.1)';
        btn.style.color = '#f59f00';
        btn.style.borderColor = 'rgba(245, 159, 0, 0.3)';
        btn.style.opacity = '0.8';
        btn.style.cursor = 'not-allowed';
        btn.disabled = true;
        showToast('🎉 Join request sent successfully!');
      });
    });
  }

  renderProjects();
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
