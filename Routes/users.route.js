// Dependencies
const router = require('express').Router();
const authCheck = require('../Utils/authCheck');

// Require Users model
const db = require('../Models');

// Route for getting all the Users from the db
// localhost:4000/user/
// router.route('/').get((req, res) => {
// authCheck uses authCheck.js in Utils folder to check for req.user to ensure user is logged in
router.get('/', authCheck, (req, res) => {
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

    //res.send(req.user);
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
      // Set the new values
      dbUser.name = req.body.name;
      dbUser.skillLevel = req.body.skillLevel;
      dbUser.image = req.body.image;
      dbUser.email = req.body.email;
      dbUser.centers = req.body.centers;
      dbUser
        .save()
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

// Export the routes
module.exports = router;
