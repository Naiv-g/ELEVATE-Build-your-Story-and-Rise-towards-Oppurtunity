import { portfolioStore } from '../data.js';

export function renderNavbar(username, activePage) {
  // Theme state
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const themeIcon = isDark ? '☀️' : '🌙';
  const themeLabel = isDark ? 'Light mode' : 'Dark mode';

  const navLinks = [
    { hash: '#/home', label: '🏠 Home', id: 'home' },
    { hash: '#/find-teammates', label: '🤝 Find Teammates', id: 'find-teammates' },
    { hash: '#/collaborate', label: '⚡ Collaborate', id: 'collaborate' },
    { hash: '#/builder', label: '🚀 Build Portfolio', id: 'builder' },
  ];

  const linksHTML = navLinks.map(l => {
    const isActive = activePage === l.id ? ' nav-link--active' : '';
    return `<a href="${l.hash}" class="nav-link${isActive}">${l.label}</a>`;
  }).join('');

  // Link specific emails to their hardcoded profile
  let profileRoute = '#/home';
  if (window.ElevateApp && window.ElevateApp.profileId && ['naivaidhya', 'aarjav', 'aditya', 'devank'].includes(window.ElevateApp.profileId)) {
    profileRoute = '#/profile/' + window.ElevateApp.profileId;
  }

  // Calculate connection requests
  let myProfileId = window.ElevateApp?.profileId || username;
  const pendingRequests = portfolioStore.getConnections().filter(c => c.to === myProfileId && c.status === 'pending');
  
// Global handler for project join requests
window.acceptProjectJoin = async (projectId, reqUsername) => {
  await portfolioStore.acceptProjectJoinRequest(projectId, reqUsername);
  if (window.ElevateApp) window.ElevateApp.route();
};

  // Calculate Friend Projects
  const myFriends = new Set();
  portfolioStore.getConnections().forEach(c => {
    if (c.status === 'connected') {
       if (c.from === myProfileId || c.from === username) myFriends.add(c.to);
       if (c.to === myProfileId || c.to === username) myFriends.add(c.from);
    }
  });

  const friendProjects = portfolioStore.getCollabProjects()
    .filter(p => p.owner !== username && myFriends.has(p.owner));

  // Calculate incoming Project Join Requests
  const myProjects = portfolioStore.getCollabProjects().filter(p => p.owner === username);
  const projectJoinRequests = [];
  myProjects.forEach(p => {
    (p.joinRequests || []).forEach(reqUser => {
      projectJoinRequests.push({ projectId: p.id, projectTitle: p.title, from: reqUser });
    });
  });

  const totalNotifs = pendingRequests.length + friendProjects.length + projectJoinRequests.length;
  let seenCount = parseInt(localStorage.getItem('notifsSeenCount_' + username) || '0', 10);
  if (totalNotifs < seenCount) {
    seenCount = totalNotifs;
    localStorage.setItem('notifsSeenCount_' + username, seenCount);
  }
  const unseenCount = totalNotifs - seenCount;
  const bellBadge = unseenCount > 0 ? `<div id="bell-badge" style="position: absolute; top:-2px; right:-2px; background: #ff4d4d; color: white; border-radius: 50%; font-size: 0.6rem; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; font-weight: bold;">${unseenCount}</div>` : '';

  let notifsHTML = '';
  
  // Render Pending Connections
  if (pendingRequests.length > 0) {
    notifsHTML += pendingRequests.map(r => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 5px;">
         <span style="font-size: 0.85rem; color: #eee; margin-right: 10px;"><strong>${r.from}</strong> sent a request.</span>
         <button class="btn-primary" style="padding: 4px 10px; font-size: 0.75rem; width: auto; border-radius: 4px;" onclick="window.acceptConnection('${r.from}', '${r.to}')">Accept</button>
      </div>
    `).join('');
  }

  // Render Project Join Requests
  if (projectJoinRequests.length > 0) {
    notifsHTML += projectJoinRequests.map(r => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: rgba(81, 207, 102, 0.1); border-left: 3px solid #51cf66; border-radius: 8px; margin-bottom: 5px;">
         <span style="font-size: 0.85rem; color: #eee; margin-right: 10px;"><strong>${r.from}</strong> wants to join <em>${r.projectTitle}</em>.</span>
         <button class="btn-primary" style="padding: 4px 10px; font-size: 0.75rem; width: auto; border-radius: 4px;" onclick="window.acceptProjectJoin('${r.projectId}', '${r.from}')">Accept</button>
      </div>
    `).join('');
  }

  // Render Friend Projects
  if (friendProjects.length > 0) {
    notifsHTML += friendProjects.map(p => `
      <div style="display: flex; flex-direction: column; padding: 10px; background: rgba(255, 255, 255, 0.03); border-left: 3px solid var(--accent-purple); border-radius: 8px; margin-bottom: 5px; cursor: pointer;" onclick="window.location.hash='#/collaborate'">
         <span style="font-size: 0.8rem; color: #aaa; margin-bottom: 3px;">Project Alert</span>
         <span style="font-size: 0.85rem; color: #eee;"><strong>${p.owner}</strong> started a new project: <em>${p.title}</em></span>
      </div>
    `).join('');
  }

  if (totalNotifs === 0) {
    notifsHTML = '<div style="padding: 10px; font-size: 0.85rem; color: #888; text-align: center;">No new notifications</div>';
  }

  return `
    <nav class="navbar" id="main-navbar">
      <div class="navbar-logo" onclick="window.location.hash='#/home'">Elevate</div>
      <div class="navbar-links">${linksHTML}</div>
      <div class="navbar-actions" style="display: flex; align-items: center; gap: 1rem;">
        
        <div style="position: relative; display: inline-block;">
          <button style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 10px; cursor: pointer; color: white; position: relative;" 
            onclick="
              document.getElementById('notif-dropdown').classList.toggle('hidden');
              const badge = document.getElementById('bell-badge');
              if (badge) badge.style.display = 'none';
              localStorage.setItem('notifsSeenCount_${username}', '${totalNotifs}');
            ">
            🔔
            ${bellBadge}
          </button>
          
          <div id="notif-dropdown" class="hidden" style="position: absolute; top: 120%; right: 0; width: 280px; background: var(--bg-secondary); backdrop-filter: blur(10px); border: 1px solid var(--border-glass); border-radius: 12px; padding: 12px; box-shadow: var(--shadow-lg); z-index: 1000; display: flex; flex-direction: column; gap: 5px;">
             <div style="font-size: 0.9rem; font-weight: 600; color: white; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">Notifications</div>
             ${notifsHTML}
          </div>
        </div>

        <button class="theme-toggle" id="theme-toggle-btn" onclick="window.toggleTheme()" title="${themeLabel}">${themeIcon}</button>
        <button class="navbar-user" onclick="window.location.hash='${profileRoute}'" title="View Profile">
          <span>👋</span>
          <span>${username || 'User'}</span>
        </button>
        <button class="btn-logout" id="btn-logout" onclick="window.ElevateApp.logout()">Logout</button>
      </div>
    </nav>
  `;
}

// Global theme toggle — defined outside renderNavbar so it persists between re-renders
window.toggleTheme = function() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const btn = document.getElementById('theme-toggle-btn');
  if (isDark) {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('elevate-theme', 'light');
    if (btn) { btn.textContent = '🌙'; btn.title = 'Dark mode'; }
  } else {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('elevate-theme', 'dark');
    if (btn) { btn.textContent = '☀️'; btn.title = 'Light mode'; }
  }
};

