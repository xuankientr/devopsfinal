-- Professional Profile Landing Page Database Schema
-- PostgreSQL Database Schema

-- Drop tables if they exist (for fresh setup)
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS messages;

-- Messages table for welcome messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions table
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default welcome message
INSERT INTO messages (text) VALUES 
('Welcome to my professional profile!'),
('Thanks for visiting my portfolio website!'),
('Let''s build something amazing together!');

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_messages_updated_at 
    BEFORE UPDATE ON messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE messages IS 'Stores welcome messages displayed on the landing page';
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from visitors';

COMMENT ON COLUMN contact_submissions.status IS 'Status of the contact submission: new, read, replied, archived';
COMMENT ON COLUMN messages.text IS 'The welcome message text displayed on the homepage';

-- Sample data for testing (optional)
-- Uncomment the lines below if you want sample contact submissions for testing

/*
INSERT INTO contact_submissions (name, email, message, status) VALUES 
('John Doe', 'john.doe@example.com', 'Hi! I would like to discuss a potential project collaboration.', 'new'),
('Jane Smith', 'jane.smith@example.com', 'Your portfolio looks amazing! Are you available for freelance work?', 'read'),
('Mike Johnson', 'mike.j@example.com', 'I saw your React project and I''m impressed. Let''s connect!', 'replied');
*/
