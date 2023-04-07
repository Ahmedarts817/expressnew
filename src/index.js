const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
app.set('view engine','ejs');
app.set('views','src/views')
app.use(express.static('public'))
const cookieParser = require('cookie-parser')
const session = require('express-session')
// local memory store
const memoryStore = new session.MemoryStore()

const passport = require('passport')
require('./strategies/local')
require('./strategies/google')
const  MongoStore = require('connect-mongo')
require('./databse')


const authRouter = require('./routes/auth')
const cartRouter = require('./routes/cartRouter')
const articleRoute = require('./routes/articlesRoute');
const categoriesRouter = require('./routes/categoriesRouter');
const productsRouter = require('./routes/productsRouter');
const wishlistRouter = require('./routes/wishlistRouter')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret:"abcsdefg",
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://ahmedarts817:253461@cluster0.n9exzh7.mongodb.net/?retryWrites=true&w=majority'
    }),
    //local memorystore
    // store: memoryStore,
}))

// local memory store
// app.use((req,res,next)=>{
//     console.log(memoryStore);
//     next();
// })

app.use(passport.initialize())
app.use(passport.session())
app.use('/auth',authRouter)
app.use('/cart',cartRouter)



app.get('/',(req,res)=>{
    res.render('index')
  })
  
  
  
  
  
  app.get('/admin',(req,res)=>{
    res.render('admin')
  })
  
  
  app.use('/categories',categoriesRouter)
  app.use('/products',productsRouter)
  
  app.use('/articles',articleRoute);
  app.use('/wishlist',wishlistRouter)


app.listen(port,()=>{
    console.log('listened');
})