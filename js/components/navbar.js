export function renderNavbar(username, activePage) {
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

  return `
    <nav class="navbar" id="main-navbar">
      <div class="navbar-logo" onclick="window.location.hash='#/home'">Elevate</div>
      <div class="navbar-links">${linksHTML}</div>
      <div class="navbar-actions">
        <button class="navbar-user" onclick="window.location.hash='#/home'">
          <span>👋</span>
          <span>${username || 'User'}</span>
        </button>
        <button class="btn-logout" id="btn-logout" onclick="window.ElevateApp.logout()">Logout</button>
      </div>
    </nav>
  `;
}
