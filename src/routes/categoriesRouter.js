const express = require('express');
const router = express.Router();
const Category = require("../models/categorySchema");



router.get('/',(req, res) => {
    Category.find().then((result)=>{
      res.render("categories",{arrCategories:result});
    }).catch((err)=>{
      console.log(err);
    })
  })
  
  router.post('/',(req,res)=>{
    const category = new Category(req.body);    
    category.save().then((result)=>{
      res.redirect('/categories');
    }).catch(err=>{console.log(err);})
  })
  
  router.get('/:id',(req,res)=>{
    Category.findById(req.params.id)
    .then((result)=>{
      res.render('categoryDetails',{objCategory:result})
    }).catch((err)=>{console.log(err);})
  })

  router.get('/edit/:id',(req,res)=>{
    Category.findById(req.params.id)
    .then((result)=>{
      res.render('editCategory',{objCategory:result})
    }).catch((err)=>{console.log(err);})
  })
  
  router.post('/edit/:id',(req,res)=>{
  Category.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      description:req.body.description,
      imgUrl:req.body.imgUrl,
      products:{}
    },{new:true})
    .then((params)=>{
     res.redirect('/categories')
    }).catch(err=>console.log(err))
  })


  module.exports = router;