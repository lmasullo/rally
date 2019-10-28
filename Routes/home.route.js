// Use express router
const router = require('express').Router();
//Middleware to check if authenticated and logged in
const authCheck = require('../Utils/authCheck');

// Require Centers model
const db = require('../Models');

// Route for getting all the Centers from the db
// localhost:4000/center/
router.get('/',authCheck, (req,res,next)=>{  
  // Grab every document in the Centers collection
  db.Center.find({})
    .then(dbCenter => {
      // If we were able to successfully find Centers, send them back to the client
      res.json(dbCenter);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for getting the current user
// localhost:4000/user/
router.get('/user',authCheck, (req,res,next)=>{  
  res.json(req.user);
  //console.log(req.user); 
});

// Route to Update a User's Centers
router.route('/update/:id').post((req, res) => {
//router.post('/update/:id',(req,res,next)=>{ 
  db.User.findById(req.params.id)
    .then(dbUser => {
      //Set the new values
      dbUser.centers = req.body.centers;
      console.log(dbUser.centers);
      
      dbUser.save()
      // If we were able to successfully update a User, send it back
      .then(() => res.json(dbUser));
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Export the routes
module.exports = router;