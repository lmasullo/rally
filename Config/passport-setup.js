//Dependencies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// Require Users model
const db = require('../Models');

//Create a unique cookie
//This gets called after done is set below after authentication
//The null is if there is an error
passport.serializeUser((user, done)=>{
  //When done authenticating user create cookie
  done(null, user.id);
});

//Cookie comes back from browser, now get user
passport.deserializeUser((id, done)=>{
  db.User.findById(id).then((user)=>{
    //Have user, now pass to done and to next stage (using in route handlers)
    done(null, user);
  });
});


//Use Passport to Authenticate on Google
passport.use(
  new GoogleStrategy({
    //Options for the strategy
    //Need to setup on Google at https://console.cloud.google.com/apis/credentials?project=racquet-rally
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
  //These parameters are what come back from Google
  //accessToken - use this to alter users profile
  //refreshToken - refreshes the accessToken after it expires
  //profile - this is the info we need
  //done - this we call when all done
  },(accessToken, refreshToken, profile, done)=> {
    //Passport Callback function
    //This fires after we have a successful login from Google
    //This is all the user's profile info
    //console.log('Profile: ', profile);

    db.User.findOneAndUpdate({googleID: profile.id}, {$set: { currentUser: true}})
    .then((currentUser)=>{
      if(currentUser){
        console.log("Found User" + currentUser);
        //Authentication successful, pass user to done method
        done(null, currentUser);
        
      }else{     
        new db.User({
          name: profile.displayName,
          googleID: profile.id,
          image: profile.photos[0].value,
          email: profile.email,
          currentUser: true,
        }).save()
        .then((newUser)=>{
          console.log('New User Created' + newUser);
          //New User created, pass user to done method
          done(null, newUser);
        });//End Save User   
      }//End check for user
    });//End findOne
  })//End 2nd parameter on Passport use
);//End Passport use