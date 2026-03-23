// Team member data sourced from actual resumes
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
    https://github.com/Aarjav-Jain-2210', linkedin: 'https://www.linkedin.com/in/aarjavjjain' },
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
          id: 'community_riya', name: 'Riya Kapoor', role: 'UI/UX Designer & Frontend Developer',
          bio: 'B.Des Communication Design student passionate about creating human-centered designs. Experienced in Figma, Adobe Creative Suite, and front-end prototyping. Has designed interfaces for 5+ student startups and contributed to open-source design systems.',
          shortBio: 'UI/UX designer building accessible, human-centered digital experiences.',
          skills: [{ name: 'Figma', level: 92 }, { name: 'Adobe XD', level: 85 }, { name: 'CSS / Tailwind', level: 80 }, { name: 'Prototyping', level: 88 }, { name: 'User Research', level: 82 }],
          topSkills: ['Figma', 'Adobe XD', 'CSS'], skillColors: ['pink', 'purple', 'cyan'],
          projects: [
            { name: 'DesignKit', description: 'Open-source UI kit with 200+ reusable components for Figma covering dashboards, e-commerce, and social apps.', status: 'active', techStack: ['Figma', 'Design Systems'] },
            { name: 'MediCare UI Redesign', description: 'Complete UI/UX redesign for a healthcare appointment booking app. Improved user task completion rate by 35% through usability testing.', status: 'completed', techStack: ['Figma', 'User Research', 'Prototyping'] }
          ],
          socials: { github: '#', linkedin: '#' }, isTeam: false, avatar: null
        },
        {
          id: 'community_arjun', name: 'Arjun Verma', role: 'Cloud & DevOps Engineer',
          bio: 'B.Tech IT student and AWS Certified Cloud Practitioner. Builds reliable, auto-scaling infrastructure and CI/CD pipelines. Interned at a cloud consulting firm deploying Kubernetes clusters for production workloads.',
          shortBio: 'AWS-certified cloud engineer building reliable, auto-scaling infrastructure.',
          skills: [{ name: 'AWS (EC2, Lambda)', level: 90 }, { name: 'Terraform', level: 85 }, { name: 'Docker / K8s', level: 88 }, { name: 'Python', level: 78 }, { name: 'Linux / Bash', level: 85 }],
          topSkills: ['AWS', 'Terraform', 'Docker'], skillColors: ['amber', 'green', 'cyan'],
          projects: [
            { name: 'InfraBot', description: 'Slack bot that provisions cloud environments on demand via ChatOps. Reduces environment setup time from 2 hours to 5 minutes.', status: 'completed', techStack: ['AWS', 'Terraform', 'Node.js'] },
            { name: 'K8s Auto-Scaler', description: 'Custom Kubernetes HPA controller using Prometheus metrics for intelligent pod scaling based on application-specific SLOs.', status: 'active', techStack: ['Kubernetes', 'Go', 'Prometheus'] }
          ],
          socials: { github: '#', linkedin: '#' }, isTeam: false, avatar: null
        },
        {
          id: 'community_sneha', name: 'Sneha Reddy', role: 'Mobile App Developer',
          bio: 'B.Tech CSE student specializing in cross-platform mobile development with Flutter and React Native. Has published 3 apps on Google Play Store with a combined 10K+ downloads. Focused on smooth animations and offline-first architecture.',
          shortBio: 'Mobile developer shipping cross-platform apps with Flutter & React Native.',
          skills: [{ name: 'Flutter / Dart', level: 90 }, { name: 'React Native', level: 82 }, { name: 'Firebase', level: 87 }, { name: 'REST APIs', level: 85 }, { name: 'SQLite', level: 80 }],
          topSkills: ['Flutter', 'Firebase', 'Dart'], skillColors: ['cyan', 'amber', 'purple'],
          projects: [
            { name: 'FitTrack', description: 'Health & fitness tracking app with step counter, calorie logger, and custom workout plans. 5K+ downloads on Play Store with 4.5★ rating.', status: 'active', techStack: ['Flutter', 'Firebase', 'Dart'] },
            { name: 'CampusConnect', description: 'College social networking app with event discovery, study group matching, and anonymous Q&A. Built with React Native and Firebase.', status: 'completed', techStack: ['React Native', 'Firebase', 'Node.js'] }
          ],
          socials: { github: '#', linkedin: '#' }, isTeam: false, avatar: null
        }
      ];
      this._save();
    }
    // Seed some collab projects if empty
    if (this._collabProjects.length === 0) {
      this._collabProjects = [
        { id: 'proj_1', title: 'AI-Powered Road Safety System', description: 'Build a real-time road infrastructure monitoring system using YOLOv8 and OpenCV. Looking for ML engineers and backend developers to scale the detection pipeline.', owner: 'Aarjav Jain', skillsNeeded: ['Python', 'PyTorch', 'OpenCV', 'Flask'], members: ['Aarjav Jain', 'Naivaidhya Garg'], status: 'open', createdAt: '2026-03-15' },
        { id: 'proj_2', title: 'Smart Health Analytics Platform', description: 'An RAG + LLM powered health chatbot for symptom-based disease inference with secure data handling. Need NLP engineers and frontend developers.', owner: 'Naivaidhya Garg', skillsNeeded: ['Python', 'RAG', 'LLMs', 'React'], members: ['Naivaidhya Garg', 'Aditya Rawat'], status: 'open', createdAt: '2026-03-18' },
        { id: 'proj_3', title: 'Campus Deployment Pipeline', description: 'Automated CI/CD platform for student projects with one-click Docker deployments and monitoring dashboards. Looking for DevOps and full-stack contributors.', owner: 'Devank Joshi', skillsNeeded: ['Docker', 'Kubernetes', 'Node.js', 'React'], members: ['Devank Joshi', 'Aarjav Jain'], status: 'open', createdAt: '2026-03-20' }
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
