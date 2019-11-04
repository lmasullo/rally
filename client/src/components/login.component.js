// Dependencies
import React, { Component } from 'react';
import VideoBg from 'reactjs-videobg';
import ogg from '../videos/Neon.ogg';
import webm from '../videos/Neon.webm';
import mp4 from '../videos/Neon.mp4';
import poster from '../images/poster.jpg';
import '../css/style.css';

// Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://racquet-rally.herokuapp.com/auth/google';
} else {
  API_URL = 'http://localhost:4000/auth/google';
}

// CSS Styling
const styleHTML = {
  height: '100%',
};
const img = {
  width: '100%',
  opacity: '100%',
};

const styleBody = {
  height: '100%',
  display: 'flex',
  msFlexAlign: 'center',
  alignItems: 'center',
  paddingTop: '40px',
  paddingBottom: '40px',
  backgroundColor: 'none',
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
        <VideoBg poster={poster}>
          <VideoBg.Source src={ogg} type="video/ogg" />
          <VideoBg.Source src={webm} type="video/webm" />
          <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
        <div style={styleBody} className="text-center">
          <form className="form-signin" style={styleForm}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in:</h1>
            {/* <a
              href={API_URL}
              className="btn btn-lg btn-primary btn-block"
              role="button"
            >
              Google
            </a> */}
            <a href={API_URL} role="button">
              <img
                style={img}
                src="https://www.pentesteracademy.com/img/sign-in-with-google.png"
                alt="W3Schools.com"
              ></img>
            </a>
            <p className="mt-5 mb-3">Copyright &copy; 2019 Team Racquet Rally.</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
