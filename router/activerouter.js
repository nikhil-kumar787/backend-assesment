const express = require('express');
const router = express.Router();
const activecontroller = require('../controller/activeuserController')

router.get('/day', activecontroller.currentDay)
router.get('/month', activecontroller.currentMonth)

module.exports = router;