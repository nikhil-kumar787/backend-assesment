const express = require('express');
const router = express.Router();
const tagcontroller = require('../controller/tagController')
const passport = require('passport');
require('../')

router.post('/addtag',tagcontroller.addtag )
router.get('/:id', tagcontroller.gettagById);
router.put('/updatetag/:id',tagcontroller.updatetag )
router.delete('/deletetag/:id',tagcontroller.deletetag )

module.exports = router;