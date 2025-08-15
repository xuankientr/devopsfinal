# Database Documentation

## 📊 Database Schema

This directory contains all database-related files for the Professional Profile Landing Page.

## 📁 File Structure

```
backend/database/
├── schema.sql              ← Complete database schema
├── setup.js               ← Database setup script
├── migrations/
│   └── 001_initial_setup.sql
├── seeds/
│   └── default_data.sql
└── README.md
```

## 🗄️ Tables

### `messages`
Stores welcome messages displayed on the landing page.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier |
| text | VARCHAR(255) | Welcome message text |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### `contact_submissions`
Stores contact form submissions from visitors.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Unique identifier |
| name | VARCHAR(100) | Visitor's name |
| email | VARCHAR(100) | Visitor's email |
| message | TEXT | Contact message |
| status | VARCHAR(20) | Submission status (new, read, replied, archived) |
| created_at | TIMESTAMP | Submission timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## 🚀 Setup Instructions

### Option 1: Automatic Setup (Recommended)
```bash
cd backend
node database/setup.js
```

### Option 2: Manual Setup
```bash
# Connect to your PostgreSQL database
psql -d your_database_url

# Run schema
\i backend/database/schema.sql

# Run seeds (optional)
\i backend/database/seeds/default_data.sql
```

### Option 3: Using Environment Variables
```bash
# Set your database URL
export DATABASE_URL="postgresql://username:password@host:port/database"

# Run setup
cd backend
node database/setup.js
```

## 🔧 Database Configuration

### Local Development
```bash
# Create .env file in backend directory
DATABASE_URL=postgresql://username:password@localhost:5432/profile_db
NODE_ENV=development
```

### Production (Render)
```bash
# Environment variables in Render dashboard
DATABASE_URL=postgresql://render_provided_url
NODE_ENV=production
```

## 📝 Sample Queries

### Get all messages
```sql
SELECT * FROM messages ORDER BY created_at DESC;
```

### Get recent contact submissions
```sql
SELECT name, email, message, created_at 
FROM contact_submissions 
WHERE status = 'new' 
ORDER BY created_at DESC 
LIMIT 10;
```

### Update contact submission status
```sql
UPDATE contact_submissions 
SET status = 'read' 
WHERE id = 1;
```

### Get contact statistics
```sql
SELECT 
    status,
    COUNT(*) as count,
    MAX(created_at) as latest_submission
FROM contact_submissions 
GROUP BY status;
```

## 🔍 Indexes

The following indexes are created for better performance:

- `idx_contact_submissions_email` - For email lookups
- `idx_contact_submissions_created_at` - For date-based queries
- `idx_contact_submissions_status` - For status filtering

## 🔄 Triggers

### Auto-update timestamps
- `update_messages_updated_at` - Updates `updated_at` on messages table
- `update_contact_submissions_updated_at` - Updates `updated_at` on contact_submissions table

## 🧪 Testing

### Verify setup
```bash
# Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

# Check sample data
SELECT COUNT(*) FROM messages;
SELECT COUNT(*) FROM contact_submissions;
```

### Insert test data
```sql
INSERT INTO contact_submissions (name, email, message) 
VALUES ('Test User', 'test@example.com', 'This is a test message');
```

## 🔒 Security Notes

- Never commit database credentials to version control
- Use environment variables for database URLs
- Enable SSL in production
- Regularly backup your database
- Monitor for SQL injection attempts

## 📈 Monitoring

### Useful queries for monitoring:

```sql
-- Daily contact submissions
SELECT DATE(created_at) as date, COUNT(*) as submissions
FROM contact_submissions 
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Database size
SELECT pg_size_pretty(pg_database_size(current_database())) as database_size;

-- Table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```
