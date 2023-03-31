const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const categorySchema = new Schema({
  name: String,
  description: String,
  imgUrl: String,
  products:[{
    name:String,
    description: String,
    imgUrl: String,
  },
],
});
 
 
// Create a model based on that schema
const Category = mongoose.model("Category", categorySchema);
 
 
// export the model
module.exports = Category; 