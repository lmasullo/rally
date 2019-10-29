import React, { Component } from 'react';

const styleHTML = {
  height: '100%',
};

const styleBody = {
  height: '100%',
  display: 'flex',
  msFlexAlign: 'center',
  alignItems: 'center',
  paddingTop: '40px',
  paddingBottom: '40px',
  backgroundColor: '#f5f5f5',
};

const styleForm = {
  width: '100%',
  maxWidth: '330px',
  margin: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  height: 'auto',
  padding: '10px',
  fontSize: '16px',
  zIndex: '2',
};

class Login extends Component {
  render() {
    return (
      <div style={styleHTML}>
        <div style={styleBody} className="text-center">
          <form className="form-signin" style={styleForm}>
            {/* <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/> */}
            <h1 className="h3 mb-3 font-weight-normal">Please sign in:</h1>
            <a
              href={
                process.env.REACT_APP_PROD_URL_LOGIN ||
                'http://localhost:4000/auth/google'
              }
              className="btn btn-lg btn-primary btn-block"
              role="button"
            >
              Google
            </a>
            {/* <a href={process.env.REACT_APP_PROD_URL_LOGIN || "http://localhost:4000/auth/google"} className="btn btn-lg btn-primary btn-block" role="button">Google</a> */}
            {/* <a href={process.env.REACT_APP_PROD_URL_LOGIN || "http://localhost:4000/auth/github"} className="btn btn-lg btn-primary btn-block" role="button">GitHub</a> */}
            <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
