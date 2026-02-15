const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  getMyEnrollments,
  getEnrollmentByCourseId,
  updateProgress,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, enrollCourse);
router.route('/myenrollments').get(protect, getMyEnrollments);
router.route('/:courseId').get(protect, getEnrollmentByCourseId);
router.route('/:id/progress').put(protect, updateProgress);

module.exports = router;
