// Dependencies
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://racquet-rally.herokuapp.com/user/';
} else {
  API_URL = 'http://localhost:4000/user/';
}

// CSS Styles
// This is to make the Delete button look like a link
const styleLink = {
  overflow: 'visible',
  width: 'auto',
  fontSize: '1em',
  textAlign: 'left',
  color: 'cornflowerblue',
  background: 'none',
  margin: 0,
  padding: 0,
  border: 'none',
  cursor: 'pointer',
};

// Functional component
const User = props => (
  <tr>
    <td>{props.users.name}</td>
    <td>{props.users.skillLevel}</td>
    <td>{props.users.image}</td>
    <td>
      <img src={props.users.image} alt="User" height="100" width="100" />
    </td>
    <td>{props.users.email}</td>
    <td>
      {/* Map over the centers array and display */}
      {props.users.centers.map(function(center, index) {
        return <li key={index}>{center}</li>;
      })}
    </td>
    <td>
      <Link to={`/edit/${props.users._id}`}>Edit</Link> |
      <button
        onClick={() => {
          props.deleteUser(props.users._id);
        }}
        style={styleLink}
      >
        Delete
      </button>
      {/* <a href="#" onClick={() => {props.deleteUser(props.users._id)}}>Delete</a> */}
    </td>
  </tr>
);

// Class Component
export default class UserList extends Component {
  // Set state and bindings
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      users: [],
      redirect: '',
    };
  }

  // Get all the users when the component mounts and put in users
  componentDidMount() {
    axios
      .get(API_URL, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        // User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
        if (response.data === 'Not Logged In!') {
          console.log('no data');
          this.setState({
            redirect: true,
          });
        } else {
          // User Logged in
          this.setState({
            users: response.data,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Function to delete a user
  deleteUser(id) {
    axios
      .delete(`${API_URL}${id}`)
      .then(res => {
        console.log(res.data);
        // Delete the user from view by filtering out the deleted user
        this.setState({
          users: this.state.users.filter(el => el._id !== id),
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Method to display each element in the table
  userList() {
    // Loop over the users array
    return this.state.users.map(currentUser => (
      // Return the User component, pass some props to the User Component
      // The User component is above in this file as a functional component
      <User
        users={currentUser}
        deleteUser={this.deleteUser}
        key={currentUser._id}
      />
    ));
  }

  render() {
    // Check if redirect state is true
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Users</h1>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Skill Level</th>
              <th>Image URL</th>
              <th>Image</th>
              <th>Email</th>
              <th>Centers</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Call the bookList method to display each element */}
            {this.userList()}
          </tbody>
        </table>
      </div>
    );
  }
}
