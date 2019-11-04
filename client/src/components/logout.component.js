// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VideoBg from 'reactjs-videobg';
import ogg from '../videos/Neon.ogg';
import webm from '../videos/Neon.webm';
import mp4 from '../videos/Neon.mp4';
import poster from '../images/poster.jpg';
import '../css/style.css';

// CSS Styles
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

class Logout extends Component {
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
            <h1 className="h3 mb-3 font-weight-normal">You are Logged Out!</h1>
            <Link to="/">Click to Log In</Link>
            <p className="mt-5 mb-3 text-muted">Copyright &copy; 2019 Team Racquet Rally.</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Logout;
