//Dependencies
const router = require('express').Router();
const passport = require('passport');

//Routes

//Auth with Google
//Need to add the middleware passport.authenticate('google')
//This will try and authenticate
router.get('/google', passport.authenticate('google',{
  //The scope is setup on Google at https://console.cloud.google.com/apis/credentials?project=racquet-rally
  scope: ['profile']
}));

//Auth Callback
//Need to add the middleware passport.authenticate('google')
//Already authenticated, passport sees the code in the url, will exchange code for profile
//This fires the callback on passport-setup
router.get('/google/redirect', passport.authenticate('google'),(req,res)=>{
  //This response if the final response after all done and logged in! 
  //Passport gives you the currently logged in user from the db in req.user 
  //res.send('This is the Callback URI - Logged In!' + req.user);
  //res.redirect("http://localhost:4000/profile/");
  res.redirect('http://localhost:3000/main')
});


// //Auth Logout
// router.get('/logout', (req,res)=>{
//   //Handle with Passport
//   res.send('Logging Out')
// })

module.exports = router;