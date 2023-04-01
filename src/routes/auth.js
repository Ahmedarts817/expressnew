const express = require('express');
const passport = require('passport')
const router = express.Router()
const User = require('../databse/schemas/User')
const{hashPassword, comparePassword} = require('../utils/helpers')



router.post('/register',async(req,res)=>{
    const {username, email} = req.body;
    const userDb = await User.findOne({$or:[{username},{email}]});
    if (!username ||!password || !email) {
        console.log("empty");
        res.sendStatus(400)
    }else{
        if (userDb) {
            console.log('exist');
            res.status(401).send('exist')
        } else {
            const password = hashPassword(req.body.password);
            const newUser = await User.create({username,password,email});
            res.sendStatus(200)
        }
    }
   
})

//Basic login

// router.post('/login',async(req,res)=>{
//    const {email, password} = req.body;
//    const userDb = await User.findOne({email});
//    if (!email || !password) {
//    return res.sendStatus(400)
//    }
// if (!userDb) {
//   return  res.sendStatus('401')
// }
//    const isValid = comparePassword(password,userDb.password)
//    if (isValid) {
//     req.session.user = userDb
//     return res.sendStatus(200)
//    }
// })

router.get('/login',(req,res)=>{
    res.render('login')
})


//Login with passport
router.post('/login',passport.authenticate('local'),(req,res)=>{
    console.log('logged in');
    res.sendStatus(200);
})

router.get('/google',passport.authenticate('google'),(req,res)=>{
    res.sendStatus(200)
})

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/protected');
})
router.get('/protected',(req,res)=>{
    res.send(`hi `)
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
})
module.exports = router;