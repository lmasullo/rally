// Dependencies
const router = require('express').Router();
// Middleware to check if authenticated and logged in
const authCheck = require('../Utils/authCheck');
// localhost:4000/profile/
router.get('/', authCheck, (req, res, next) => {
  res.json(req.user);
});

// Export the routes
module.exports = router;
