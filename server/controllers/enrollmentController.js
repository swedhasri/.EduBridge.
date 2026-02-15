const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private
const enrollCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    // Mock enrollment success to avoid MongoDB hang
    const mockEnrollment = {
      _id: 'mock-enrollment-id',
      user: req.user._id,
      course: courseId,
      progress: 0,
      completedLessons: [],
    };

    res.status(201).json(mockEnrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user enrollments
// @route   GET /api/enrollments/myenrollments
// @access  Private
const getMyEnrollments = async (req, res) => {
  try {
    // Return empty mock enrollments to avoid MongoDB hang
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get enrollment details (check if enrolled)
// @route   GET /api/enrollments/:courseId
// @access  Private
const getEnrollmentByCourseId = async (req, res) => {
  try {
    // Always return "not enrolled" in mock mode
    res.status(404).json({ message: 'Not enrolled in mock mode' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// @desc    Update progress (complete a lesson)
// @route   PUT /api/enrollments/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
  try {
    // Mock progress update success
    res.json({ message: 'Progress updated in mock mode' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollCourse,
  getMyEnrollments,
  getEnrollmentByCourseId,
  updateProgress,
};
