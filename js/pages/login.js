export function renderLogin(onLogin, onSignup) {
  const html = `
    <div class="login-page page">
      <div class="bg-orbs">
        <div class="bg-orb bg-orb--1"></div>
        <div class="bg-orb bg-orb--2"></div>
        <div class="bg-orb bg-orb--3"></div>
      </div>
      <div class="login-brand">
        <div class="brand-content">
          <div class="brand-logo">Elevate</div>
          <p class="brand-tagline">Connect with like-minded students. Build portfolios. Collaborate on projects that matter.</p>
          <div class="brand-features">
            <div class="brand-feature">
              <div class="brand-feature-icon">🚀</div>
              <div class="brand-feature-text"><strong>Build Your Portfolio</strong>Create stunning portfolios with our templates</div>
            </div>
            <div class="brand-feature">
              <div class="brand-feature-icon">🤝</div>
              <div class="brand-feature-text"><strong>Find Teammates</strong>Match with developers who complement your skills</div>
            </div>
            <div class="brand-feature">
              <div class="brand-feature-icon">⚡</div>
              <div class="brand-feature-text"><strong>Collaborate in Real-time</strong>Work together on projects with live workflows</div>
            </div>
          </div>
        </div>
      </div>
      <div class="login-form-side">
        <div class="login-form-container">
          <h2 class="login-form-title" id="auth-title">Welcome back</h2>
          <p class="login-form-subtitle" id="auth-subtitle">Log in to your Elevate account</p>

          <div class="auth-tabs">
            <button class="auth-tab active" id="tab-login" data-tab="login">Log In</button>
            <button class="auth-tab" id="tab-signup" data-tab="signup">Sign Up</button>
          </div>

          <!-- Login Form -->
          <form id="login-form">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="login-email" placeholder="your@email.com" required>
              <div class="input-glow"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required>
              <div class="input-glow"></div>
            </div>
            <button type="submit" class="btn-primary" id="btn-login">Log In →</button>
          </form>

          <!-- Signup Form -->
          <form id="signup-form" class="hidden">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="signup-name" placeholder="Your full name" required>
              <div class="input-glow"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="signup-email" placeholder="your@email.com" required>
              <div class="input-glow"></div>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="signup-password" placeholder="Create a password" required>
              <div class="input-glow"></div>
            </div>
            <button type="submit" class="btn-primary" id="btn-signup">Create Account →</button>
          </form>

          <div class="form-divider">or continue with</div>
          <div class="social-buttons">
            <button class="btn-social">🐙 <span>GitHub</span></button>
            <button class="btn-social">🔗 <span>Google</span></button>
          </div>
        </div>
      </div>
    </div>
  `;
  return { html, init: () => initLoginEvents(onLogin, onSignup) };
}

function initLoginEvents(onLogin, onSignup) {
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const authTitle = document.getElementById('auth-title');
  const authSubtitle = document.getElementById('auth-subtitle');

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    authTitle.textContent = 'Welcome back';
    authSubtitle.textContent = 'Log in to your Elevate account';
  });

  tabSignup.addEventListener('click', () => {
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    authTitle.textContent = 'Join Elevate';
    authSubtitle.textContent = 'Create your account and start building';
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRipple(e);
    const email = document.getElementById('login-email').value;
    setTimeout(() => onLogin(email.split('@')[0] || 'User'), 400);
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addRipple(e);
    const name = document.getElementById('signup-name').value;
    setTimeout(() => onSignup(name), 400);
  });

  // Ripple on buttons
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', addRipple);
  });
}

function addRipple(e) {
  const btn = e.currentTarget || e.target.closest('.btn-primary');
  if (!btn) return;
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}
