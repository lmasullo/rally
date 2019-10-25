//Dependencies
// Use express router
const router = require('express').Router();
//const routeHelperFrontEnd = require('./routeHelperFrontEnd');
//const routeHelperBackEnd = require('./routeHelperBackEnd');


//Auth Logout
//To delete a user
//https://console.cloud.google.com/iam-admin/iam?_ga=2.240129280.-2036133568.1571960659&project=racquet-rally&folder=&organizationId=
//Sign-out of google and it will bring up the log in page again
router.get('/', function(req, res){
  
  res.send('Logged Out!');
  
  req.logout();

  console.log('Req Cleared!');
  //delete req.session;
  //res.clearCookie('connect.sid');
  //console.log('Request After: ',req);
  //res.redirect(routeHelperFrontEnd());
});

//Export the routes
module.exports = router;