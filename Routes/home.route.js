// Use express router
const router = require('express').Router();
//const path = require("path");

// Require Users model
//const User = require('../Models/users.model');
//const db = require('../Models');

//Middleware to check if authenticated and logged in
const authCheck = (req,res,next) => {
  if(!req.user){
    //If user Not logged in
    console.log('Not logged in!');
    res.redirect('/auth/login')
  }else{
    //Logged in
    console.log('authCheck: ' + req.user);
    //Call next part of middleware
    next();
  }
}

//Route that is called after the user is authenticated on auth.route.js
router.get('/', authCheck, (req,res)=>{
//router.route('/').get((req, res) => {
  //res.send('You are logged in: ' + req.user.name)

  //console.log('Req.User home.route: '+ req.user);

  res.json(req.user);

});


//Export the routes
module.exports = router;