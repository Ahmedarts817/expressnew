//passport local strategy
const passport = require('passport');
const {Strategy} = require('passport-local');
const User = require('../databse/schemas/User')
const {comparePassword} = require('../utils/helpers')

passport.serializeUser((user, done)=>{
    console.log('serlializing user ...');
    console.log(user);
    done(null, user.id)
});

passport.deserializeUser(async (id, done)=>{
    console.log('deserializing user');
    console.log(id);
    try{
        const user = await User.findById(id);
        if(!user){
            throw new Error('user not found');
        }
        console.log(user);
        done(null, user);
    }
    catch(err){
        console.log(err);
        done(err,null)
    }
});

passport.use(
    new Strategy({
        usernameField : 'email',
    },
   async (email, password, done)=>{
        console.log(email);
        console.log(password);
        try {
            if (!email || !password) {
                throw new Error('missing credentials');
            }
            const userDb = await User.findOne({email});
            const isValid = comparePassword(password,userDb.password);
            if (isValid) {
                console.log('Authentication successful');
                done(null, userDb);
            }else{
                console.log('invalid authentication');
                done(null, null)
            }
        }
        catch(err){
           console.log(err);
           done(err,null)
        }
    }
    )
)
