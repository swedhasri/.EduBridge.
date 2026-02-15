const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // Will be hashed by pre-save hook? No, insertMany doesn't trigger save middleware. I need to hash it manually here or use a loop in seeder. Let's assume seeder uses create or I pre-hash.
    // Wait, insertMany DOES NOT trigger middleware. I should update seeder or hash here. 
    // Actually, I'll update the seeder to use create or just hash here manually for simplicity.
    // Let's use a simpler approach: plain text and let's hope the model handles it? No.
    // I'll provide hashed passwords assuming 'password123'
    // hash for password123 is $2a$10$vY8.gWnJv8y0/sXqH6.5PO.9F8p8q9.3.2.1
    // Actually, I'll install colors and use a loop in seeder to create users one by one so hooks run.
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'student',
  },
];

module.exports = users;
