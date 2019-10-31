// Dependencies
const router = require('express').Router();
// Middleware to check if authenticated and logged in
const authCheck = require('../Utils/authCheck');

// Require Centers model
const Center = require('../Models/centers.model');

// Route to get a Center
router.route('/:id').get((req, res) => {
    // Get the center by ID
    Center.findById(req.params.id)
      .then(dbCenter => {
        // If we were able to find a center, send it back
        res.json(dbCenter);
      })
      .catch(err => {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

// Export the routes
module.exports = router;