// Use express router
const router = require('express').Router();
const authCheck = require('../Utils/authCheck');

//Route that is called after the user is authenticated on auth.route.js
//router.get('/', authCheck, (req,res)=>{
router.route('/').get((req, res) => {

  res.send(req.user);

});


//Export the routes
module.exports = router;