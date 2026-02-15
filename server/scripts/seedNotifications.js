const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Notification = require('../models/Notification');

const STUDY_NOTIFICATIONS = [
  'Reminder: Study for at least 30 minutes today to stay on track!',
  'Tip: Review your course materials—consistency beats cramming.',
  'Time to learn! Your next lesson is waiting. Keep the streak alive!',
  'Study reminder: A little progress each day adds up to big results.',
  'Ready to learn? Spend 20 minutes on a course you\'re working on.',
  'Don\'t forget: Daily practice builds mastery. Start a session today!',
  'Your brain will thank you: 15 minutes of study can make a difference.',
  'Stay curious! Open a course and learn something new.',
];

const seedNotifications = async () => {
  try {
    await connectDB();

    const users = await User.find({});
    if (users.length === 0) {
      console.log('No users found. Run the main seeder first (node seeder.js).');
      process.exit(1);
    }

    for (const user of users) {
      const count = 3 + Math.floor(Math.random() * 3); // 3-5 notifications per user
      const shuffled = [...STUDY_NOTIFICATIONS].sort(() => Math.random() - 0.5);
      for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        await Notification.create({
          user: user._id,
          message: shuffled[i],
          type: 'info',
          isRead: false
        });
      }
      console.log(`Added ${count} study notifications for ${user.email}`);
    }

    console.log('Study notifications seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedNotifications();
