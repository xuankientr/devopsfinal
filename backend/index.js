const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database tables
const initDB = async () => {
  try {
    // Messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if we have any messages, if not insert default
    const result = await pool.query('SELECT COUNT(*) FROM messages');
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query("INSERT INTO messages (text) VALUES ('Welcome to my professional profile!')");
    }

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
};

// Routes
app.get('/api/message', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages LIMIT 1');
    res.json(result.rows[0] || { text: 'Welcome to my professional profile!' });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is running perfectly! Auto-deploy test active 🚀',
    timestamp: new Date().toISOString(),
    version: '1.1.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Auto-deploy test endpoint
app.get('/api/test-autodeploy', (req, res) => {
  res.json({
    message: 'Auto-deploy test successful! 🎉',
    timestamp: new Date().toISOString(),
    commit: 'Testing GitHub Actions auto-deployment',
    status: 'deployed'
  });
});

// New endpoint: Get contact information
app.get('/api/contact-info', (req, res) => {
  res.json({
    email: 'xuankien.dev@email.com',
    phone: '+84 (123) 456-7890',
    location: {
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      timezone: 'GMT+7'
    },
    availability: {
      status: 'Available for projects',
      workingHours: '9:00 AM - 6:00 PM (GMT+7)',
      responseTime: 'Within 24 hours'
    },
    preferredContact: 'email',
    languages: ['Vietnamese', 'English'],
    lastUpdated: new Date().toISOString()
  });
});

// Profile API endpoints
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Xuân Kiên Developer',
    title: 'Full Stack Developer & DevOps Engineer',
    email: 'xuankien.dev@email.com',
    phone: '+84 (123) 456-7890',
    location: 'Ho Chi Minh City, Vietnam',
    bio: 'Passionate Full Stack Developer with expertise in React, Node.js, and DevOps. Experienced in building scalable web applications with modern CI/CD pipelines.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    social: {
      github: 'https://github.com/xuankientr',
      linkedin: 'https://linkedin.com/in/xuankien',
      website: 'https://xuankien.dev'
    },
    stats: {
      projectsCompleted: 25,
      yearsExperience: 3,
      technologiesUsed: 15,
      clientsSatisfied: 20
    },
    lastUpdated: new Date().toISOString()
  });
});

app.get('/api/skills', (req, res) => {
  res.json([
    { name: 'React.js', level: 95, icon: '⚛️', category: 'Frontend' },
    { name: 'Node.js', level: 90, icon: '🟢', category: 'Backend' },
    { name: 'PostgreSQL', level: 85, icon: '🐘', category: 'Database' },
    { name: 'DevOps', level: 80, icon: '🔧', category: 'Operations' },
    { name: 'JavaScript', level: 98, icon: '🟨', category: 'Language' },
    { name: 'TypeScript', level: 85, icon: '🔷', category: 'Language' },
    { name: 'Python', level: 75, icon: '🐍', category: 'Language' },
    { name: 'Docker', level: 85, icon: '🐳', category: 'DevOps' },
    { name: 'AWS', level: 80, icon: '☁️', category: 'Cloud' },
    { name: 'GitHub Actions', level: 90, icon: '🔄', category: 'CI/CD' },
    { name: 'Render', level: 85, icon: '🚀', category: 'Deployment' },
    { name: 'MongoDB', level: 80, icon: '🍃', category: 'Database' }
  ]);
});

app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redux'],
      status: 'Completed',
      github: 'https://github.com/johndeveloper/ecommerce',
      demo: 'https://ecommerce-demo.com',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Real-time collaborative task management application with WebSocket integration for live updates and team collaboration.',
      tech: ['React', 'Socket.io', 'MongoDB', 'Express', 'Material-UI'],
      status: 'In Progress',
      github: 'https://github.com/johndeveloper/taskmanager',
      demo: 'https://taskmanager-demo.com',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: 'DevOps Pipeline',
      description: 'Automated CI/CD pipeline with GitHub Actions, Docker containerization, and AWS deployment infrastructure.',
      tech: ['GitHub Actions', 'Docker', 'AWS', 'Terraform', 'Kubernetes'],
      status: 'Completed',
      github: 'https://github.com/johndeveloper/devops-pipeline',
      demo: null,
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop'
    }
  ]);
});

app.get('/api/experience', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2023 - Present',
      location: 'San Francisco, CA',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Increased application performance by 40%',
        'Led team of 5 developers',
        'Implemented microservices architecture'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2022 - 2023',
      location: 'San Francisco, CA',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with design and product teams.',
      achievements: [
        'Delivered 15+ successful projects',
        'Reduced deployment time by 60%',
        'Implemented automated testing'
      ]
    },
    {
      id: 3,
      title: 'Junior Developer',
      company: 'StartupXYZ',
      period: '2021 - 2022',
      location: 'San Francisco, CA',
      description: 'Started career contributing to various web development projects. Learned modern development practices and agile methodologies.',
      achievements: [
        'Contributed to 10+ projects',
        'Learned React and Node.js',
        'Participated in code reviews'
      ]
    }
  ]);
});

// Blog posts API endpoint
app.get('/api/blog', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Building Modern Web Apps with React and Node.js',
      excerpt: 'Learn how to create scalable full-stack applications using modern technologies.',
      content: 'In this comprehensive guide, we will explore the best practices for building modern web applications...',
      author: 'Xuân Kiên',
      publishedDate: '2024-08-10',
      tags: ['React', 'Node.js', 'Full Stack'],
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      title: 'DevOps Best Practices with GitHub Actions',
      excerpt: 'Automate your deployment pipeline with GitHub Actions and improve your development workflow.',
      content: 'GitHub Actions has revolutionized the way we handle CI/CD pipelines...',
      author: 'Xuân Kiên',
      publishedDate: '2024-08-05',
      tags: ['DevOps', 'GitHub Actions', 'CI/CD'],
      readTime: '6 min read',
      featured: false
    },
    {
      id: 3,
      title: 'Database Design for Scalable Applications',
      excerpt: 'Design efficient database schemas that can handle growth and maintain performance.',
      content: 'When building applications that need to scale, database design becomes crucial...',
      author: 'Xuân Kiên',
      publishedDate: '2024-07-28',
      tags: ['Database', 'PostgreSQL', 'Performance'],
      readTime: '10 min read',
      featured: false
    }
  ]);
});

// Testimonials API endpoint
app.get('/api/testimonials', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Product Manager',
      company: 'TechCorp Inc.',
      message: 'Xuân Kiên delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      date: '2024-07-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO',
      company: 'StartupXYZ',
      message: 'Working with Xuân Kiên was a pleasure. He implemented our complex requirements with clean, maintainable code and delivered on time.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      date: '2024-06-20'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Lead Developer',
      company: 'Digital Solutions',
      message: 'Excellent collaboration and problem-solving skills. The CI/CD pipeline setup saved us countless hours of manual deployment.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      date: '2024-06-10'
    }
  ]);
});

// Get single blog post by ID
app.get('/api/blog/:id', (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogs = [
    {
      id: 1,
      title: 'Building Modern Web Apps with React and Node.js',
      content: `# Building Modern Web Apps with React and Node.js

In this comprehensive guide, we will explore the best practices for building modern web applications using React for the frontend and Node.js for the backend.

## Why React and Node.js?

React and Node.js form a powerful combination for full-stack development:

- **React**: Provides a component-based architecture for building interactive UIs
- **Node.js**: Enables JavaScript on the server-side with excellent performance
- **Shared Language**: Use JavaScript across the entire stack

## Getting Started

Let's start by setting up our development environment...`,
      author: 'Xuân Kiên',
      publishedDate: '2024-08-10',
      tags: ['React', 'Node.js', 'Full Stack'],
      readTime: '8 min read'
    }
    // Add more detailed blog posts here
  ];

  const blog = blogs.find(b => b.id === blogId);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'Blog post not found' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    await pool.query(
      'INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );

    console.log('Contact form submission saved:', { name, email });

    res.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get contact submissions (for admin use)
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Backend is running on port ${PORT}`);
  await initDB();
});
