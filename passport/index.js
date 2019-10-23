const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
//const db = require('../models');
// Require Users model
const User = require('../Models/users.model');
const jwt = require('jsonwebtoken');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    
    console.log(profile.login);
    
    return User.findOne({githubId: profile.id})
    .then(user => {
      if(!user) {
        const account = {
          accessToken: accessToken, 
          githubId: profile.id,
          username: profile.username
        };
  
        const jwtToken = jwt.sign(account, process.env.JWT_SECRET);
        
        return User.create({...account, jwtToken})
         .then(user => {
          console.log(user);
          return cb(null, user);
         }).catch(err => {
          console.log(err);
          return cb(err, false);
         })
      }

      return cb(null, user);

    }).catch(err => {
      console.log(err);
      return cb(err, false);
    })
}));
  
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);

    return db.User.findOne({accessToken: jwt_payload.accessToken})
    .then(user => {
      if (!user) {
          return done(null, false);
      }

      return done(null, user);
    })
    .catch(err => {
      if (err) {
          return done(err, false);
      }
    });
}));

passport.initialize();

module.exports = passport;