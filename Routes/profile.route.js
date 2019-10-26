//Dependencies
const router = require('express').Router();
const routeHelperFrontEnd = require('./routeHelperFrontEnd');
const routeHelperBackEnd = require('./routeHelperBackEnd');
//Middleware to check if authenticated and logged in
const authCheck = require('../Utils/authCheck');

router.get('/', authCheck, (req,res,next)=>{
  //res.send("You are Logged in as " + req.user.name);
  res.json(req.user);
})

//Export the routes
module.exports = router;