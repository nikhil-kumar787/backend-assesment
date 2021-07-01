const express = require('express');
const router = express.Router();
const commentcontroller = require('../controller/todocomments')
const passport = require('passport');
require('../')

router.post('/addcomment',passport.authenticate('jwt',{session:false}),commentcontroller.addcomment )
router.get('/:id', commentcontroller.getcommentById);
router.put('/updatecomment/:id',commentcontroller.updatecomment )
router.delete('/deletecomment/:id',commentcontroller.deletecomment )

module.exports = router;