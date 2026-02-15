const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    progress: {
      type: Number,
      default: 0, // Percentage
    },
    completedLessons: [
      {
        type: String, // ID of the completed chapter/lesson
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    certificateUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
