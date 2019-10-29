/*
  Backend  
  This helper function is used to assist with routing. 
  These variables are reference in the .env file
*/

module.exports = () => {
  if (process.env.NODE_ENV) {
    return process.env.REACT_APP_DEV_BACKEND;
  }
  return process.env.REACT_APP_DEV_BACKEND;
};
