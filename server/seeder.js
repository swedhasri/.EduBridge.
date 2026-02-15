const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const courses = require('./data/courses');
const User = require('./models/User');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const Notification = require('./models/Notification');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const STUDY_NOTIFICATIONS = [
  'Reminder: Study for at least 30 minutes today to stay on track!',
  'Tip: Review your course materials—consistency beats cramming.',
  'Time to learn! Your next lesson is waiting. Keep the streak alive!',
  'Study reminder: A little progress each day adds up to big results.',
  'Ready to learn? Spend 20 minutes on a course you\'re working on.',
  'Don\'t forget: Daily practice builds mastery. Start a session today!',
  'Your brain will thank you: 15 minutes of study can make a difference.',
];

const importData = async () => {
  try {
    await Notification.deleteMany();
    await Enrollment.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    // Create users one by one to trigger pre-save hook for password hashing
    const createdUsers = [];
    for (const user of users) {
        const newUser = await User.create(user);
        createdUsers.push(newUser);
    }

    const adminUser = createdUsers[0]._id;

    const sampleCourses = courses.map((course) => {
      return { ...course, user: adminUser };
    });

    await Course.insertMany(sampleCourses);

    // Create study notifications for each user
    for (const user of createdUsers) {
      const count = 2 + Math.floor(Math.random() * 3); // 2-4 notifications per user
      const shuffled = [...STUDY_NOTIFICATIONS].sort(() => Math.random() - 0.5);
      for (let i = 0; i < count; i++) {
        await Notification.create({
          user: user._id,
          message: shuffled[i],
          type: 'info',
          isRead: Math.random() > 0.5
        });
      }
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Notification.deleteMany();
    await Enrollment.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
