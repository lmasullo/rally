//Dependencies
// Use express router
const router = require('express').Router();
const routeHelperFrontEnd = require('./routeHelperFrontEnd');
const routeHelperBackEnd = require('./routeHelperBackEnd');

//Middleware to check if authenticated and logged in
const authCheck = (req,res,next) => {
  if(!req.user){
    //If user Not logged in
    //This gets sent to component and will redirect to log in from there
    res.send('Not Logged In!')
  }else{
    //Logged in
    console.log('authCheck: ' + req.user);
    //Call next part of middleware
    next();
  }
}

router.get('/',authCheck, (req,res)=>{
  //res.send("You are Logged in as " + req.user.name);
  res.send(req.user);
})

//Export the routes
module.exports = router;