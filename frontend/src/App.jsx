import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    setIsVisible(true);

    // Fetch message from backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

    fetch(`${backendUrl}/api/message`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setMessage(data.text || 'Welcome to my profile!');
      })
      .catch(err => {
        console.error('Error fetching message:', err);
        setError('Backend connection failed');
        setMessage('Welcome to my profile!');
      });
  }, []);

  const skills = [
    { name: 'React.js', level: 90, icon: '⚛️' },
    { name: 'Node.js', level: 85, icon: '🟢' },
    { name: 'PostgreSQL', level: 80, icon: '🐘' },
    { name: 'DevOps', level: 75, icon: '🔧' },
    { name: 'JavaScript', level: 95, icon: '🟨' },
    { name: 'Python', level: 70, icon: '🐍' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      status: 'Completed'
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task management with WebSocket integration',
      tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
      status: 'In Progress'
    },
    {
      title: 'DevOps Pipeline',
      description: 'Automated CI/CD pipeline with GitHub Actions and Docker deployment',
      tech: ['GitHub Actions', 'Docker', 'AWS', 'Terraform'],
      status: 'Completed'
    }
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Startup',
      period: '2023 - Present',
      description: 'Developing scalable web applications using modern technologies'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2022 - 2023',
      description: 'Created responsive and interactive user interfaces'
    },
    {
      title: 'Junior Developer',
      company: 'Software Company',
      period: '2021 - 2022',
      description: 'Learned and contributed to various web development projects'
    }
  ];

  return (
    <div className="App">
      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          <div className="profile-image">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                 alt="Profile" />
          </div>
          <h1 className="hero-title">John Developer</h1>
          <p className="hero-subtitle">Full Stack Developer & DevOps Engineer</p>
          <p className="hero-version">🚀 Version 1.1.0 - CI/CD Ready!</p>
          <p className="hero-message">{message}</p>
          {error && <p className="error-message">{error}</p>}

          <div className="hero-buttons">
            <button className="btn-primary">Download CV</button>
            <button className="btn-secondary">Contact Me</button>
          </div>

          <div className="social-links">
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">💼</a>
            <a href="#" className="social-link">🐙</a>
            <a href="#" className="social-link">🐦</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate Full Stack Developer with 3+ years of experience in building
                modern web applications. I specialize in React.js, Node.js, and cloud technologies.
              </p>
              <p>
                My journey in tech started with a curiosity about how websites work, and it has
                evolved into a career focused on creating efficient, scalable, and user-friendly
                digital solutions.
              </p>
              <div className="stats">
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-name">{skill.name}</h3>
                <div className="skill-bar">
                  <div
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <button className="btn-outline">View Demo</button>
                  <button className="btn-outline">Source Code</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience">
        <div className="container">
          <h2 className="section-title">Work Experience</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="exp-title">{exp.title}</h3>
                  <h4 className="exp-company">{exp.company}</h4>
                  <span className="exp-period">{exp.period}</span>
                  <p className="exp-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's work together!</h3>
              <p>
                I'm always interested in new opportunities and exciting projects.
                Feel free to reach out if you'd like to collaborate!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>john.developer@email.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 John Developer. Built with React.js & Node.js</p>
          <div className="footer-tech">
            <span>⚛️ React</span>
            <span>🟢 Node.js</span>
            <span>🐘 PostgreSQL</span>
            <span>🚀 Render</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
