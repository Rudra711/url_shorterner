const express=require('express');
const {usersignup,userlogin} = require('../controllers/user.js');
const router=express.Router();

console.log('User route accessed');
router.post('/signup',usersignup);
router.post('/login',userlogin);
module.exports=router;