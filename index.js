require('dotenv').config();
const express = require("express")
const {connectDb} = require('./connect.js')
const {restricttologin,checkAuth}=require('./middleware/auth.js')
const URL=require('./models/url.js')

const urlroute=require('./routes/url.js')
const staticRouter=require('./routes/staticRouter.js')
const userRoute=require('./routes/user.js')

const app=express();
const PORT = process.env.PORT || 3000;

const path = require('path');
const cookieParser=require('cookie-parser');

connectDb(process.env.MONGODB_URI);

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/user',userRoute);
app.use('/url',restricttologin,urlroute);
app.use('/',checkAuth,staticRouter);

app.get('/test',async(req,res)=>{
    const allurls=await URL.find({});
    return res.render("home",{
        urls:allurls,
    });
})
console.log("in the index.js");

app.get('/url/:shortid',async(req,res)=>{
    const shortid=req.params.shortid;
    const entry=  await URL.findOneAndUpdate(
        { shortid},{
            $push:{
                visit_hist:{timestamp:Date.now()},
            },
        }
    )

    if (entry) {
        res.redirect(entry.redirecturl);
    } else {
        res.status(404).send('URL not found');
    }
})

app.get('/get_data/:shortid',async(req,res)=>{
    const shortid=req.params.shortid;
    const result=await URL.findOne({shortid});

    return res.json({
        total_clicks:result.visit_hist.length,
        analytic:result.visit_hist
    })
})

app.listen(PORT,()=>console.log("Server Satrted"));