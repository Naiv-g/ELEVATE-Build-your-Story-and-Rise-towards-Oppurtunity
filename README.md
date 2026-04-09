<div align="center">
  <h1>🚀 ELEVATE</h1>
  <h3>Build Your Story, Rise Towards Opportunity</h3>
  <p>A next-generation student networking platform built entirely with optimized <strong>Vanilla Architecture</strong> and real-time <strong>Cloud Infrastructure</strong>.</p>
  
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />
    <img src="https://img.shields.io/badge/JavaScript_ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
    <img src="https://img.shields.io/badge/Supabase_DB-3ECF8E?style=flat-square&logo=supabase&logoColor=white" />
    <img src="https://img.shields.io/badge/Vercel_Edge-000000?style=flat-square&logo=vercel&logoColor=white" />
  </p>
</div>

---

## 📖 Vision & Overview

**ELEVATE** was born from a simple realization: students build incredible projects during their academic careers, but rarely have a unified platform to showcase those skills or find complementary talent. 

Rather than relying on heavy enterprise frameworks like React, Elevate is engineered strictly as a **Single Page Application (SPA)** using native ES6 JavaScript and DOM manipulation. This creates lightning-fast loading speeds, while the **Supabase PostgreSQL** backend ensures real-time security, synchronization, and data persistence globally managed via **Vercel's Edge Network**.

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
  <strong>© 2026 Team Elevate</strong> 
</div>
