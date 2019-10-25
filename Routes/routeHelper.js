/*
    This helper function is used to assist with routing from Github website using OAuth2. These variables are reference in the .env file
*/

module.exports = () => {
    if(!process.env.NODE_ENV) {
        return process.env.REACT_APP_DEV_URL_FRONTEND;
    }
    return process.env.REACT_APP_PROD_URL;
}