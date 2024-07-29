const express=require('express');
const generateurl = require('../controllers/url.js');
const router=express.Router();
console.log("in url route");

router.post('/',generateurl);

module.exports = router;