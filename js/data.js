// Team members data 
const TEAM_DATA = [
  {
    id: 'naivaidhya',
    name: 'Naivaidhya Garg',
    role: 'AI & Machine Learning Engineer',
    avatar: 'assets/avatar_naivaidhya.png',
    bio: 'B.Tech CSE student at Graphic Era University (CGPA 8.70) with deep expertise in computer vision, RAG pipelines, and LLM-powered applications. Former AI & ML Intern at DataSparshTech LLP where he built real-time computer vision pipelines processing 50,000+ labeled images. AWS JAM Day top-10 performer and Google Cloud Computing certified.',
    shortBio: 'AI/ML engineer specializing in computer vision, RAG, and LLM-powered systems.',
    socials: { github: 'https://github.com/Naiv-g', linkedin: 'https://linkedin.com/in/Naivaidhya-garg' },
    skills: [
      { name: 'Python', level: 93 },
      { name: 'PyTorch / YOLOv8', level: 90 },
      { name: 'OpenCV', level: 88 },
      { name: 'RAG & LLMs', level: 85 },
      { name: 'Flask', level: 82 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'C / C++', level: 78 },
      { name: 'CUDA & FP16', level: 75 }
    ],
    topSkills: ['Python', 'PyTorch', 'OpenCV'],
    skillColors: ['purple', 'green', 'cyan'],
    projects: [
      { name: 'PulseSense — AI Health Analytics', description: 'Built an AI-powered health analytics platform integrating RAG + LLMs for symptom-based disease inference and secure data handling. Implemented a transformer-based retrieval pipeline reducing hallucinations in medical queries. Designed a hybrid chatbot combining rule-based logic with LLMs.', status: 'completed', techStack: ['Python', 'Hugging Face', 'RAG', 'LLM'] },
      { name: 'AI Road Infrastructure Detection', description: 'Real-time object detection system using YOLOv8 processing 50,000+ labeled images for road infrastructure analysis. Optimized inference using CUDA + FP16, reducing latency by 30%. Improved detection precision via hyperparameter tuning and NMS optimization.', status: 'completed', techStack: ['Python', 'PyTorch', 'YOLOv8', 'OpenCV'] },
      { name: 'Brain Disease Detection (SVM)', description: 'SVM-based MRI classification system achieving 97.5% accuracy, outperforming baseline models. Built a Flask-based web interface for real-time MRI uploads and predictions.', status: 'completed', techStack: ['Python', 'Flask', 'OpenCV', 'Scikit-learn'] },
      { name: 'GeoPath Visualizer', description: 'Interactive route visualization tool using geospatial data and dynamic map rendering. Handled real-time geospatial data processing and overlay generation for accurate route mapping.', status: 'completed', techStack: ['Python', 'Web Development'] }
    ],
    education: 'B.Tech CSE — Graphic Era University (Aug 2023 – Jul 2027)',
    experience: 'AI & ML Intern @ DataSparshTech LLP (Aug 2025 – Dec 2025)',
    achievements: ['AWS JAM Day — Top 10 Performer (2025)', 'Google Cloud Computing Foundations Certificate (2024)'],
    isTeam: true
  },
  {
    id: 'aarjav',
    name: 'Aarjav Jain',
    role: 'AI/ML Developer & Computer Vision Engineer',
    avatar: 'assets/avatar_aarjav.png',
    bio: 'B.Tech CSE (AI & ML) student at Graphic Era University (CGPA 9.01) with hands-on expertise in computer vision, deep learning, and data science. Former AI & ML Intern at DataSparshTech LLP. National Hackathon Finalist (Code For Bharat \'25) and AWS JAM Day Top-10 Performer. Builds end-to-end ML pipelines from data collection to model deployment.',
    shortBio: 'AI/ML developer specializing in computer vision, deep learning, and data science.',
    socials: { github: 'https://github.com/Aarjav-Jain-2210', linkedin: 'https://www.linkedin.com/in/aarjavjjain' },
    skills: [
      { name: 'Python', level: 92 },
      { name: 'PyTorch / YOLOv8', level: 90 },
      { name: 'OpenCV', level: 88 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'C / C++', level: 82 },
      { name: 'Java', level: 78 },
      { name: 'NumPy / Pandas', level: 88 },
      { name: 'NVIDIA CUDA', level: 75 }
    ],
    topSkills: ['Python', 'PyTorch', 'OpenCV'],
    skillColors: ['cyan', 'pink', 'amber'],
    projects: [
      { name: 'Project Drishti — Urban Infrastructure Monitoring', description: 'Designed a YOLOv8n model to detect potholes, billboards, and traffic signs from road images. Trained on 45,000+ labeled images from Kaggle and custom datasets using OpenCV, PyTorch, and Roboflow. Achieved reliable detection with an overall F1-score of 0.83.', status: 'completed', techStack: ['OpenCV', 'PyTorch', 'YOLOv8', 'Roboflow'] },
      { name: 'Behavioral Analysis — Customer Segmentation', description: 'Segmented 50,000+ customers into 5 clusters using K-Means Clustering, improving marketing effectiveness by 30%. Built a Random Forest classifier with 100 trees achieving 94% accuracy. Reduced prediction time by 15% through feature engineering.', status: 'completed', techStack: ['Scikit-learn', 'NumPy', 'Matplotlib'] },
      { name: 'Spam Detection System', description: 'Formulated a Naive Bayes model to classify 58,000 emails with 98% accuracy, reducing false positives to 1.3%. Enabled real-time spam filtering with an average classification time of 0.5 seconds per email.', status: 'completed', techStack: ['Python', 'NLTK', 'Scikit-learn', 'Pandas'] },
      { name: 'SIMPLFY — Smart Finance Management', description: 'Developed a web-based finance management platform for expense tracking, budgeting, and EMI planning. Integrated an AI chatbot for real-time financial assistance and implemented visual reports, charts, and PDF export for spending analysis.', status: 'completed', techStack: ['React.js', 'MongoDB', 'OpenAI API'] }
    ],
    education: 'B.Tech (CSE – AI & ML) — Graphic Era University (2023 – Present, CGPA: 9.01)',
    experience: 'AI & ML Intern @ DataSparshTech LLP (Aug 2025 – Dec 2025)',
    achievements: ['Code For Bharat \'25 — National Hackathon Finalist (2025)', 'AWS JAM Day — Top 10 Performer (2025)', 'Google Cloud Computing Foundations Certificate (2024)'],
    isTeam: true
  },
  {
    id: 'devank',
    name: 'Devank Joshi',
    role: 'Full Stack Developer & Cloud Engineer',
    avatar: 'assets/avatar_devank.png',
    bio: 'B.Tech CSE student at Graphic Era University with strong expertise in full-stack web development and cloud infrastructure. Experienced in building REST APIs with Django and Node.js, deploying scalable microservices with Docker and AWS, and setting up CI/CD pipelines. Passionate about clean architecture and DevOps best practices.',
    shortBio: 'Full-stack developer & cloud engineer building scalable backend systems.',
    socials: { github: 'https://github.com/devankjoshi', linkedin: 'https://linkedin.com/in/devankjoshi' },
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Django / Flask', level: 88 },
      { name: 'Node.js / Express', level: 85 },
      { name: 'PostgreSQL / MongoDB', level: 87 },
      { name: 'Docker / Kubernetes', level: 83 },
      { name: 'AWS (EC2, S3, Lambda)', level: 80 },
      { name: 'React.js', level: 78 },
      { name: 'CI/CD (GitHub Actions)', level: 82 }
    ],
    topSkills: ['Django', 'Docker', 'AWS'],
    skillColors: ['green', 'cyan', 'amber'],
    projects: [
      { name: 'CloudDeploy — Automated Deployment Platform', description: 'Built an automated deployment platform that handles container orchestration, blue-green deployments, and rollback management for microservices. Reduced deployment times by 60% with custom GitHub Actions pipelines and Terraform infrastructure-as-code.', status: 'completed', techStack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'] },
      { name: 'HealthSync — Patient Management API', description: 'Architected a HIPAA-compliant REST API for patient management serving 10,000+ requests/day. Implemented JWT-based authentication, role-based access control, and real-time WebSocket notifications for appointment updates.', status: 'completed', techStack: ['Django', 'PostgreSQL', 'Redis', 'Celery'] },
      { name: 'LogPulse — Distributed Monitoring System', description: 'Centralized logging and monitoring platform for distributed systems with real-time log aggregation, alerting, and performance dashboards. Processes 1M+ log entries daily with sub-second query response times.', status: 'active', techStack: ['Python', 'Elasticsearch', 'Grafana', 'Kafka'] },
      { name: 'StudyVault — Collaborative Notes Platform', description: 'Full-stack collaborative notes platform with real-time Markdown editing, file uploads to AWS S3, and team workspaces. Built with React frontend and Node.js/Express backend.', status: 'completed', techStack: ['React', 'Node.js', 'MongoDB', 'AWS S3'] }
    ],
    education: 'B.Tech CSE — Graphic Era University (2023 – Present)',
    experience: 'Backend Intern @ TechScale Solutions (Jun 2025 – Aug 2025)',
    achievements: ['Smart India Hackathon — Finalist (2025)', 'AWS Solutions Architect Foundations (2024)', 'HackOverflow 3.0 — 2nd Place (2025)'],
    isTeam: true
  },
  {
    id: 'aditya',
    name: 'Aditya Rawat',
    role: 'ML Engineer & Data Scientist',
    avatar: 'assets/avatar_aditya.png',
    bio: 'B.Tech CSE student at Graphic Era University specializing in machine learning, NLP, and data-driven applications. Experienced in building recommendation engines, sentiment analysis systems, and predictive models. Proficient with TensorFlow, PyTorch, and the Hugging Face ecosystem. Brings data intelligence and AI-powered features to every project.',
    shortBio: 'ML engineer specializing in NLP, recommendation systems, and predictive analytics.',
    socials: { github: 'https://github.com/adityarawat', linkedin: 'https://linkedin.com/in/adityarawat' },
    skills: [
      { name: 'Python', level: 93 },
      { name: 'TensorFlow / Keras', level: 88 },
      { name: 'NLP (Transformers)', level: 86 },
      { name: 'Pandas / NumPy', level: 92 },
      { name: 'PyTorch', level: 82 },
      { name: 'Flask / FastAPI', level: 80 },
      { name: 'SQL / PostgreSQL', level: 78 },
      { name: 'Data Visualization', level: 85 }
    ],
    topSkills: ['Python', 'TensorFlow', 'NLP'],
    skillColors: ['amber', 'pink', 'green'],
    projects: [
      { name: 'RecoEngine — Smart Recommendation System', description: 'Built a collaborative filtering and content-based recommendation engine serving personalized suggestions to 20,000+ users. Implemented matrix factorization (SVD) and cosine similarity scoring with a Flask API backend and PostgreSQL storage.', status: 'completed', techStack: ['Python', 'Scikit-learn', 'Flask', 'PostgreSQL'] },
      { name: 'SentimentScope — Social Media Analysis', description: 'Real-time sentiment analysis pipeline for Twitter/Reddit feeds using fine-tuned BERT models. Classifies and visualizes public opinion trends with 91% accuracy. Deployed with Streamlit for interactive dashboards.', status: 'completed', techStack: ['PyTorch', 'Hugging Face', 'Streamlit', 'Redis'] },
      { name: 'CropYield Predictor — Agricultural ML', description: 'Predictive model for crop yield estimation using weather data, soil composition, and satellite imagery. Achieved RMSE of 0.12 using gradient-boosted ensemble models. Built a farmer-friendly web app with regional language support.', status: 'completed', techStack: ['Python', 'XGBoost', 'TensorFlow', 'Flask'] },
      { name: 'DataLens — Interactive Visualization', description: 'Interactive data exploration platform that lets users create custom dashboards from CSV/JSON data without writing code. Features auto-detection of chart types and statistical summaries.', status: 'active', techStack: ['Python', 'Plotly', 'Dash', 'Pandas'] }
    ],
    education: 'B.Tech CSE — Graphic Era University (2023 – Present)',
    experience: 'Data Science Intern @ AnalytiQ Labs (May 2025 – Jul 2025)',
    achievements: ['Kaggle Competitions — Silver Medal (2025)', 'Google Cloud Computing Foundations Certificate (2024)', 'DataHack 4.0 — Winner (2025)'],
    isTeam: true
  }
];

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://ayzbwvppkkiifgdcjirq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5emJ3dnBwa2tpaWZnZGNqaXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTgyNTgsImV4cCI6MjA5MTIzNDI1OH0.a_CPAD9k4y9lFnYW5uABrG27rb3T5bLAQfd_xLMiPzs';
// @ts-ignore
const supabase = createClient(supabaseUrl, supabaseKey);

// ===== Global Portfolio Store  =====
// Persists user-created portfolios, connections, and projects via Supabase
class PortfolioStore {
  constructor() {
    this._community = [];
    this._connections = []; // { from, to, status }
    this._collabProjects = [];
  }

  async fetchFromSupabase() {
    try {
      const [{ data: pData }, { data: prData }, { data: cData }] = await Promise.all([
        supabase.from('profiles').select('data'),
        supabase.from('projects').select('data'),
        supabase.from('connections').select('data')
      ]);

      if (pData) this._community = pData.map(r => r.data);
      if (prData) this._collabProjects = prData.map(r => r.data);
      if (cData) this._connections = cData.map(r => r.data);
    } catch (e) {
      console.error("Error fetching from Supabase:", e);
    }
  }

  // Get all profiles: team + community
  getAllProfiles() { return [...TEAM_DATA, ...this._community]; }
  getCommunityProfiles() { return this._community; }
  getProfileById(id) { return this.getAllProfiles().find(p => p.id === id) || null; }

  // Add a new user portfolio
  async addPortfolio(portfolio) {
    // Prevent duplicates
    this._community = this._community.filter(p => p.id !== portfolio.id);
    this._community.push(portfolio);

    // Save to Supabase
    try {
      await supabase.from('profiles').upsert({ id: portfolio.id, data: portfolio });
    } catch (e) { console.error('Error saving portfolio:', e); }
    return portfolio;
  }

  // Connections / teammate requests
  getConnections() { return this._connections; }

  async sendConnectionRequest(from, toId) {
    const existing = this._connections.find(c => (c.from === from && c.to === toId) || (c.from === toId && c.to === from));
    if (existing) return existing;
    const conn = { from, to: toId, status: 'pending', createdAt: new Date().toISOString() };
    this._connections.push(conn);

    // Save to Supabase
    try {
      const connId = `${from}_${toId}`;
      await supabase.from('connections').upsert({ id: connId, data: conn });
    } catch (e) { console.error('Error saving connection:', e); }
    return conn;
  }

  async acceptConnectionRequest(from, toId) {
    const conn = this._connections.find(c => c.from === from && c.to === toId);
    if (!conn) return null;
    conn.status = 'connected';

    // Save to Supabase
    try {
      const connId = `${from}_${toId}`;
      await supabase.from('connections').upsert({ id: connId, data: conn });
    } catch (e) { console.error('Error accepting connection:', e); }
    return conn;
  }

  getConnectionStatus(u1, u2) {
    const c = this._connections.find(c => (c.from === u1 && c.to === u2) || (c.from === u2 && c.to === u1));
    if (!c) return null;
    // If it's pending, but I am the receiver, we should probably differentiate so I don't see "Request Sent".
    // Wait, the UI relies on 'pending' to mean "I sent a request".
    // If u1 is the receiver and it's pending, return 'incoming_pending' instead of 'pending'.
    if (c.status === 'pending') {
      if (c.from === u1) return 'pending'; // I sent it
      return 'incoming_pending'; // They sent it to me
    }
    return c.status; // 'connected'
  }

  // Collaboration projects
  getCollabProjects() { return this._collabProjects; }

  async addCollabProject(project) {
    this._collabProjects.push(project);

    // Save to Supabase
    try {
      await supabase.from('projects').upsert({ id: project.id, data: project });
    } catch (e) { console.error('Error saving project:', e); }
    return project;
  }

  async sendProjectJoinRequest(projectId, username) {
    const p = this._collabProjects.find(p => p.id === projectId);
    if (p) {
      if (!p.joinRequests) p.joinRequests = [];
      if (!p.joinRequests.includes(username) && !p.members.includes(username)) {
        p.joinRequests.push(username);
        try {
          await supabase.from('projects').upsert({ id: p.id, data: p });
        } catch (e) { console.error('Error requesting to join project:', e); }
      }
    }
  }

  async acceptProjectJoinRequest(projectId, reqUsername) {
    const p = this._collabProjects.find(p => p.id === projectId);
    if (p && p.joinRequests && p.joinRequests.includes(reqUsername)) {
      p.joinRequests = p.joinRequests.filter(u => u !== reqUsername);
      if (!p.members.includes(reqUsername)) {
        p.members.push(reqUsername);
      }
      try {
        await supabase.from('projects').upsert({ id: p.id, data: p });
      } catch (e) { console.error('Error accepting join request:', e); }
    }
  }

  // ============ MESSAGING ============

  // Resolve ANY identifier (full name, email prefix, profileId) to the canonical profileId
  getCanonicalId(id) {
    if (!id) return '';
    const norm = String(id).toLowerCase().replace(/\s+/g, '');
    // Check team data first
    for (const p of TEAM_DATA) {
      if (p.id === id || p.name === id ||
          p.id.toLowerCase() === norm ||
          (p.name && p.name.toLowerCase().replace(/\s+/g, '') === norm)) {
        return p.id;
      }
    }
    // Check community profiles
    for (const p of this._community) {
      if (p.id === id || p.name === id ||
          (p.id && p.id.toLowerCase() === norm) ||
          (p.name && p.name.toLowerCase().replace(/\s+/g, '') === norm)) {
        return p.id || norm;
      }
    }
    // Fallback: lowercase+no-spaces
    return norm;
  }

  getDMRoomId(u1, u2) {
    const c1 = this.getCanonicalId(u1);
    const c2 = this.getCanonicalId(u2);
    return 'dm_' + [c1, c2].sort().join('_');
  }

  async loadMessages(roomId) {
    try {
      const { data, error } = await supabase.from('messages').select('data').eq('id', roomId).maybeSingle();
      if (error) { console.error('loadMessages error:', error); return []; }
      return (data && data.data) ? data.data : [];
    } catch (e) {
      console.error('loadMessages exception:', e);
      return [];
    }
  }

  async sendMessage(roomId, sender, text) {
    const existing = await this.loadMessages(roomId);
    const msg = { sender, text, timestamp: new Date().toISOString() };
    const updated = [...existing, msg];
    const { error } = await supabase.from('messages').upsert({ id: roomId, data: updated });
    if (error) console.error('sendMessage error:', error);
    return msg;
  }
}


const portfolioStore = new PortfolioStore();

export { TEAM_DATA, portfolioStore, supabase };
