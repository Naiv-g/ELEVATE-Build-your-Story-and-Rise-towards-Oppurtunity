// Mock data for the 4 team members
const TEAM_DATA = [
  {
    id: 'naivaidhya',
    name: 'Naivaidhya Garg',
    role: 'Full Stack Developer & Team Lead',
    avatar: 'assets/avatar_naivaidhya.png',
    bio: 'Passionate full-stack developer with a knack for building scalable web applications. Leads Team Elevate with a focus on clean architecture and cutting-edge technology. Experienced in designing systems from the ground up and mentoring fellow developers.',
    shortBio: 'Full-stack developer leading Team Elevate with a passion for scalable architecture.',
    socials: { github: '#', linkedin: '#', twitter: '#' },
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Node.js', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'System Design', level: 78 },
      { name: 'Docker', level: 75 }
    ],
    topSkills: ['React', 'Node.js', 'PostgreSQL'],
    skillColors: ['purple', 'green', 'cyan'],
    projects: [
      { name: 'Elevate Platform', description: 'A collaborative portfolio platform connecting students across the globe. Designed and built the full system architecture including real-time collaboration features and JWT-based authentication.', status: 'active', techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'] },
      { name: 'CodeSync', description: 'Real-time collaborative code editor supporting multiple programming languages with syntax highlighting, auto-completion, and live cursor sharing.', status: 'completed', techStack: ['WebSockets', 'Express', 'Monaco Editor', 'Redis'] },
      { name: 'DevDash Analytics', description: 'Developer productivity dashboard that tracks GitHub contributions, pull request metrics, and coding patterns to provide actionable insights.', status: 'active', techStack: ['React', 'D3.js', 'GitHub API', 'Node.js'] }
    ],
    isTeam: true
  },
  {
    id: 'aarjav',
    name: 'Aarjav Jain',
    role: 'Frontend Developer & UI Engineer',
    avatar: 'assets/avatar_aarjav.png',
    bio: 'Creative frontend developer specializing in building beautiful, interactive user interfaces. Believes that great design and smooth animations are the key to exceptional user experiences. Expert in modern CSS and React ecosystem.',
    shortBio: 'Frontend specialist crafting beautiful, interactive UI experiences.',
    socials: { github: '#', linkedin: '#', twitter: '#' },
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'CSS / Animations', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'Figma', level: 82 },
      { name: 'Next.js', level: 78 },
      { name: 'TypeScript', level: 75 }
    ],
    topSkills: ['React', 'CSS', 'Figma'],
    skillColors: ['cyan', 'pink', 'amber'],
    projects: [
      { name: 'Elevate UI System', description: 'Designed and built the complete design system for the Elevate platform including the component library, animation framework, and theming engine.', status: 'active', techStack: ['React', 'CSS3', 'Framer Motion', 'Storybook'] },
      { name: 'PixelCraft', description: 'Browser-based image editing tool with layers, filters, and an intuitive canvas interface. Focused on delivering a smooth, desktop-level editing experience on the web.', status: 'completed', techStack: ['Canvas API', 'React', 'Web Workers', 'IndexedDB'] },
      { name: 'Motion Library', description: 'Open-source micro-animation library for React components featuring physics-based springs, gesture recognition, and scroll-triggered animations.', status: 'active', techStack: ['TypeScript', 'React', 'GSAP', 'npm'] }
    ],
    isTeam: true
  },
  {
    id: 'devank',
    name: 'Devank Joshi',
    role: 'Backend Developer & DevOps',
    avatar: 'assets/avatar_devank.png',
    bio: 'Backend engineer with deep expertise in building robust REST APIs and microservices. Passionate about DevOps practices, CI/CD pipelines, and cloud-native deployments. Ensures Elevate runs smoothly at scale.',
    shortBio: 'Backend engineer specializing in APIs, DevOps, and cloud infrastructure.',
    socials: { github: '#', linkedin: '#', twitter: '#' },
    skills: [
      { name: 'Django / Flask', level: 90 },
      { name: 'REST APIs', level: 92 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD', level: 82 }
    ],
    topSkills: ['Django', 'Docker', 'AWS'],
    skillColors: ['green', 'cyan', 'amber'],
    projects: [
      { name: 'Elevate API', description: 'Architected and built the complete REST API backend for Elevate including user authentication, project management, and real-time notification endpoints.', status: 'active', techStack: ['Django', 'PostgreSQL', 'Redis', 'Celery'] },
      { name: 'DeployBot', description: 'Automated deployment pipeline tool that handles container orchestration, blue-green deployments, and rollback management for microservices.', status: 'completed', techStack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'] },
      { name: 'LogStream', description: 'Centralized logging and monitoring platform for distributed systems providing real-time log aggregation, alerting, and performance dashboards.', status: 'active', techStack: ['Python', 'Elasticsearch', 'Grafana', 'Kafka'] }
    ],
    isTeam: true
  },
  {
    id: 'aditya',
    name: 'Aditya Rawat',
    role: 'ML Engineer & Data Specialist',
    avatar: 'assets/avatar_aditya.png',
    bio: 'Machine learning engineer with a passion for building intelligent systems. Specializes in natural language processing, recommendation engines, and data visualization. Brings AI-powered features to the Elevate platform.',
    shortBio: 'ML engineer bringing AI-powered features and data intelligence to projects.',
    socials: { github: '#', linkedin: '#', twitter: '#' },
    skills: [
      { name: 'Python', level: 93 },
      { name: 'TensorFlow', level: 88 },
      { name: 'Data Visualization', level: 85 },
      { name: 'Flask', level: 82 },
      { name: 'NLP', level: 80 },
      { name: 'Pandas / NumPy', level: 90 }
    ],
    topSkills: ['Python', 'TensorFlow', 'NLP'],
    skillColors: ['amber', 'pink', 'green'],
    projects: [
      { name: 'Elevate Matchmaker', description: 'ML-powered teammate recommendation system that matches users based on skills, interests, and project preferences using collaborative filtering and NLP.', status: 'active', techStack: ['Python', 'scikit-learn', 'Flask', 'PostgreSQL'] },
      { name: 'SentimentScope', description: 'Real-time sentiment analysis tool for social media feeds that uses transformer models to classify and visualize public opinion trends.', status: 'completed', techStack: ['PyTorch', 'Hugging Face', 'Streamlit', 'Redis'] },
      { name: 'DataLens', description: 'Interactive data exploration and visualization platform that lets users create custom dashboards from CSV/JSON data without writing code.', status: 'active', techStack: ['Python', 'Plotly', 'Dash', 'Pandas'] }
    ],
    isTeam: true
  }
];

// ===== Global Portfolio Store  =====
// Persists user-created portfolios so everyone can see them.
// In a real app this would be a database; here we use localStorage + in-memory.
class PortfolioStore {
  constructor() {
    this._community = [];
    this._connections = []; // { from, to, status }
    this._collabProjects = [];
    this._load();
  }

  _load() {
    try {
      this._community = JSON.parse(localStorage.getItem('elevate_community') || '[]');
      this._connections = JSON.parse(localStorage.getItem('elevate_connections') || '[]');
      this._collabProjects = JSON.parse(localStorage.getItem('elevate_projects') || '[]');
    } catch { /* ignore */ }
    // Seed some sample community portfolios if empty
    if (this._community.length === 0) {
      this._community = [
        {
          id: 'community_riya', name: 'Riya Kapoor', role: 'UI/UX Designer',
          bio: 'Passionate about creating human-centered designs. Love sketching wireframes and turning them into pixel-perfect interfaces.',
          shortBio: 'UI/UX designer passionate about human-centered design.',
          skills: [{ name: 'Figma', level: 92 }, { name: 'Adobe XD', level: 85 }, { name: 'CSS', level: 78 }, { name: 'Prototyping', level: 88 }],
          topSkills: ['Figma', 'Adobe XD', 'CSS'], skillColors: ['pink', 'purple', 'cyan'],
          projects: [{ name: 'DesignKit', description: 'Open-source UI kit with 200+ reusable components for Figma.', status: 'active', techStack: ['Figma', 'Design Systems'] }],
          socials: { github: '#', linkedin: '#' }, isTeam: false, avatar: null
        },
        {
          id: 'community_arjun', name: 'Arjun Verma', role: 'Cloud & DevOps Engineer',
          bio: 'Cloud infrastructure enthusiast. AWS certified. Building reliable, auto-scaling systems is my jam.',
          shortBio: 'Cloud engineer building reliable, auto-scaling infrastructure.',
          skills: [{ name: 'AWS', level: 90 }, { name: 'Terraform', level: 85 }, { name: 'Docker', level: 88 }, { name: 'Python', level: 75 }],
          topSkills: ['AWS', 'Terraform', 'Docker'], skillColors: ['amber', 'green', 'cyan'],
          projects: [{ name: 'InfraBot', description: 'Slack bot that provisions cloud environments on demand via ChatOps.', status: 'completed', techStack: ['AWS', 'Terraform', 'Node.js'] }],
          socials: { github: '#', linkedin: '#' }, isTeam: false, avatar: null
        },
        {
          id: 'community_sneha', name: 'Sneha Reddy', role: 'Mobile App Developer',
          bio: 'Flutter & React Native developer shipping cross-platform apps. Focused on performance and beautiful transitions.',
          shortBio: 'Mobile developer shipping cross-platform apps with Flutter.',
          skills: [{ name: 'Flutter', level: 90 }, { name: 'React Native', level: 82 }, { name: 'Firebase', level: 85 }, { name: 'Dart', level: 88 }],
          topSkills: ['Flutter', 'Firebase', 'Dart'], skillColors: ['cyan', 'amber', 'purple'],
          projects: [{ name: 'FitTrack', description: 'Health & fitness tracking app with real-time sync and custom workout plans.', status: 'active', techStack: ['Flutter', 'Firebase', 'Dart'] }],
          socials: { github: '#', linkedin: '#' }, isTeam: false, avatar: null
        }
      ];
      this._save();
    }
    // Seed some collab projects if empty
    if (this._collabProjects.length === 0) {
      this._collabProjects = [
        { id: 'proj_1', title: 'Open Source Chat App', description: 'Build a real-time chat application with end-to-end encryption. Looking for frontend and backend developers.', owner: 'Naivaidhya Garg', skillsNeeded: ['React', 'Node.js', 'WebSockets', 'Encryption'], members: ['Naivaidhya Garg', 'Devank Joshi'], status: 'open', createdAt: '2026-03-15' },
        { id: 'proj_2', title: 'AI Study Buddy', description: 'An ML-powered study companion that generates flashcards, quizzes, and summaries from uploaded notes.', owner: 'Aditya Rawat', skillsNeeded: ['Python', 'NLP', 'React', 'Flask'], members: ['Aditya Rawat'], status: 'open', createdAt: '2026-03-18' },
        { id: 'proj_3', title: 'Campus Events Portal', description: 'A platform for college students to discover, create, and RSVP to campus events with calendar integration.', owner: 'Aarjav Jain', skillsNeeded: ['React', 'CSS', 'Node.js', 'PostgreSQL'], members: ['Aarjav Jain', 'Naivaidhya Garg'], status: 'open', createdAt: '2026-03-20' }
      ];
      this._save();
    }
  }

  _save() {
    localStorage.setItem('elevate_community', JSON.stringify(this._community));
    localStorage.setItem('elevate_connections', JSON.stringify(this._connections));
    localStorage.setItem('elevate_projects', JSON.stringify(this._collabProjects));
  }

  // Get all profiles: team + community
  getAllProfiles() { return [...TEAM_DATA, ...this._community]; }
  getCommunityProfiles() { return this._community; }
  getProfileById(id) { return this.getAllProfiles().find(p => p.id === id) || null; }

  // Add a new user portfolio
  addPortfolio(portfolio) {
    // Prevent duplicates
    this._community = this._community.filter(p => p.id !== portfolio.id);
    this._community.push(portfolio);
    this._save();
    return portfolio;
  }

  // Connections / teammate requests
  getConnections() { return this._connections; }
  sendConnectionRequest(from, toId) {
    const existing = this._connections.find(c => c.from === from && c.to === toId);
    if (existing) return existing;
    const conn = { from, to: toId, status: 'pending', createdAt: new Date().toISOString() };
    this._connections.push(conn);
    this._save();
    return conn;
  }
  getConnectionStatus(from, toId) {
    const c = this._connections.find(c => c.from === from && c.to === toId);
    return c ? c.status : null;
  }

  // Collaboration projects
  getCollabProjects() { return this._collabProjects; }
  addCollabProject(project) {
    this._collabProjects.push(project);
    this._save();
    return project;
  }
  joinProject(projectId, memberName) {
    const proj = this._collabProjects.find(p => p.id === projectId);
    if (proj && !proj.members.includes(memberName)) {
      proj.members.push(memberName);
      this._save();
    }
    return proj;
  }
}

const portfolioStore = new PortfolioStore();

export { TEAM_DATA, portfolioStore };
