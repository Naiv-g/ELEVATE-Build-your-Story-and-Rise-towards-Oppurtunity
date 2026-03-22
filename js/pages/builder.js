import { renderNavbar } from '../components/navbar.js';
import { portfolioStore } from '../data.js';

export function renderBuilder(username) {
  const html = `
    ${renderNavbar(username, 'builder')}
    <div class="bg-orbs">
      <div class="bg-orb bg-orb--1"></div>
      <div class="bg-orb bg-orb--2"></div>
      <div class="bg-orb bg-orb--3"></div>
    </div>
    <div class="builder-page page">
      <button class="btn-back" onclick="window.location.hash='#/home'">← Back to Home</button>
      <div class="builder-header">
        <h1>Build Your <span class="gradient-text">Portfolio</span></h1>
        <p>Fill in your details and we'll generate a beautiful portfolio from our template. Once published, it will be visible to <strong>everyone</strong> on Elevate!</p>
      </div>

      <div class="builder-steps" id="builder-steps">
        <div class="builder-step"><div class="step-circle active" id="step-1">1</div><span class="step-label active">Your Info</span></div>
        <div class="step-connector" id="conn-1"></div>
        <div class="builder-step"><div class="step-circle" id="step-2">2</div><span class="step-label">Skills & Projects</span></div>
        <div class="step-connector" id="conn-2"></div>
        <div class="builder-step"><div class="step-circle" id="step-3">3</div><span class="step-label">Preview & Publish</span></div>
      </div>

      <!-- Step 1 -->
      <div id="builder-step-1">
        <div class="glass-card builder-form">
          <div class="builder-form-grid">
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" id="pf-name" placeholder="Your full name" value="${username || ''}"></div>
            <div class="form-group"><label class="form-label">Role / Title</label><input type="text" class="form-input" id="pf-role" placeholder="e.g. Frontend Developer"></div>
            <div class="form-group full-width"><label class="form-label">Bio</label><textarea class="form-textarea" id="pf-bio" placeholder="Tell us about yourself, your interests, and what drives you..."></textarea></div>
            <div class="form-group"><label class="form-label">GitHub URL</label><input type="text" class="form-input" id="pf-github" placeholder="https://github.com/username"></div>
            <div class="form-group"><label class="form-label">LinkedIn URL</label><input type="text" class="form-input" id="pf-linkedin" placeholder="https://linkedin.com/in/username"></div>
          </div>
        </div>
        <div class="builder-nav"><div></div><button class="btn-primary" style="width:auto;padding:12px 32px;" id="btn-next-1">Next Step →</button></div>
      </div>

      <!-- Step 2 -->
      <div id="builder-step-2" class="hidden">
        <div class="glass-card builder-form">
          <div class="builder-form-grid">
            <div class="form-group full-width"><label class="form-label">Skills (press Enter to add)</label><div class="skills-input-container" id="skills-container"><input type="text" class="skills-input" id="skills-input" placeholder="e.g. React, Python, Figma..."></div></div>
            <div class="form-group full-width"><label class="form-label">Project 1 — Name</label><input type="text" class="form-input" id="pf-proj1-name" placeholder="Project name"></div>
            <div class="form-group full-width"><label class="form-label">Project 1 — Description</label><textarea class="form-textarea" id="pf-proj1-desc" placeholder="What does this project do?"></textarea></div>
            <div class="form-group full-width"><label class="form-label">Project 2 — Name (optional)</label><input type="text" class="form-input" id="pf-proj2-name" placeholder="Another project name"></div>
            <div class="form-group full-width"><label class="form-label">Project 2 — Description</label><textarea class="form-textarea" id="pf-proj2-desc" placeholder="Describe this project..."></textarea></div>
          </div>
        </div>
        <div class="builder-nav"><button class="btn-secondary" id="btn-prev-2">← Previous</button><button class="btn-primary" style="width:auto;padding:12px 32px;" id="btn-next-2">Preview Portfolio →</button></div>
      </div>

      <!-- Step 3 -->
      <div id="builder-step-3" class="hidden">
        <div class="glass-card portfolio-preview">
          <span class="preview-badge">✨ Live Preview — Modern Minimal Template</span>
          <div class="tpl-modern" id="portfolio-preview-content"></div>
        </div>
        <div class="builder-nav"><button class="btn-secondary" id="btn-prev-3">← Edit Details</button><button class="btn-primary" style="width:auto;padding:12px 32px;" id="btn-publish">🚀 Publish Portfolio</button></div>
      </div>

      <!-- Success -->
      <div id="builder-success" class="hidden">
        <div class="glass-card">
          <div class="success-container">
            <div class="success-icon">✓</div>
            <h2>Portfolio Published! 🎉</h2>
            <p>Your portfolio is now live and visible to everyone on Elevate.</p>
            <div class="success-share-box" id="success-share-box"></div>
            <div style="display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
              <button class="btn-primary" style="width:auto;padding:12px 32px;" id="btn-view-portfolio">View My Portfolio →</button>
              <button class="btn-secondary" onclick="window.location.hash='#/home'">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return { html, init: () => initBuilderEvents(username) };
}

let userSkills = [];
let publishedId = null;

function initBuilderEvents(username) {
  userSkills = [];
  publishedId = null;
  const step1 = document.getElementById('builder-step-1');
  const step2 = document.getElementById('builder-step-2');
  const step3 = document.getElementById('builder-step-3');
  const success = document.getElementById('builder-success');

  document.getElementById('btn-next-1').addEventListener('click', () => goToStep(2, step1, step2, step3));
  document.getElementById('btn-prev-2').addEventListener('click', () => goToStep(1, step1, step2, step3));
  document.getElementById('btn-next-2').addEventListener('click', () => { generatePreview(); goToStep(3, step1, step2, step3); });
  document.getElementById('btn-prev-3').addEventListener('click', () => goToStep(2, step1, step2, step3));

  document.getElementById('btn-publish').addEventListener('click', () => {
    const portfolio = buildPortfolioData(username);
    portfolioStore.addPortfolio(portfolio);
    publishedId = portfolio.id;
    step3.classList.add('hidden');
    success.classList.remove('hidden');

    const shareURL = `${window.location.origin}${window.location.pathname}#/profile/${portfolio.id}`;
    document.getElementById('success-share-box').innerHTML = `
      <div class="share-link-box">
        <span class="share-label">📋 Your shareable link:</span>
        <div class="share-link-row">
          <input type="text" class="form-input share-url-input" value="${shareURL}" readonly id="share-url-input">
          <button class="btn-primary" style="width:auto;padding:10px 18px;font-size:0.85rem;" id="btn-copy-link">Copy</button>
        </div>
      </div>
    `;
    document.getElementById('btn-copy-link').addEventListener('click', () => {
      document.getElementById('share-url-input').select();
      navigator.clipboard.writeText(shareURL).then(() => showToast('📋 Link copied!')).catch(()=>{});
    });
    document.getElementById('btn-view-portfolio').addEventListener('click', () => {
      window.location.hash = `#/profile/${portfolio.id}`;
    });
    showToast('🎉 Portfolio published successfully!');
  });

  // Skills input
  const skillsInput = document.getElementById('skills-input');
  const skillsContainer = document.getElementById('skills-container');
  skillsInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = skillsInput.value.trim();
      if (val && !userSkills.includes(val)) {
        userSkills.push(val);
        const colors = ['purple', 'cyan', 'pink', 'amber', 'green'];
        const color = colors[userSkills.length % colors.length];
        const tag = document.createElement('span');
        tag.className = `skill-tag skill-tag--${color}`;
        tag.innerHTML = `${val} <span class="remove-skill" data-skill="${val}">✕</span>`;
        skillsContainer.insertBefore(tag, skillsInput);
        skillsInput.value = '';
        tag.querySelector('.remove-skill').addEventListener('click', () => {
          userSkills = userSkills.filter(s => s !== val);
          tag.remove();
        });
      }
    }
  });
  skillsContainer.addEventListener('click', () => skillsInput.focus());
}

function buildPortfolioData(username) {
  const name = document.getElementById('pf-name').value || username || 'New User';
  const role = document.getElementById('pf-role').value || 'Developer';
  const bio = document.getElementById('pf-bio').value || 'A passionate developer ready to make an impact.';
  const github = document.getElementById('pf-github').value || '#';
  const linkedin = document.getElementById('pf-linkedin').value || '#';
  const id = 'user_' + name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now();

  const skills = userSkills.map((s, i) => ({ name: s, level: 70 + Math.floor(Math.random() * 25) }));
  const colors = ['purple', 'cyan', 'pink', 'amber', 'green'];

  const projects = [];
  const p1Name = document.getElementById('pf-proj1-name').value;
  const p1Desc = document.getElementById('pf-proj1-desc').value;
  if (p1Name) projects.push({ name: p1Name, description: p1Desc || 'No description.', status: 'active', techStack: userSkills.slice(0, 3) });
  const p2Name = document.getElementById('pf-proj2-name').value;
  const p2Desc = document.getElementById('pf-proj2-desc').value;
  if (p2Name) projects.push({ name: p2Name, description: p2Desc || 'No description.', status: 'active', techStack: userSkills.slice(0, 3) });

  return {
    id, name, role, bio,
    shortBio: bio.substring(0, 80) + (bio.length > 80 ? '...' : ''),
    skills, projects,
    topSkills: userSkills.slice(0, 3),
    skillColors: userSkills.slice(0, 3).map((_, i) => colors[i % colors.length]),
    socials: { github, linkedin },
    avatar: null,
    isTeam: false
  };
}

function goToStep(step, s1, s2, s3) {
  s1.classList.add('hidden'); s2.classList.add('hidden'); s3.classList.add('hidden');
  if (step === 1) s1.classList.remove('hidden');
  if (step === 2) s2.classList.remove('hidden');
  if (step === 3) s3.classList.remove('hidden');
  for (let i = 1; i <= 3; i++) {
    const circle = document.getElementById(`step-${i}`);
    const label = circle.nextElementSibling;
    circle.classList.remove('active', 'completed'); label.classList.remove('active');
    if (i < step) { circle.classList.add('completed'); circle.textContent = '✓'; }
    else if (i === step) { circle.classList.add('active'); label.classList.add('active'); circle.textContent = i; }
    else { circle.textContent = i; }
  }
  for (let i = 1; i <= 2; i++) {
    document.getElementById(`conn-${i}`).classList.toggle('completed', i < step);
  }
}

function generatePreview() {
  const name = document.getElementById('pf-name').value || 'Your Name';
  const role = document.getElementById('pf-role').value || 'Your Role';
  const bio = document.getElementById('pf-bio').value || 'A passionate developer.';
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  const skillTags = userSkills.map(s => `<span class="skill-tag skill-tag--purple">${s}</span>`).join('') || '<span class="skill-tag skill-tag--purple">Add skills in step 2</span>';

  let projectsHTML = '';
  const p1 = document.getElementById('pf-proj1-name').value;
  const p1d = document.getElementById('pf-proj1-desc').value;
  const p2 = document.getElementById('pf-proj2-name').value;
  const p2d = document.getElementById('pf-proj2-desc').value;
  if (p1) projectsHTML += `<div class="tpl-project"><div class="tpl-project-name">${p1}</div><div class="tpl-project-desc">${p1d || 'No description.'}</div></div>`;
  if (p2) projectsHTML += `<div class="tpl-project"><div class="tpl-project-name">${p2}</div><div class="tpl-project-desc">${p2d || 'No description.'}</div></div>`;
  if (!projectsHTML) projectsHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">No projects added yet.</p>';

  document.getElementById('portfolio-preview-content').innerHTML = `
    <div class="tpl-modern-header">
      <div class="tpl-avatar-placeholder">${initials}</div>
      <div><div class="tpl-name">${name}</div><div class="tpl-role">${role}</div><div class="tpl-bio">${bio}</div></div>
    </div>
    <div class="tpl-section-title">Skills</div>
    <div class="tpl-skills-list">${skillTags}</div>
    <div class="tpl-section-title">Projects</div>
    ${projectsHTML}
  `;
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
