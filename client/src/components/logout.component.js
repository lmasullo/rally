import React, { Component } from "react";
import {Link} from 'react-router-dom';

const styleHTML = {
  height: '100%',
}

const styleBody = {
  height: '100%',
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
  margin: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  height: 'auto',
  padding: '10px',
  fontSize: '16px',
  zIndex: '2',
}

class Logout extends Component {

  render() {
    return (
      <div style={styleHTML}>
          <div style={styleBody} className="text-center">
            <form className="form-signin" style={styleForm}>
              <h1 className="h3 mb-3 font-weight-normal">You are Logged Out!</h1>  
              <Link to="/">Click to Log In</Link>
              <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
            </form>
          </div>
      </div>
    );
  }
}

export default Logout;