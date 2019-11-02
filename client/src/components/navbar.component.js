// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// CSS Styles
// This is to make the Delete button look like a link
const styleLink = {
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
  render() {
    return (
      <nav className="navbar navbar-dark bg-none navbar-expand-lg">
        <Link to="/main" className="navbar-brand">
          Racquet Rally
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/main" className="nav-link">
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/users" className="nav-link">
                Users List
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Add User
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/createCenter" className="nav-link">
                Add Center
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/centers" className="nav-link">
                Centers
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Log In
              </Link>
            </li>
            <li className="navbar-item">
              {/* <a href="#" className="nav-link" onClick={logout}>Log Out</a> */}
              <button type="button" onClick={logout} style={styleLink}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
