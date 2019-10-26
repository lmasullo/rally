// Use express router
const router = require('express').Router();
//Middleware to check if authenticated and logged in
const authCheck = require('../Utils/authCheck');

// Require Centers model
const Center = require('../Models/centers.model');

// Route for getting all the Centers from the db
// localhost:4000/center/
router.get('/',authCheck, (req,res,next)=>{  
  // Grab every document in the Centers collection
  Center.find({})
    .then(dbCenter => {
      // If we were able to successfully find Centers, send them back to the client
      res.json(dbCenter);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Export the routes
module.exports = router;