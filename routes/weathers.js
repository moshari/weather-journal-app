const express = require('express');
const { getAll, postDate } = require('../controllers/weathers');
const router = express.Router();

router.get('/all', getAll);
router.post('/', postDate);

module.exports = router