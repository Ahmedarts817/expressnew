const express= require('express');
const router = express.Router();
const Category = require("../models/categorySchema");


router.get('/addProduct',(req, res) => {
    Category.find().then((result)=>{
      res.render("./products/addProduct",{arrCategories:result});
    }).catch((err)=>{
      console.log(err);
    })
  })
  
  router.post('/add',(req,res)=>{
    const data = {
      name:req.body.name,
      description:req.body.description,
      imgUrl:req.body.imgUrl
    }
 Category.findByIdAndUpdate(req.body.category,{
  $push: { products: data } 
 })
.then((result)=>{
      res.redirect('/products');
    }).catch(err=>{console.log(err);})
  })

  router.get('/',(req,res)=>{
    Category.find()
    .then((result)=>{
      res.render('./products/products',{arrCategories:result})
    }).catch((err)=>{console.log(err);})
  })

  router.delete('/:id',(req,res)=>{
    Category.findByIdAndDelete(req.params.id)
    .then((params)=>{
     res.json({link:'/categories'})
    }).catch(err=>console.log(err))
  })




module.exports = router;