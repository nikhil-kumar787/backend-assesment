const express = require('express');
const router = express.Router();
const viewcontroller = require('../controller/viewController')


router.post('/addview',viewcontroller.viewtodoByUser )

module.exports = router;