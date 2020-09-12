const express = require('express');
const router = express.Router();

router.get('/question',require('../controller/search').searchQuery);

module.exports = router;