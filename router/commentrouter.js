const express = require('express');
const router = express.Router();
const commentcontroller = require('../controller/todocomments')
const passport = require('passport');
require('../')

router.post('/addcomment',passport.authenticate('jwt',{session:false}),commentcontroller.addcomment )
router.get('/:id', commentcontroller.getcommentById);

module.exports = router;