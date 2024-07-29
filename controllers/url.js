const shortid = require('shortid');

const URL=require('../models/url');

const generateurl = async(req,res)=>{
    console.log("in the controller");
    const body = req.body;
    if(!body.url) return res.status(400).json({
        error:'url not got'
    })
    const sid = shortid.generate();
    if (!sid) return res.status(500).json({ error: 'Failed to generate shortid' });
    await URL.create({
        shortid:sid,
        redirecturl:body.url,
        visit_hist:[],
        createdBy:req.user._id,
    });
    //const allurls=await URL.find({});
    return res.render('home',{
        id:sid
    })
    
};

// async function generateurl (req,res){
    
// }

module.exports =generateurl;