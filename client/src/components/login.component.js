import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthManager from "../utils/AuthManager";

const styleHTML = {
  height: '100%',
}

const styleBody = {
  height: '100%',
  display: '-ms-flexbox',
  display: 'flex',
  msFlexAlign: 'center',
  alignItems: 'center',
  paddingTop: '40px',
  paddingBottom: '40px',
  backgroundColor: '#f5f5f5'
}

const styleForm = {
  width: '100%',
  maxWidth: '330px',
  padding: '15px',
  margin: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  height: 'auto',
  padding: '10px',
  fontSize: '16px',
  zIndex: '2',
}

// const styleControl = {
//   position: 'relative',
//   boxSizing: 'border-box',
//   height: 'auto',
//   padding: '10px',
//   fontSize: '16px',
// }

class Login extends Component {

  state = {
    isAuthenticated: AuthManager.isAuthenticated()
  };

  handleLogOut = () => {
    AuthManager.logOut();
    this.setState({isAuthenticated: false});
  }
  
  
  render() {
    return (
      <div style={styleHTML}>
          <div style={styleBody} className="text-center">
            <form className="form-signin" style={styleForm}>
              {/* <img className="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/> */}
              <h1 className="h3 mb-3 font-weight-normal">Please sign in with GitHub</h1>
              {/* <label forHTML="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="inputEmail" className="form-control" style={styleControl} placeholder="Email address" required autofocus/>
              <label forHTML="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control" style={styleControl} placeholder="Password" required/> */}
              <button className="btn btn-lg btn-primary btn-block" type="submit" href={process.env.REACT_APP_PROD_URL_LOGIN || "http://localhost:4000/login"}>GitHub</button>
              <Link to="/login" className="nav-link">Login</Link>
              <a className="button button-blue" href={process.env.REACT_APP_PROD_URL_LOGIN || "http://localhost:4000/login"}>
                LOGIN
              </a>
              <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;