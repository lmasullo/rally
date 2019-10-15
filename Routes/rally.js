// Use express router
const router = require('express').Router();

// Require Users model
const User = require('../Models/users.model');

// Route for getting all the Users from the db
// localhost:4000/rally/
router.route('/').get((req, res) => {
  // Grab every document in the Articles collection
  User.find({})
    .then(dbUser => {
      // If we were able to successfully find Articles, send them back to the client
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
  User.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to get a saved User
router.route('/:id').get((req, res) => {
  console.log('userID', req.params.id);
  // Delete the note
  User.findById(req.params.id)
    .then(dbUser => {
      // If we were able to successfully delete the note, send it back
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to Update a saved User
router.route('/update/:id').post((req, res) => {
  console.log('UserID', req.params.id);
  User.findById(req.params.id)
    .then(dbUser => {
      dbUser.name = req.body.name;
      dbUser.skillLevel = req.body.skillLevel;
      dbUser.image = req.body.image;
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
  User.findByIdAndDelete(req.params.id)
    .then(dbUser => {
      // If we were able to successfully delete the user, send it back
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

module.exports = router;