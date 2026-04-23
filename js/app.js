import { renderLogin } from './pages/login.js';
import { renderHome } from './pages/home.js';
import { renderProfile } from './pages/profile.js';
import { renderBuilder } from './pages/builder.js';
import { renderFindTeammates } from './pages/find-teammates.js';
import { renderCollaborate } from './pages/collaborate.js';
import { portfolioStore, supabase } from './data.js';

class ElevateApp {
  constructor() {
    this.appEl = document.getElementById('app');
    this.isLoggedIn = false;
    this.username = '';
    window.addEventListener('hashchange', () => this.route());
    window.ElevateApp = this;

    // Restore saved theme preference immediately (no flash)
    const savedTheme = localStorage.getItem('elevate-theme');
    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme'); // light is default
    }

    // Check existing session
    this.initAuth();
  }

  async initAuth() {
    const EMAIL_TO_PROFILE_ID = {
      'naivaidhyag@gmail.com': 'naivaidhya',
      'aarjavjain2210@gmail.com': 'aarjav',
      'adityarawatar01@gmail.com': 'aditya',
      'devankjoshi17@gmail.com': 'devank'
    };

    const { data } = await supabase.auth.getSession();
    if (data.session) {
      this.isLoggedIn = true;
      this.email = data.session.user.email;
      this.username = data.session.user.user_metadata?.full_name || data.session.user.email.split('@')[0];
      this.profileId = EMAIL_TO_PROFILE_ID[this.email] || this.username;
    }
    
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.isLoggedIn = true;
        this.email = session.user.email;
        this.username = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
        this.profileId = EMAIL_TO_PROFILE_ID[this.email] || this.username;
      } else {
        this.isLoggedIn = false;
        this.email = '';
        this.username = '';
        this.profileId = '';
        if (window.location.hash !== '#/login') {
          window.location.hash = '#/login';
        }
      }
    });

    this.route();
  }

  async route() {
    const hash = window.location.hash || '#/login';
    if (!this.isLoggedIn && hash !== '#/login') {
      window.location.hash = '#/login';
      return;
    }

    if (hash !== '#/login') {
      this.appEl.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;color:#fff;font-size:1.5rem;">Loading data...</div>';
      await portfolioStore.fetchFromSupabase();
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

  async logout() {
    await supabase.auth.signOut();
    this.isLoggedIn = false;
    this.username = '';
    window.location.hash = '#/login';
  }
}

document.addEventListener('DOMContentLoaded', () => { new ElevateApp(); });
