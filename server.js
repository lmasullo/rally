// Dependencies ************************************************
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passportSetup = require('./Config/passport-setup');
const cookieSession = require("cookie-session");
const passport = require("passport");

// Initialize Express Server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//This encrypts our id that we send in the cookie
app.use(cookieSession({
  //In MS
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}));

//Initialize Passport
app.use(passport.initialize());

//Initialize Sessions
app.use(passport.session())

// Set port
const PORT = process.env.PORT || 4000;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Connect to the Mongo DB **********************************************
// If deployed, use the deployed database. Otherwise use the local database
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rally';

// Connect to the db
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    // Display the connection message
    console.log('MongoDB database connection established successfully');
  })
  .catch(function(err) {
    // If an error occurred, log it
    console.log(err);
  });

// Require routes
const UsersRoutes = require('./Routes/users.route');
const CentersRoutes = require('./Routes/centers.route');
const AuthRoutes = require('./Routes/auth.route');
const HomeRoutes = require('./Routes/home.route');

// Sets the base route as localhost:4000/rally
// All routes will be off rally
app.use('/user', UsersRoutes);
app.use('/center', CentersRoutes);
app.use('/auth', AuthRoutes);
app.use('/home', HomeRoutes);


// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the server **********************************************
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});
