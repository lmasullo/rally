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


// view engine setup
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Origin", "http://localhost:4000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

//Added this because of trouble passing req.user after authentication
const corsOptions = {
  //origin: 'http://localhost:4000',
  //origin: 'http://localhost:3000',
  origin: true,
  credentials: true,
  //preflightContinue: true,
}
app.use(cors(corsOptions));

//app.use(cors());

//This encrypts our id that we send in the cookie
app.use(cookieSession({
  //1 day in Milliseconds
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

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);



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
const ProfileRoutes = require('./Routes/profile.route');
const LogoutRoutes = require('./Routes/logout.route');

// Sets the base route as localhost:4000/rally
// All routes will be off rally
app.use('/user', UsersRoutes);
app.use('/center', CentersRoutes);
app.use('/auth', AuthRoutes);
app.use('/home', HomeRoutes);
app.use('/profile', ProfileRoutes);
app.use('/logout', LogoutRoutes);


// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the server **********************************************
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`);
});
