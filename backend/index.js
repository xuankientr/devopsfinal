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
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Profile API endpoints
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'John Developer',
    title: 'Full Stack Developer & DevOps Engineer',
    email: 'john.developer@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate Full Stack Developer with 3+ years of experience in building modern web applications.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
  });
});

app.get('/api/skills', (req, res) => {
  res.json([
    { name: 'React.js', level: 90, icon: '⚛️', category: 'Frontend' },
    { name: 'Node.js', level: 85, icon: '🟢', category: 'Backend' },
    { name: 'PostgreSQL', level: 80, icon: '🐘', category: 'Database' },
    { name: 'DevOps', level: 75, icon: '🔧', category: 'Operations' },
    { name: 'JavaScript', level: 95, icon: '🟨', category: 'Language' },
    { name: 'Python', level: 70, icon: '🐍', category: 'Language' },
    { name: 'Docker', level: 80, icon: '🐳', category: 'DevOps' },
    { name: 'AWS', level: 75, icon: '☁️', category: 'Cloud' }
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
