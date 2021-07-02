const express = require('express');
const router = express.Router();
const todocontroller = require('../controller/todocontroller')
const passport = require('passport');
require('../')

router.get('/', todocontroller.getalltodo);
router.post('/addtodo',todocontroller.addtodo )
router.get('/:id', todocontroller.gettodoById);
router.put('/updatetodo/:id',todocontroller.updatetodo )
router.post('/updatestatus',todocontroller.updateStatus )
router.delete('/deletetodo/:id',todocontroller.deletetodo )
// router.get('/count/:id', todocontroller.taskCount);
router.get('/count',todocontroller.maxCount)



module.exports = router;