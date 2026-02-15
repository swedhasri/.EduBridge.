const express = require('express');
const { chatAi } = require('../controllers/aiController');
const router = express.Router();
router.post('/chat', chatAi);
module.exports = router;
