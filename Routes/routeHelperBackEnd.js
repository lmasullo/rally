/*
  Backend  
  This helper function is used to assist with routing from Github website using OAuth2. These variables are reference in the .env file
*/

module.exports = () => {
  //I added a config variable on Heroku called HEROKU and set to true
  // if(!process.env.HEROKU) {
  //     return process.env.REACT_APP_DEV_URL_BACKEND;
  // }
  // return process.env.REACT_APP_PROD_URL_BACKEND;

  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_PROD_URL_BACKEND;
  }else{
    return process.env.REACT_APP_DEV_URL_BACKEND;
  }


}


