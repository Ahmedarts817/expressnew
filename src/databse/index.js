const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ahmedarts817:253461@cluster0.n9exzh7.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))