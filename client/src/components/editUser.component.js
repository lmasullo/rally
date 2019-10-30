// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://racquet-rally.herokuapp.com/';
} else {
  API_URL = 'http://localhost:4000/';
}

// CSS Styles
const styleBtn = {
  marginRight: '5px',
};

const styleRedX = {
  color: 'red',
};

// Class Component
export default class EditUser extends Component {
  // Set state and bindings
  constructor(props) {
    // Need super if a sub class, this is not in app.js
    super(props);

    // Need to bind this to the class
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSkillLevel = this.onChangeSkillLevel.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCenter = this.onChangeCenter.bind(this);
    this.onChangeX = this.onChangeX.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      name: '',
      skillLevel: '',
      image: '',
      email: '',
      centers: [],
      newCenters: [],
      availCenters: [],
      redirect: '',
    };
  }

  // Get the user that matches the id when the component mounts
  componentDidMount() {
    // console.log(`${API_URL}${this.props.match.params.id}`);
    // Get the user by ID
    axios
      .get(`${API_URL}user/${this.props.match.params.id}`, { withCredentials: true })
      .then(response => {
        // User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
        if (response.data === 'Not Logged In!') {
          console.log('no data');
          this.setState({
            redirect: true,
          });
        } else {
          // User Logged in
          this.setState({
            name: response.data.name,
            skillLevel: response.data.skillLevel,
            image: response.data.image,
            email: response.data.email,
            centers: response.data.centers,
            newCenters: response.data.centers,
          });
        }
        console.log('Affiliated', this.state.centers);
        console.log('New', this.state.newCenters);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${API_URL}center`, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        this.setState({
          availCenters: response.data,
        });
        console.log('Avail', this.state.availCenters);
      })
      .catch(err => {
        console.log(err);
      });
  } // End Component Did Mount

  // Set state when the name changes
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  // Set state when the skill level changes
  onChangeSkillLevel(e) {
    this.setState({
      skillLevel: e.target.value,
    });
  }

  // Set state when the image url changes
  onChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  // Set state when the email changes
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  // Set state when the center changes
  onChangeCenter(e) {
    // Need to save to the users collection
    console.log('Check', e.target.value);

    const checkCenter = this.state.newCenters.includes(e.target.value);

    if (checkCenter === false) {
      this.state.newCenters.push(e.target.value);
      this.setState({
        newCenters: this.state.newCenters,
      });
    }
    console.log('New Centers', this.state.newCenters);
  }

  // Method to delete center from user
  onChangeX(e) {
    // Get the tennis center to delete
    const delCenter = e.target.getAttribute('data-value');

    console.log('Center to Delete: ', e.target.getAttribute('data-value'));

    // Check if the center is in state
    const checkCenter = this.state.newCenters.includes(delCenter);
    if (checkCenter === true) {
      // Remove it from the array of centers
      this.state.newCenters.pop(e.target.value);
      // Set State
      this.setState({
        newCenters: this.state.newCenters,
      });
    }
    console.log('New Centers: ', this.state.newCenters);
  }

  // Method to route to root when clicks cancel
  onCancel(e) {
    // Prevent default submission
    e.preventDefault();

    // Send back to Users List
    window.location = '/';
  }

  // Method when click Save Changes button
  onSubmit(e) {
    // Prevent default submission
    e.preventDefault();

    // Create user object to save
    const user = {
      name: this.state.name,
      skillLevel: this.state.skillLevel,
      image: this.state.image,
      email: this.state.email,
      centers: this.state.newCenters,
    };

    console.log(user);

    // Send to back-end to Update user, look at routes/books.js
    axios
      .post(`${API_URL}user/update/${this.props.match.params.id}`, user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    // Check if redirect state is true
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Edit User</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            ></input>
 
            <label htmlFor="selSkill">Skill Level</label>
            <select className="form-control" id="selSkill" onChange={this.onChangeSkillLevel}>
              <option value="1" selected={this.state.skillLevel === 1 ? "selected" : ""}>Beginner (1-2.5)</option>
              <option value="2" selected={this.state.skillLevel === 2 ? "selected" : ""}>Intermediate (3-4.5)</option>
              <option value="3" selected={this.state.skillLevel === 2 ? "selected" : ""}>Expert (Expert 5+)</option>
            </select>
            <label>Image</label>
            <input
              type="text"
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeImage}
            ></input>
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            ></input>
            <label>Available Centers</label>
            {/* Loop over the Centers and display */}
            {this.state.availCenters.map(center => {
              const checkCenter = this.state.centers.includes(
                center.centerName
              );
              if (checkCenter === true) {
                return (
                  <div key={`ret${center._id}`}>
                    <div key={`div1${center._id}`} className="input-group mb-3">
                      <div
                        key={`div2${center._id}`}
                        className="input-group-prepend"
                      >
                        <div
                          key={`div3${center._id}`}
                          className="input-group-text red"
                          style={styleRedX}
                          data-value={center.centerName}
                          onClick={this.onChangeX}
                        >
                          X
                        </div>
                      </div>
                      <div
                        key={`div4${center._id}`}
                        className="input-group-prepend"
                      >
                        <div
                          key={`div5${center._id}`}
                          className="input-group-text"
                        >
                          <input
                            key={`chk${center._id}`}
                            type="checkbox"
                            checked
                            value={center.centerName}
                            onChange={this.onChangeCenter}
                          />
                        </div>
                      </div>
                      <input
                        key={`text${center._id}`}
                        type="text"
                        disabled
                        className="form-control"
                        defaultValue={center.centerName}
                      />
                    </div>
                  </div>
                );
              }
              return (
                <div key={`ret2${center._id}`}>
                  <div key={`div6${center._id}`} className="input-group mb-3">
                    <div
                      key={`div7${center._id}`}
                      className="input-group-prepend"
                    >
                      <div
                        key={`div8${center._id}`}
                        className="input-group-text"
                      >
                        <input
                          key={`chk2${center._id}`}
                          type="checkbox"
                          value={center.centerName}
                          onChange={this.onChangeCenter}
                        />
                      </div>
                    </div>
                    <input
                      key={`text2${center._id}`}
                      type="text"
                      disabled
                      className="form-control"
                      defaultValue={center.centerName}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button className="btn btn-primary" type="submit" style={styleBtn}>
            Save Changes
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={this.onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
