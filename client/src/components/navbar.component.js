// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://racquet-rally.herokuapp.com/user/';
} else {
  API_URL = 'http://localhost:4000/user/';
}

// CSS Styles
const showNav = {
  display: 'block',
};

const hideNav = {
  display: 'none',
};

// This is to make the Delete button look like a link and display of block
const styleComb = {
  overflow: 'visible',
  width: 'auto',
  fontSize: '1em',
  textAlign: 'left',
  color: 'none',
  background: 'none',
  margin: 0,
  paddingTop: '8px',
  border: 'none',
  cursor: 'pointer',
  display: 'block',
};

const styleWelcome = {
  color: 'white',
  display: 'block',
};





function logout(event) {
  event.preventDefault(); // prevent page transition
  fetch('/logout', { method: 'POST', credentials: 'same-origin' }).then(
    () =>
      // Send to the Logout Component
      (window.location = '/logout')
  );
}

export default class Navbar extends Component {
  // Set state and bindings
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  // Get user info from authentication
  componentDidMount() {
    axios.get(`${API_URL}auth`, { withCredentials: true }).then(response => {
      // User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
      if (response.data === 'Not Logged In!') {
        console.log('no data');
        this.setState({
          redirect: true,
          loggedOutStyle: { display: 'none' },
        });
      } else {
        // User Logged in
        console.log('Response NavBar', response.data);
        this.setState({
          user: response.data,
          loginStyle: { display: 'none' },
        });
      }
    });
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-none navbar-expand-lg">
        <Link to="/main" className="navbar-brand">
          <img
            src="/images/rally_white.png"
            width="80"
            height="40"
            alt="Racquet Rally"
          />
          <span className="ml-3">Racquet Rally</span>
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link
                to="/main"
                className="nav-link"
                style={this.state.user._id ? showNav : hideNav}
              >
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/users"
                className="nav-link"
                style={this.state.user._id ? showNav : hideNav}
              >
                Users List
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/create"
                className="nav-link"
                style={this.state.user._id ? showNav : hideNav}
              >
                Add User
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/createCenter"
                className="nav-link"
                style={this.state.user._id ? showNav : hideNav}
              >
                Add Center
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/centers"
                className="nav-link"
                style={this.state.user._id ? showNav : hideNav}
              >
                Centers
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/profile"
                className="nav-link"
                style={this.state.user._id ? showNav : hideNav}
              >
                Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/"
                className="nav-link"
                style={this.state.user._id ? hideNav : showNav}
              >
                Log In
              </Link>
            </li>
            <li className="navbar-item">
              {/* <a href="#" className="nav-link" onClick={logout}>Log Out</a> */}
              <button
                type="button"
                onClick={logout}
                style={this.state.user._id ? styleComb : hideNav}
              >
                Log Out
              </button>
            </li>
            <li className="navbar-item">
              <span
                className="nav-link"
                style={this.state.user._id ? styleWelcome : hideNav}
              >
                Welcome {this.state.user.name}
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
