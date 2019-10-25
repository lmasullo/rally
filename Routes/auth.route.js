//Dependencies
const router = require('express').Router();
const passport = require('passport');
const routeHelperFrontEnd = require('./routeHelperFrontEnd');

//Routes

//Auth with Google - 1st step after clicking the Google Login Button
//Need to add the middleware passport.authenticate('google')
//This will try and authenticate
router.get('/google', passport.authenticate('google',{
  //The scope is setup on Google at https://console.cloud.google.com/apis/credentials?project=racquet-rally
  //Tell Google what the app will have access to
  scope: ['email','profile']
}));


//Auth Callback
//Need to add the middleware passport.authenticate('google') - this uses the strategy, and serialize/deserialize on passport-setup.js
//The redirect is setup on Google - http://localhost:4000/auth/google/redirect
//https://console.cloud.google.com/apis/credentials?project=racquet-rally
//Already authenticated, passport sees the code that came from google in the url, will exchange code for profile
//This fires the callback on passport-setup
router.get('/google/redirect', passport.authenticate('google'),(req,res)=>{
  //This response if the final response after all done and logged in! 
  //Passport gives you the currently logged in user from the db in req.user 
  //res.send('This is the Callback URI - Logged In!' + req.user);
  //res.redirect('http://localhost:3000/profile')

  //Using routeHelper.js to decide if on localhost or production
  let redirectURL = `${routeHelperFrontEnd()}profile`;
  res.redirect(redirectURL);
});

//Auth Logout
//To delete a user
//https://console.cloud.google.com/iam-admin/iam?_ga=2.240129280.-2036133568.1571960659&project=racquet-rally&folder=&organizationId=
//Sign-out of google and it will bring up the log in page again
router.get('/logout', function(req, res){
  //console.log('Request Before: ',req);
  req.logout();
  //delete req.session;
  //res.clearCookie('connect.sid');
  //console.log('Request After: ',req);
  res.redirect(routeHelperFrontEnd());
});

module.exports = router;