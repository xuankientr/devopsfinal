const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Read SQL file
const readSQLFile = (filename) => {
  const filePath = path.join(__dirname, filename);
  return fs.readFileSync(filePath, 'utf8');
};

// Run database setup
const setupDatabase = async () => {
  try {
    console.log('🚀 Starting database setup...');

    // Run schema
    console.log('📋 Creating database schema...');
    const schema = readSQLFile('schema.sql');
    await pool.query(schema);
    console.log('✅ Schema created successfully');

    // Run migrations
    console.log('🔄 Running migrations...');
    const migration = readSQLFile('migrations/001_initial_setup.sql');
    await pool.query(migration);
    console.log('✅ Migrations completed');

    // Run seeds
    console.log('🌱 Seeding default data...');
    const seeds = readSQLFile('seeds/default_data.sql');
    await pool.query(seeds);
    console.log('✅ Default data seeded');

    console.log('🎉 Database setup completed successfully!');
    
    // Test the setup
    console.log('🧪 Testing database connection...');
    const result = await pool.query('SELECT COUNT(*) as message_count FROM messages');
    console.log(`📊 Messages in database: ${result.rows[0].message_count}`);
    
    const contactResult = await pool.query('SELECT COUNT(*) as contact_count FROM contact_submissions');
    console.log(`📧 Contact submissions in database: ${contactResult.rows[0].contact_count}`);

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await pool.end();
    console.log('🔌 Database connection closed');
  }
};

// Run setup if called directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase, pool };
