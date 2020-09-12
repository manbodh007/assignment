const express = require('express');
const router = express.Router();

router.use('/search',require('./search'));
router.use('/insert',require('./insert'));

module.exports = router;