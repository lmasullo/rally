// Use express router
const router = require('express').Router();

// Require Centers model
const Center = require('../Models/centers.model');

// Route for getting all the Centers from the db
// localhost:4000/center/
router.route('/').get((req, res) => {

  console.log(req.user);
  

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

// Route to save a center
router.route('/add').post((req, res) => {
  // Creates a new center
  Center.create(req.body)
    .then(dbCenter => {
      res.json(dbCenter);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

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

// Route to Update a Center
router.route('/update/:id').post((req, res) => {
  Center.findById(req.params.id)
    .then(dbCenter => {
      //Set the new values
      dbCenter.centerName = req.body.centerName;
      dbCenter.description = req.body.description;
      dbCenter.hours = req.body.hours;
      dbCenter.cost = req.body.cost;
      dbCenter.numCourts = req.body.numCourts;
      dbCenter.addressLink = req.body.addressLink;
      dbCenter.save()

      // If we were able to successfully update a Center, send it back
      .then(() => res.json(dbCenter));
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route to delete a Center
router.route('/:id').delete((req, res) => {
  // Delete the center
  Center.findByIdAndDelete(req.params.id)
    .then(dbCenter => {
      // If we were able to successfully delete the center, send it back
      res.json(dbCenter);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Export the routes
module.exports = router;