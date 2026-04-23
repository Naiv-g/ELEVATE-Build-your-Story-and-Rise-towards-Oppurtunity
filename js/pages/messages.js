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
  // Get the definitive canonical ID for myself
  const myCanonical = portfolioStore.getCanonicalId(myProfileId) || portfolioStore.getCanonicalId(username);

  // All known ways to identify me
  const myIds = new Set([
    username, myProfileId, myCanonical,
    username.toLowerCase(), myProfileId.toLowerCase(), myCanonical.toLowerCase()
  ]);

  // Find all connected relationships, normalizing each side
  const connections = portfolioStore.getConnections().filter(c => {
    if (c.status !== 'connected') return false;
    const fromCan = portfolioStore.getCanonicalId(c.from);
    const toCan   = portfolioStore.getCanonicalId(c.to);
    return myIds.has(fromCan) || myIds.has(toCan) || myIds.has(c.from) || myIds.has(c.to);
  });

  // Resolve friend to canonical ID, deduplicate
  const friendSet = new Set();
  connections.forEach(c => {
    const fromCan = portfolioStore.getCanonicalId(c.from);
    const toCan   = portfolioStore.getCanonicalId(c.to);
    const isMe = myIds.has(fromCan) || myIds.has(c.from);
    const friend = isMe ? toCan : fromCan;
    if (friend && !myIds.has(friend)) friendSet.add(friend);
  });
  const connectedFriends = [...friendSet];

  // Projects (check both ids)
  const myProjects = portfolioStore.getCollabProjects().filter(p =>
    myIds.has(p.owner) || myIds.has(portfolioStore.getCanonicalId(p.owner)) ||
    p.members.some(m => myIds.has(m) || myIds.has(portfolioStore.getCanonicalId(m)))
  );

  // Build myIds including canonical for message alignment
  const myIdsForMsgs = new Set([...myIds, myCanonical]);

  const friendListHTML = connectedFriends.length === 0
    ? '<div class="sidebar-empty">Connect with people to start a DM</div>'
    : connectedFriends.map(friend => {
        const displayName = portfolioStore.getDisplayName(friend);
        const roomId = portfolioStore.getDMRoomId(myCanonical, friend);
        return `
          <div class="chat-item" data-room-id="${roomId}" data-room-name="${displayName}" data-room-type="dm" data-friend-id="${friend}">
            <div class="chat-item-avatar">${displayName[0].toUpperCase()}</div>
            <div class="chat-item-info">
              <div class="chat-item-name">${displayName}</div>
              <div class="chat-item-preview">Direct Message</div>
            </div>
          </div>
        `;
      }).join('');


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
        <div class="messages-sidebar glass-card">
          <div class="sidebar-header"><div class="sidebar-title">💬 Messages</div></div>
          <div class="sidebar-body">
            <div class="sidebar-section-label">Direct Messages</div>
            ${friendListHTML}
            <div class="sidebar-section-label">Project Chats</div>
            ${projectListHTML}
          </div>
        </div>
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

  return { html, init: () => initMessages(myCanonical, myIdsForMsgs) };
}

function initMessages(myCanonical, myIds) {
  if (pollInterval) { clearInterval(pollInterval); pollInterval = null; }
  currentRoomId = null;
  document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      openChat(item.dataset.roomId, item.dataset.roomName, item.dataset.roomType, myCanonical, myIds);
    });
  });
}



async function openChat(roomId, roomName, roomType, myProfileId, myIds) {
  currentRoomId = roomId;

  document.getElementById('chat-empty').classList.add('hidden');
  document.getElementById('chat-content').classList.remove('hidden');

  const avatarEl = document.getElementById('chat-header-avatar');
  avatarEl.textContent = roomType === 'project' ? '⚡' : roomName[0].toUpperCase();
  avatarEl.style.background = roomType === 'project' ? 'var(--gradient-cool)' : 'var(--gradient-primary)';
  document.getElementById('chat-header-name').textContent = roomName;
  document.getElementById('chat-header-sub').textContent =
    roomType === 'project' ? 'Project Team Chat' : 'Direct Message';

  await loadAndRenderMessages(roomId, myProfileId, myIds);

  if (pollInterval) clearInterval(pollInterval);
  pollInterval = setInterval(() => {
    if (currentRoomId === roomId) loadAndRenderMessages(roomId, myProfileId, myIds);
  }, 4000);

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
    await portfolioStore.sendMessage(roomId, myProfileId, text);
    await loadAndRenderMessages(roomId, myProfileId, myIds);
    newBtn.disabled = false;
    newInput.focus();
  };

  newInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSend(); });
  newBtn.addEventListener('click', doSend);
  newInput.focus();
}

async function loadAndRenderMessages(roomId, myProfileId, myIds) {
  const msgs = await portfolioStore.loadMessages(roomId);
  const container = document.getElementById('chat-messages');
  if (!container || currentRoomId !== roomId) return;

  registerRoom(roomId);

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

  container.innerHTML = msgs.map(m => {
    // "Mine" if sender matches any of my known identities (case-insensitive)
    const isMine = myIds.has(m.sender) || myIds.has(m.sender.toLowerCase());
    const senderName = portfolioStore.getDisplayName(m.sender);
    return `
      <div class="message-bubble ${isMine ? 'message-mine' : 'message-theirs'}">
        ${!isMine ? `<div class="message-sender">${escapeHtml(senderName)}</div>` : ''}
        <div class="message-text">${escapeHtml(m.text)}</div>
        <div class="message-time">${formatTime(m.timestamp)}</div>
      </div>
    `;
  }).join('');

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
