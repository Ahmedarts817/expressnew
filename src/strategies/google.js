const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser =  require('../databse/schemas/GoogleUser')

passport.serializeUser((user, done)=>{
    console.log('serlializing user ...');
    console.log(user);
    done(null, user.id)
});

passport.deserializeUser(async (id, done)=>{
    console.log('deserializing user');
    console.log(id);
    try{
        const user = await GoogleUser.findById(id);
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
    new GoogleStrategy(
        {
            clientID : process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            scope:['email','profile'],
            callbackURL : "http://localhost:3001/auth/google/redirect"
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(accessToken,refreshToken);
            console.log(profile);
           try {
            const userDb = await GoogleUser.findOne({ googleId: profile.id })
            if (userDb) {
                console.log(`found user ${userDb}`);
             return done(null,userDb)
            }else{
                const newUser =await GoogleUser.create({googleId : profile.id});
                console.log(`created user ${newUser}`);
                return done(null,newUser)
            }
           } catch (error) {
            console.log(error);
            return done(err,null)
           }
          }
    )
)
