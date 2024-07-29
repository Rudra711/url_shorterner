const {v4:uuidv4}=require('uuid')
const User = require("../models/user");
const {setUser,getUser}=require('../service/auth')

async function usersignup(req,res){
    const {name,email,password}=req.body;

    await User.create({
        name:name,
        email:email,
        password:password,
    });
    return res.render('home');
}

async function userlogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email,
        password: password,
    });

    if (!user) {
        return res.render('login', {
            error: 'INVALID USERNAME OR PASSWORD',
        });
    }
    const token=setUser(user);
    res.cookie("uid", token);
    return res.redirect('/');
}

module.exports={
    usersignup,
    userlogin,
};