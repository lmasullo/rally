//Dependencies
// Use express router
const router = require('express').Router();
const routeHelperFrontEnd = require('./routeHelperFrontEnd');
const routeHelperBackEnd = require('./routeHelperBackEnd');


//Middleware to check if authenticated and logged in
const authCheck = (req,res,next) => {
  if(!req.user){
    //If user Not logged in
    console.log('Not logged In!');

    //res.redirect('back')

    //res.status(200).send('<script>window.location.href="http://localhost:3000/"</script>');

  //   router.post("/", function (req, res, next) {
  //     //var pass = req.body("password");
  //     //var loginx = req.body("login");
  //     //res.render('index.html', { title: 'Express' });
  //     res.redirect("/")
  //     next
    
  // });


    //browserHistory.push('/');

    // router.route('/logout').get((req, res) => {
    //   // Grab every document in the Centers collection
    //   res.send('logged out')
    // });


    //res.redirect(routeHelperFrontEnd());

    //let redirectURL = `${routeHelperFrontEnd()}login`;
    //res.redirect(routeHelperFrontEnd());
    //res.redirect(use.cors(),redirectURL)

    // router.get('/logout', function(req, res){
    //   //console.log('Request Before: ',req);
    //   req.logout();
    //   //delete req.session;
    //   //res.clearCookie('connect.sid');
    //   //console.log('Request After: ',req);
    //   res.redirect(routeHelperFrontEnd());
    // });

  }else{
    //Logged in
    console.log('authCheck: ' + req.user);
    //Call next part of middleware
    next();
  }
}

router.get('/', authCheck, (req,res)=>{
  //res.send("You are Logged in as " + req.user.name);
  res.send(req.user);
})

//Export the routes
module.exports = router;