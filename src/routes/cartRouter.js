const express = require('express');
const router = express.Router();

router.use((req,res,next)=>{
    if (req.user) {
      next();
    }else{
        res.sendStatus(401)
    }
})

router.get('/',(req,res)=>{
    res.render('cart.ejs')
})


module.exports = router;