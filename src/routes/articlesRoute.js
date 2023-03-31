const express = require('express');
const router = express.Router();
const control = require('../controller/routerControl')
//send data to database

// router.get("/", (req, res) => {
//   res.render("index")
// });



router.get("/", control.article_get);


router.post('/',control.article_add_post);

  router.get("/:id",control.article_show)
  
  router.delete('/:id',control.article_delete)

  module.exports = router;