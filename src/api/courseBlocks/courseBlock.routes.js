const express = require('express');
const controller = require('./courseBlock.controller');

const router = express.Router();

router.get('/', controller.indexGet);
router.post('/create', controller.createPost);

module.exports = router;