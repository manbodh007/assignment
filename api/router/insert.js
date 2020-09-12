const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/question',require('../controller/insert').insertQuestion);
module.exports = router;