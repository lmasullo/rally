//Dependencies
// Use express router
const router = require('express').Router();
//const path = require("path");

// Require Users model
//const User = require('../Models/users.model');
const db = require('../Models');

// Route for getting all the Users from the db
// localhost:4000/user/
router.route('/').get((req, res) => {
  // Grab every document in the Users collection
  db.User.find({})
    .then(dbUser => {
      // If we were able to successfully find Users, send them back to the client
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to save a user
router.route('/add').post((req, res) => {
  // Creates a new user
  db.User.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to get a User
router.route('/:id').get((req, res) => {
  console.log('userID', req.params.id);
  // Get the center by ID
  db.User.findById(req.params.id)
    .then(dbUser => {
      // If we were able to find a user, send it back
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to Update a User
router.route('/update/:id').post((req, res) => {
  db.User.findById(req.params.id)
    .then(dbUser => {
      //Set the new values
      dbUser.name = req.body.name;
      dbUser.skillLevel = req.body.skillLevel;
      dbUser.image = req.body.image;
      dbUser.email = req.body.email;
      dbUser.centers = req.body.centers;
      dbUser.save()
      // If we were able to successfully update a User, send it back
      .then(() => res.json(dbUser));
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to delete a User
router.route('/:id').delete((req, res) => {
  console.log('UserID', req.params.id);
  // Delete the user
  db.User.findByIdAndDelete(req.params.id)
    .then(dbUser => {
      // If we were able to successfully delete the user, send it back
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Route that is called after the user is authenticated on auth.route.js
// router.get('/home2', (req,res)=>{
//   // res.send('You are logged in' + req.user.username)
//   res.send(req.user)
// });


// router.route('/profile').get((req, res) => {
//   console.log('Logged in User', req.user.username);
// });

//Export the routes
module.exports = router;

