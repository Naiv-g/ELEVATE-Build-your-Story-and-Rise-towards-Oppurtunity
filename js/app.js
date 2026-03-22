import { renderLogin } from './pages/login.js';
import { renderHome } from './pages/home.js';
import { renderProfile } from './pages/profile.js';
import { renderBuilder } from './pages/builder.js';
import { renderFindTeammates } from './pages/find-teammates.js';
import { renderCollaborate } from './pages/collaborate.js';

class ElevateApp {
  constructor() {
    this.appEl = document.getElementById('app');
    this.isLoggedIn = false;
    this.username = '';
    window.addEventListener('hashchange', () => this.route());
    window.ElevateApp = this;
    this.route();
  }

  route() {
    const hash = window.location.hash || '#/login';
    if (!this.isLoggedIn && hash !== '#/login') {
      window.location.hash = '#/login';
      return;
    }
    if (hash === '#/login') {
      this.renderPage(renderLogin((n) => this.handleLogin(n), (n) => this.handleSignup(n)));
    } else if (hash === '#/home') {
      this.renderPage(renderHome(this.username));
    } else if (hash.startsWith('#/profile/')) {
      this.renderPage(renderProfile(hash.split('/')[2], this.username));
    } else if (hash === '#/builder') {
      this.renderPage(renderBuilder(this.username));
    } else if (hash === '#/find-teammates') {
      this.renderPage(renderFindTeammates(this.username));
    } else if (hash === '#/collaborate') {
      this.renderPage(renderCollaborate(this.username));
    } else {
      window.location.hash = '#/home';
    }
  }

  renderPage(result) {
    this.appEl.innerHTML = result.html;
    if (result.init) result.init();
    window.scrollTo(0, 0);
  }

  handleLogin(name) {
    this.isLoggedIn = true;
    this.username = name || 'User';
    window.location.hash = '#/home';
  }

  handleSignup(name) {
    this.isLoggedIn = true;
    this.username = name || 'New User';
    window.location.hash = '#/builder';
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    window.location.hash = '#/login';
  }
}

document.addEventListener('DOMContentLoaded', () => { new ElevateApp(); });
