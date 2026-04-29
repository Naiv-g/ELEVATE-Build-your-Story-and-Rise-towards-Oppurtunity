<div align="center">
  <h1>🚀 ELEVATE</h1>
  <h3>Build Your Story, Rise Towards Opportunity</h3>
  <p>A student networking and collaboration platform — no frameworks, no shortcuts, built from scratch.</p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
    <img src="https://img.shields.io/badge/JavaScript_ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
  </p>

  <p><strong>🌐 Live at: <a href="https://elevate-platform-lyart.vercel.app">https://elevate-platform-lyart.vercel.app</a></strong></p>
</div>

---

## Why We Built This

We are four B.Tech students at Graphic Era University, and we kept running into the same problem — when we wanted to form a team for a hackathon or a course project, there was no good place to find people with the right skills. LinkedIn felt too formal. GitHub had no discovery. Spreadsheets and WhatsApp groups were messy.

So we built ELEVATE. It's a platform where students can put up a proper portfolio (not just a list of courses), connect with peers, post collaboration projects, and now — message each other directly.

We deliberately chose to write the whole thing in Vanilla JavaScript with no framework. Not because we don't know React, but because we wanted to actually understand what's happening under the hood — how the DOM works, how async requests flow, how a router works without a library doing it for you.

---

## What It Does

**🔐 Authentication**
Sign up with an email and password, log back in and your session is restored automatically. Supabase handles the JWT token management so we don't have to.

**👤 Portfolio Builder**
Each user gets a builder page where they fill in their name, role, short bio, skills with proficiency levels, past projects with tech stacks, education, and work experience. Once saved, this becomes your public profile visible to everyone on the platform.

**🔍 Find Teammates**
A searchable grid of every registered user. Filter by skill tags — click "Python" and see everyone who listed Python as a skill. Send a connection request from the grid or from someone's profile page. The button updates in real time to show the current status (Sent / Connected / Request Received).

**💼 Collaborate**
Project owners post open opportunities here — a project title, description, required skills, and how many people they're looking for. Anyone can send a join request. The owner can accept or reject it. Once you're in, your name shows up in the project member list.

**💬 Messaging**
This was the big Phase 3 addition. Two types of conversations:
- **Direct Messages** between any two connected users
- **Project Team Chat** for every project — all accepted members can talk here, no extra setup needed

Messages persist in Supabase and update every 4 seconds in the open chat. There's also a background check every 30 seconds that updates the unread badge on the nav so you know when someone messaged you without having to open the app.

**🔔 Notifications**
The bell icon in the navbar tracks pending connection requests and project join requests. The count updates every time you navigate to a new page.

**🌗 Light & Dark Mode**
We added a full theme system using CSS custom properties. Every color in the app references a variable, so switching between light and dark is just toggling an attribute on the body. The preference is saved in localStorage so it sticks between sessions.

---

## Database (Supabase)

Five tables power the backend:

| Table | What it stores |
|---|---|
| `auth.users` | Managed by Supabase — passwords, emails, JWT sessions |
| `profiles` | Public user portfolios (skills, projects, bio, etc.) |
| `connections` | Connection requests and their status (pending / connected) |
| `projects` | Collaboration project listings and member lists |
| `messages` | Chat room message history, keyed by room ID |

All custom tables use a `TEXT` primary key and a `JSONB` data column. This kept things simple — no schema migrations when we needed to add a new field, just update the object being saved.

---

## Project Structure

```
ELEVATE/
├── index.html                  the single HTML file the browser ever loads
├── vercel.json                 tells Vercel to serve index.html for all routes
├── README.md
│
├── css/
│   ├── styles.css              CSS variables, global resets, theme system, animations
│   ├── home.css
│   ├── login.css
│   ├── features.css            find-teammates + collaborate shared styles
│   ├── builder.css
│   ├── profile.css
│   └── messages.css            sidebar, chat bubbles, input area
│
└── js/
    ├── app.js                  the main app class — router, auth, theme init, bg polling
    ├── data.js                 PortfolioStore — all Supabase queries live here
    ├── components/
    │   └── navbar.js           nav bar, notification bell, message badge, theme toggle
    └── pages/
        ├── login.js
        ├── home.js
        ├── profile.js
        ├── builder.js
        ├── find-teammates.js
        ├── collaborate.js
        └── messages.js         DM + project team chat, polling logic
```

---

## How the SPA Routing Works

The whole app converges in one HTML file. Navigation happens through URL hashes — clicking "Messages" changes the URL to `#/messages` without a page reload. A `hashchange` event listener in `app.js` catches this and calls the right render function. The function returns an HTML string and an `init()` callback. The HTML gets injected into `<div id="app">`, and then `init()` runs to attach event listeners.

One thing that tripped us up early: ES6 modules don't work over the `file://` protocol. You need to run a local server (`npx serve` or VS Code Live Server) otherwise the imports just fail silently.

---

## Running Locally

You need a Chromium browser and Node.js installed.

```bash
git clone https://github.com/Naiv-g/ELEVATE-Build-your-Story-and-Rise-towards-Oppurtunity.git
cd ELEVATE-Build-your-Story-and-Rise-towards-Oppurtunity
npx serve -l 3000 .
```

Then open `http://localhost:3000`. That's it.

Alternatively, if you use VS Code, just right-click `index.html` → Open with Live Server.

---

## Deployment

The production app is deployed on Vercel. Every push to main can be re-deployed with:

```bash
npx vercel --prod
```

Vercel takes about 10 seconds, uploads the files, and updates the CDN. The `vercel.json` rewrite rule makes sure that if someone navigates directly to `/messages`, Vercel serves `index.html` instead of returning a 404.

---

## Things We Learned Building This

A few things that weren't obvious going in:

- **Supabase `.single()` crashes if there's no matching row.** Use `.maybeSingle()` instead — it returns `null` and doesn't throw.
- **Event listeners stack up when you re-render DOM.** If you attach a click handler and then re-render the element, the old listener is still there. We had to use `cloneNode(true)` to get rid of old listeners before attaching new ones.
- **User identity is messier than you think.** A connection might store someone's full name in the `to` field, while that same person's account uses a short profileId. If you don't normalize these before building chat room IDs, two users end up talking to different empty rooms. We wrote `getCanonicalId()` to resolve any form of a name to the one true profileId.
- **CSS custom properties make dark mode trivial.** Define all your colors as variables in `:root`, then override them in `[data-theme="dark"]`. Every component automatically picks up the right color without touching a single class name.

---

## The Team

| Name | What they worked on |
|---|---|
| **Naivaidhya Garg** | SPA router, auth, messaging system, canonical ID fix, deployment |
| **Aarjav Jain** | Portfolio builder, profile view, theme system |
| **Devank Joshi** | Collaborator page, database setup, XSS prevention |
| **Aditya Rawat** | Find Teammates page, display name normalization, UI polish |

---

<div align="center">
  <br>
  <strong>© 2026 Team Web Titans — Graphic Era University</strong>
</div>


---

## ✨ Core Platform Features

* 🔐 **Encrypted Authentication:** Fully secure Auth integration utilizing JSON Web Tokens (JWT) and PostgreSQL Row Level Security (RLS).
* 👤 **Dynamic Portfolios:** A beautiful cloud-synced portfolio builder where users can advertise their exact skill sets and GitHub links.
* 🤝 **Bidirectional Networking:** Smart "Find Teammate" algorithms that handle connection requests, pending states, and mutual friendships.
* 💼 **Project Collaboration:** A central hub to browse open-source projects, request to join teams, and oversee active collaborative builds.
* 🔔 **Smart Bell Notifications:** A mathematical notification engine that calculates unseen requests and live project alerts natively.
* 🎨 **Glassmorphism Aesthetic:** A stunning, completely custom CSS3 UI featuring modern translucent blur overlaps, hover micro-animations, and vibrant gradients.

---

## 📊 Database Architecture (Supabase)

Data persistence relies on real-time serverless PostgreSQL tables:

| Schema Table | Function |
|---|---|
| 🗄️ `auth.users` | Encrypted JWT User Authentication storage |
| 🗄️ `profiles` | Community-created public portfolios & skill arrays |
| 🗄️ `connections` | Bidirectional connection requests |
| 🗄️ `projects` | Collaborative project listings & active invite pools |

---

## 🗂️ Project Structure

```text
ELEVATE/
├── index.html              # The SPA Render Shell
├── README.md               # Primary Documentation
├── EVALUATION_GUIDE.md     # Deep-dive Evaluation Report & Architecture Walkthrough
│
├── css/                    # Modular UI Styling
│   ├── styles.css          # Global Design System (Animations, Variables)
│   └── ...                 # Page-specific modular CSS
│
└── js/                     # Component-Driven Vanilla JS
    ├── app.js              # State Controller & Hash-Router
    ├── data.js             # Supabase Data Layer & API Methods
    ├── components/         # Reusable UI
    │   └── navbar.js       # Global Navigation & Notification Brain
    └── pages/              # Individual Page Render Logic
        ├── login.js        
        ├── home.js         
        ├── profile.js      
        ├── builder.js      
        ├── find-teammates.js 
        └── collaborate.js  
```

---

## 🚀 Getting Started

To run this platform locally for development testing:

### Prerequisites
* A Chromium-based browser (Chrome, Edge etc.)
* A local static testing server (required to bypass ES6 File Protocol CORS blocks)

### Installation
**1. Clone the Repository:**
```bash
git clone https://github.com/Naiv-g/ELEVATE-Build-your-Story-and-Rise-towards-Oppurtunity.git
cd ELEVATE-Build-your-Story-and-Rise-towards-Oppurtunity
```

**2. Serve Locally:**
Using Node's HTTP Server (Recommended):
```bash
npx serve -l 3000 .
```
*(Alternatively, simply use the "Live Server" extension in VS Code).*

**3. Test:**
Navigate to `http://localhost:3000` in your browser!

---

## 👥 The Core Team (Web Titans)

| Name | Role / Implementation |
|---|---|
| **Naivaidhya Garg** | Core Developer |
| **Aarjav Jain** | Core Developer | 
| **Devank Joshi** | Core Developer |
| **Aditya Rawat** | Core Developer | 

---

<div align="center">
  <br>
  <strong>© 2026 Elevate</strong> 
</div>
