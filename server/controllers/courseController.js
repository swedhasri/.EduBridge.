const coursesData = require('../data/courses');
const Course = require('../models/Course'); // Keep model for other uses if needed

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    let courses = [...coursesData];

    // Basic filtering for keyword and category if needed
    if (req.query.keyword) {
      const keyword = req.query.keyword.toLowerCase();
      courses = courses.filter(c =>
        c.title.toLowerCase().includes(keyword) ||
        c.description.toLowerCase().includes(keyword)
      );
    }

    if (req.query.category && req.query.category !== 'All') {
      courses = courses.filter(c => c.category === req.query.category);
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    // Attempt to find in local data first (by title or ID if available)
    // Since mock data might not have MongoDB ObjectIDs, we search by ID or Title
    const course = coursesData.find(c => c._id === req.params.id || c.title === req.params.id);

    if (course) {
      res.json(course);
    } else {
      // Fallback: try to find by ID in local data if the param is an index
      const index = parseInt(req.params.id);
      if (!isNaN(index) && coursesData[index]) {
        res.json(coursesData[index]);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  res.status(403).json({ message: 'Dynamic course creation disabled in mock mode' });
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  res.status(403).json({ message: 'Dynamic course deletion disabled in mock mode' });
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
};
