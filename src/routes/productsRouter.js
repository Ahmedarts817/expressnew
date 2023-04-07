const express= require('express');
const router = express.Router();
const Category = require("../models/categorySchema");


  router.get('/add',(req,res)=>{
  Category.find()
  .then((result)=>{
    res.render('products/addProduct',{arrCategories:result})
  }).catch((err)=>{console.log(err)})
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
  router.get('/:id',(req,res)=>{
    Category.findOne({'products._id':`${req.params.id}`})
    .then((result)=>{
      const product = result.products.id(req.params.id)
      res.render('./products/showProduct',{product:product})
    }).catch((err)=>{console.log(err);})
  })

  router.delete('/:id',async (req,res)=>{
    const doc =  await Category.findOne({'products._id':`${req.params.id}`
    })   
    doc.products.pull(req.params.id);
    await  doc.save()

    .then((result)=>{
     res.json({link:'/products'})

    })
    .catch(err=>console.log(err))
  })


module.exports = router;