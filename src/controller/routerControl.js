const Article = require("../models/articleSchema");

const article_get = (req, res) => {
    Article.find().then((result)=>{
      res.render("articles/articles",{arrArticle:result});
    }).catch((err)=>{
      console.log(err);
    })
  }

  const article_add_post = (req,res)=>{
    const article = new Article(req.body);    
    article.save().then((result)=>{
      res.redirect('/articles');
    }).catch(err=>{console.log(err);})
  
  }

  const article_show = (req,res)=>{
    Article.findById(req.params.id)
    .then((result)=>{
      res.render("articles/details",{objArticle:result})
    })
    .catch((err)=>{console.log(err);})
  }


  const article_delete = (req,res)=>{
    Article.findByIdAndDelete(req.params.id)
    .then(params=>{res.json({link:'/articles'})})
    .catch(err=>console.log(err))
  }

  module.exports = {article_get, article_add_post, article_delete, article_show}