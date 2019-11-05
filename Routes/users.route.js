// Dependencies
const router = require('express').Router();
const authCheck = require('../Utils/authCheck');

// Require Users model
const db = require('../Models');

// Route for getting the authenticated user
// localhost:4000/user/auth
router.get('/auth', authCheck, (req, res, next) => {
  res.json(req.user);
});

// Route for getting all the Users from the db
// localhost:4000/user/
// authCheck uses authCheck.js in Utils folder to check for req.user to ensure user is logged in
router.get('/', authCheck, (req, res, next) => {
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

// Route to get a User by ID
// localhost:4000/user/4564q34343534
router.get('/:id', authCheck, (req, res, next) => {
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

// Route to save a user
// localhost:4000/user/add
router.post('/add', (req, res) => {
  // Creates a new user
  console.log(req.body);

  db.User.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to delete a User
// localhost:4000/user/4564q34343534 (delete request, not post)
router.delete('/:id', (req, res) => {
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

// Route to Update a User, but not the centers array
// localhost:4000/user/update/4564q34343534
router.route('/update/:id').post((req, res) => {
  // router.post('/update/:id', authCheck, (req, res, next) => {
  db.User.findById(req.params.id)
    .then(dbUser => {
      console.log('User Found');

      // Set the new values
      dbUser.name = req.body.userName;
      dbUser.skillLevel = req.body.skillLevel;
      dbUser.image = req.body.image;
      dbUser.email = req.body.email;
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

// Route to Update (Add) a User's Centers
// localhost:4000/user/update/center/4564q34343534
router.post('/update/center/:id', (req, res) => {
  db.User.findById(req.params.id)
    .then(dbUser => {
      // Set the new values
      dbUser.centers.push(req.body.id);
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

// Route to Delete a User's Centers
// localhost:4000/user/delete/center/4564q34343534
router.post('/delete/center/:id', (req, res) => {
  db.User.findById(req.params.id)
    .then(dbUser => {
      // Delete the center
      dbUser.centers.pull(req.body.id);
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

// Export the routes
module.exports = router;
