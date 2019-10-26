// Use express router
const router = require('express').Router();
const authCheck = require('../Utils/authCheck');

//Route that is called after the user is authenticated on auth.route.js
//router.get('/', authCheck, (req,res)=>{
router.get('/', authCheck, (req,res,next)=>{
  res.send(req.user);
});

//Export the routes
module.exports = router;