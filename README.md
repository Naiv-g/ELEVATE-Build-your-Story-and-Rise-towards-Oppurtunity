# 🚀 ELEVATE — Build your Story and Rise towards Opportunity

> **A student collaboration platform to showcase your portfolio, find teammates, and collaborate on real-world projects.**

---

## 📖 Overview

**ELEVATE** is a frontend web application designed to empower students to build their digital presence, connect with like-minded peers, and collaborate on meaningful projects. Whether you're a developer, designer, or ML engineer, Elevate gives you the stage to rise.

Built as a **Project-Based Learning (PBL)** initiative by a team of four students, the platform demonstrates full frontend architecture using vanilla HTML, CSS, and ES6 JavaScript modules — no frameworks, no build tools, just clean and modern web standards.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Login & Sign-up flow with session routing |
| 🏠 **Home Feed** | Personalized dashboard after login |
| 👤 **Profile Pages** | Detailed member profiles with skills, projects, and social links |
| 🛠️ **Portfolio Builder** | Create and publish your own portfolio to the community |
| 🤝 **Find Teammates** | Browse the community, send connection requests, and find collaborators |
| 💼 **Collaborate** | Browse and join open-source & collaborative projects |

---

## 🗂️ Project Structure

```
ELEVATE/
├── index.html              # Main entry point (SPA shell)
├── README.md
│
├── assets/                 # Team avatars and static images
│   ├── avatar_naivaidhya.png
│   ├── avatar_aarjav.png
│   ├── avatar_devank.png
│   └── avatar_aditya.png
│
├── css/                    # Modular stylesheets per page/component
│   ├── styles.css          # Global design tokens & base styles
│   ├── login.css           # Login / Signup page
│   ├── home.css            # Home feed
│   ├── profile.css         # Profile view
│   ├── builder.css         # Portfolio builder
│   └── features.css        # Find Teammates & Collaborate pages
│
└── js/                     # ES6 Module-based JavaScript
    ├── app.js              # App router & lifecycle controller
    ├── data.js             # Team data, PortfolioStore (localStorage)
    ├── components/
    │   └── navbar.js       # Shared navigation bar component
    └── pages/
        ├── login.js        # Login / Signup page renderer
        ├── home.js         # Home feed renderer
        ├── profile.js      # Profile page renderer
        ├── builder.js      # Portfolio builder renderer & logic
        ├── find-teammates.js # Teammate discovery page
        └── collaborate.js  # Collaboration project board
```

---

## 🏗️ Architecture

ELEVATE is a **Single Page Application (SPA)** built entirely without a framework:

- **Hash-based Router** — `window.location.hash` drives navigation (`#/home`, `#/profile/:id`, `#/builder`, etc.)
- **ES6 Modules** — each page is a self-contained module exporting a `render*()` function that returns `{ html, init }`
- **PortfolioStore** — a class wrapping `localStorage` that acts as a lightweight in-memory + persistent database for community portfolios, connections, and collaborative projects
- **Seeded Data** — `data.js` ships with 4 real team profiles and sample community members to demonstrate the platform out of the box

---

## 👥 Team

| Name | 
|---|
| **Naivaidhya Garg** |
| **Aarjav Jain** | 
| **Devank Joshi** |
| **Aditya Rawat** | 

---

## 🚀 Getting Started

### Prerequisites
- A modern browser (Chrome, Firefox, Edge)
- A local static file server (required for ES6 module imports)

### Running Locally

**Option 1 — Using `npx serve` (recommended):**
```bash
npx serve -l 3000 .
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Option 2 — Using VS Code Live Server:**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click **"Go Live"** from `index.html`.

**Option 3 — Using Python:**
```bash
# Python 3
python -m http.server 3000
```

> ⚠️ **Do not open `index.html` directly as a `file://` URL** — ES6 module imports will be blocked by CORS restrictions.

---

## 🖥️ Pages & Routes

| Route | Page |
|---|---|
| `#/login` | Login & Sign-up screen |
| `#/home` | Home dashboard |
| `#/profile/:id` | Member profile (e.g. `#/profile/naivaidhya`) |
| `#/builder` | Portfolio creation & editing |
| `#/find-teammates` | Browse & connect with community members |
| `#/collaborate` | Browse & join collaborative projects |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (Semantic) |
| Styling | Vanilla CSS3 (CSS Variables, Animations, Flexbox/Grid) |
| Logic | Vanilla JavaScript (ES6 Modules, Classes) |
| Storage | Browser `localStorage` |
| Serving | `npx serve` / any static file server |

---

## 📦 Data Persistence

All user-generated data (portfolios, connection requests, collaborative projects) is stored in the browser's **`localStorage`** under the following keys:

| Key | Contents |
|---|---|
| `elevate_community` | Community-created portfolios |
| `elevate_connections` | Connection requests (from → to, status) |
| `elevate_projects` | Collaborative project listings |

> Clearing browser storage will reset community data to the seeded defaults.

---

## 📄 License
 All rights reserved by Team Elevate.

---

<div align="center">
  <strong>Team Elevate</strong> · 2026
</div>
