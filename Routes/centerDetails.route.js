// Dependencies
const router = require('express').Router();
// Middleware to check if authenticated and logged in
const authCheck = require('../Utils/authCheck');

// Require Centers model
//const Center = require('../Models/centers.model');
const db = require('../Models');

// Route to get a Center
router.route('/:id').get((req, res) => {
    // Get the center by ID
    db.Center.findById(req.params.id)
      .then(dbCenter => {
        // If we were able to find a center, send it back
        res.json(dbCenter);
      })
      .catch(err => {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

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
  });

// Export the routes
module.exports = router;