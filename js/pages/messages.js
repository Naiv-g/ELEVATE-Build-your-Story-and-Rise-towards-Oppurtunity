import { portfolioStore } from '../data.js';
import { renderNavbar } from '../components/navbar.js';

// Module-level state
let currentRoomId = null;
let pollInterval = null;

// ---- Unread tracking helpers ----
function getSeenCount(roomId) {
  return parseInt(localStorage.getItem('msg_seen_' + roomId) || '0', 10);
}
function setSeenCount(roomId, count) {
  localStorage.setItem('msg_seen_' + roomId, count);
}
function recalcTotalUnread() {
  const rooms = JSON.parse(localStorage.getItem('elevate_msg_rooms') || '[]');
  // Can't reload from Supabase here — we just sum what we know from cached seen vs stored counts
  // Total is updated by background poll in app.js; here we just zero out the current room
}
function registerRoom(roomId) {
  const rooms = JSON.parse(localStorage.getItem('elevate_msg_rooms') || '[]');
  if (!rooms.includes(roomId)) {
    rooms.push(roomId);
    localStorage.setItem('elevate_msg_rooms', JSON.stringify(rooms));
  }
}
function updateNavMsgBadge() {
  const total = parseInt(localStorage.getItem('elevate_msg_unread') || '0', 10);
  const badge = document.getElementById('msg-nav-badge');
  if (badge) {
    badge.textContent = total > 0 ? total : '';
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}

export function renderMessages(username) {
  const myProfileId = window.ElevateApp?.profileId || username;

  // Connected friends for DMs
  const connections = portfolioStore.getConnections().filter(c =>
    c.status === 'connected' && (c.from === myProfileId || c.to === myProfileId)
  );
  const connectedFriends = connections.map(c =>
    c.from === myProfileId ? c.to : c.from
  );

  // Projects the user owns or is a member of
  const myProjects = portfolioStore.getCollabProjects().filter(p =>
    p.owner === username || p.members.includes(username)
  );

  const friendListHTML = connectedFriends.length === 0
    ? '<div class="sidebar-empty">Connect with people to start a DM</div>'
    : connectedFriends.map(friend => `
        <div class="chat-item" data-room-id="${portfolioStore.getDMRoomId(myProfileId, friend)}" data-room-name="${friend}" data-room-type="dm">
          <div class="chat-item-avatar">${friend[0].toUpperCase()}</div>
          <div class="chat-item-info">
            <div class="chat-item-name">${friend}</div>
            <div class="chat-item-preview">Direct Message</div>
          </div>
        </div>
      `).join('');

  const projectListHTML = myProjects.length === 0
    ? '<div class="sidebar-empty">Join a project to access team chat</div>'
    : myProjects.map(p => `
        <div class="chat-item" data-room-id="proj_${p.id}" data-room-name="${p.title}" data-room-type="project">
          <div class="chat-item-avatar proj">⚡</div>
          <div class="chat-item-info">
            <div class="chat-item-name">${p.title}</div>
            <div class="chat-item-preview">${p.members.length} member${p.members.length !== 1 ? 's' : ''}</div>
          </div>
        </div>
      `).join('');

  const html = `
    ${renderNavbar(username, 'messages')}
    <div class="bg-orbs">
      <div class="bg-orb bg-orb--1"></div>
      <div class="bg-orb bg-orb--2"></div>
      <div class="bg-orb bg-orb--3"></div>
    </div>
    <div class="messages-page page">
      <div class="messages-container">

        <!-- Sidebar -->
        <div class="messages-sidebar glass-card">
          <div class="sidebar-header">
            <div class="sidebar-title">💬 Messages</div>
          </div>
          <div class="sidebar-body">
            <div class="sidebar-section-label">Direct Messages</div>
            ${friendListHTML}
            <div class="sidebar-section-label">Project Chats</div>
            ${projectListHTML}
          </div>
        </div>

        <!-- Chat Area -->
        <div class="chat-area glass-card">
          <div class="chat-empty-state" id="chat-empty">
            <div class="chat-empty-icon">💬</div>
            <h3>Select a conversation</h3>
            <p>Pick a friend for a DM, or a project for team chat</p>
          </div>

          <div class="chat-content hidden" id="chat-content">
            <div class="chat-header">
              <div class="chat-header-avatar" id="chat-header-avatar">?</div>
              <div>
                <div class="chat-header-name" id="chat-header-name"></div>
                <div class="chat-header-sub" id="chat-header-sub"></div>
              </div>
            </div>

            <div class="chat-messages" id="chat-messages">
              <div class="no-messages">Loading…</div>
            </div>

            <div class="chat-input-area">
              <input type="text" class="chat-input" id="chat-input" placeholder="Type a message and hit Enter…" autocomplete="off" />
              <button class="chat-send-btn" id="chat-send-btn">Send ➤</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  return { html, init: () => initMessages(username) };
}

function initMessages(username) {
  // Clear any old poll
  if (pollInterval) { clearInterval(pollInterval); pollInterval = null; }
  currentRoomId = null;

  document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      openChat(item.dataset.roomId, item.dataset.roomName, item.dataset.roomType, username);
    });
  });
}

async function openChat(roomId, roomName, roomType, username) {
  currentRoomId = roomId;

  // Show chat panel
  document.getElementById('chat-empty').classList.add('hidden');
  const content = document.getElementById('chat-content');
  content.classList.remove('hidden');

  // Header
  const avatarEl = document.getElementById('chat-header-avatar');
  avatarEl.textContent = roomType === 'project' ? '⚡' : roomName[0].toUpperCase();
  avatarEl.style.background = roomType === 'project' ? 'var(--gradient-cool)' : 'var(--gradient-primary)';
  document.getElementById('chat-header-name').textContent = roomName;
  document.getElementById('chat-header-sub').textContent =
    roomType === 'project' ? 'Project Team Chat' : 'Direct Message';

  // Load messages
  await loadAndRenderMessages(roomId, username);

  // Poll every 5s
  if (pollInterval) clearInterval(pollInterval);
  pollInterval = setInterval(() => {
    if (currentRoomId === roomId) loadAndRenderMessages(roomId, username);
  }, 5000);

  // Wire send — clone to remove old listeners
  const oldInput = document.getElementById('chat-input');
  const oldBtn   = document.getElementById('chat-send-btn');
  const newInput = oldInput.cloneNode(true);
  const newBtn   = oldBtn.cloneNode(true);
  oldInput.replaceWith(newInput);
  oldBtn.replaceWith(newBtn);

  const doSend = async () => {
    const text = newInput.value.trim();
    if (!text) return;
    newBtn.disabled = true;
    newInput.value = '';
    await portfolioStore.sendMessage(roomId, username, text);
    await loadAndRenderMessages(roomId, username);
    newBtn.disabled = false;
    newInput.focus();
  };

  newInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSend(); });
  newBtn.addEventListener('click', doSend);
  newInput.focus();
}

async function loadAndRenderMessages(roomId, username) {
  const msgs = await portfolioStore.loadMessages(roomId);
  const container = document.getElementById('chat-messages');
  if (!container || currentRoomId !== roomId) return;

  // Register room so background poll can track it
  registerRoom(roomId);

  // Mark as seen — user is actively viewing this room
  const prevSeen = getSeenCount(roomId);
  if (msgs.length > prevSeen) {
    const newMsgs = msgs.length - prevSeen;
    const currentTotal = parseInt(localStorage.getItem('elevate_msg_unread') || '0', 10);
    localStorage.setItem('elevate_msg_unread', Math.max(0, currentTotal - newMsgs));
  }
  setSeenCount(roomId, msgs.length);
  updateNavMsgBadge();

  if (msgs.length === 0) {
    container.innerHTML = '<div class="no-messages">No messages yet — say hello! 👋</div>';
    return;
  }

  container.innerHTML = msgs.map(m => `
    <div class="message-bubble ${m.sender === username ? 'message-mine' : 'message-theirs'}">
      ${m.sender !== username ? `<div class="message-sender">${escapeHtml(m.sender)}</div>` : ''}
      <div class="message-text">${escapeHtml(m.text)}</div>
      <div class="message-time">${formatTime(m.timestamp)}</div>
    </div>
  `).join('');

  container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function formatTime(iso) {
  const d = new Date(iso);
  const diff = Date.now() - d;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}
