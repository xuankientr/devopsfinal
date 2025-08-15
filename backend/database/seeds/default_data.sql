-- Seed Data for Professional Profile Landing Page
-- Description: Default data for the application

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM contact_submissions;
-- DELETE FROM messages;

-- Insert default welcome messages
INSERT INTO messages (text) VALUES 
('Welcome to my professional profile!'),
('Thanks for visiting my portfolio website!'),
('Let''s build something amazing together!'),
('Passionate developer ready for new challenges!'),
('Your next project starts here!')
ON CONFLICT DO NOTHING;

-- Insert sample contact submissions for testing (optional)
-- Uncomment the section below if you want sample data for development

/*
INSERT INTO contact_submissions (name, email, message, status) VALUES 
('John Doe', 'john.doe@example.com', 'Hi! I would like to discuss a potential project collaboration. Your React skills look impressive!', 'new'),
('Jane Smith', 'jane.smith@example.com', 'Your portfolio looks amazing! Are you available for freelance work? I have a startup project.', 'read'),
('Mike Johnson', 'mike.j@example.com', 'I saw your React project and I''m impressed. Let''s connect and discuss opportunities!', 'replied'),
('Sarah Wilson', 'sarah.w@example.com', 'Great work on the DevOps pipeline! Would love to learn more about your experience.', 'new'),
('David Brown', 'david.brown@example.com', 'Interested in hiring you for a full-stack development project. When are you available?', 'read')
ON CONFLICT DO NOTHING;
*/

-- Update sequence values to ensure proper auto-increment
SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages));
SELECT setval('contact_submissions_id_seq', (SELECT MAX(id) FROM contact_submissions));
