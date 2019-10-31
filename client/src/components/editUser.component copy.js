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

const styleHidden = {
  display: 'none',
}

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
      userCenters: [],
      availCenters: [],
      redirect: '',
      arrayLength: 0,
      stateCheck: '',
    };
  }

  // Get the user that matches the id when the component mounts
  componentDidMount() {
    // Get the user by ID
    axios
      .get(`${API_URL}user/${this.props.match.params.id}`, {
        withCredentials: true,
      })
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
            id: response.data._id,
            name: response.data.name,
            skillLevel: response.data.skillLevel,
            image: response.data.image,
            email: response.data.email,
            userCenters: response.data.centers,
            arrayLength: response.data.centers.length
          });
        }
        console.log('Affiliated', this.state.userCenters);
        console.log('New', this.state.newCenters);
      })
      .catch(err => {
        console.log(err);
      });

    // Get the centers
    axios
      .get(`${API_URL}center`, { withCredentials: true })
      .then(response => {
        console.log(response.data);

        let centerData = response.data;

        //Maps over the centers array and checks if it is in the user's centers array (using id) and then adds isFavorite true/false
        centerData = centerData.map(c => {
          var isFavorite = this.state.userCenters.some(uc => uc === c._id);
          return {isFavorite, ...c}
        })

        this.setState({
          availCenters: centerData,
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
    console.log('Check: ', e.target.value);
    console.log('Check ID: ', e.target.id);

    // See if the clicked center is already a favorite of the user
    const checkCenter = e.target.checked;
    const centerId = e.target.id;
    console.log(checkCenter);
    
    //Create object of the center's id to send to backend
    const newCenter = {
      id: centerId
    }

    // If not already a favorite, push to an array and then send to the home route to save
    if (checkCenter === true) {
      console.log("true");

      // Send to back-end to Update user's centers
      //! save by ID, not name
      axios
        .post(
          `${API_URL}user/update/center/${this.state.id}`,
          newCenter
        )
        .then(res => {
          console.log(res.data);
          //Set the setArrayLength state to re-trigger Component did Mount and re-render cards
          this.setState({
            stateCheck: 'true',
            ArrayLength: res.data.length
          })
        })
        .catch(err => console.log(err));     
    }
  }

  // Method to delete center from user
  onChangeX(e) {
    // Get the tennis center to delete
    const centerId = e.target.id;

    //Create object of the center's id to send to backend
    const newCenter = {
      id: centerId
    }

    //Delete center
    // Send to back-end to Update user's centers
    //! save by ID, not name
    axios
      .post(
        `${API_URL}user/delete/center/${this.state.id}`,
        newCenter
      )
      .then(res => {
        console.log(res.data);
        //Set the setArrayLength state to re-trigger useEffect and re-render cards
        this.setState({
          ArrayLength: res.data.length
        })
      })
      .catch(err => console.log(err));
  }

  // Method to route to root when clicks cancel
  onCancel(e) {
    // Prevent default submission
    e.preventDefault();

    // Send back to Users List
    window.location = '/profile';
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
          <h2>{this.state.arrayLength}</h2>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            ></input>
            <label htmlFor="selSkill">Skill Level</label>
            <select
              className="form-control"
              id="selSkill"
              onChange={this.onChangeSkillLevel}
              value={this.state.skillLevel} 
              defaultChecked={this.state.skillLevel}
            >
              <option
                value="1"              
              >
                Beginner (1-2.5)
              </option>
              <option
                value="2"              
              >
                Intermediate (3-4.5)
              </option>
              <option
                value="3"              
              >
                Expert (Expert 5+)
              </option>
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
                return (
                  <div key={`ret${center._id}`} id={this.state.ArrayLength}>
                    <div key={`div1${center._id}`} className="input-group mb-3">
                      <div
                        key={`div2${center._id}`}
                        className="input-group-prepend"
                      >
                        <div
                          key={`div3${center._id}`}
                          className="input-group-text"
                          id={center._id}
                          onClick={this.onChangeX}
                          style = {center.isFavorite ? styleRedX : styleHidden}
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
                            id={center._id}
                            type="checkbox"
                            checked={center.isFavorite ? "checked" : ""}
                            value={center.centerName}
                            onChange={this.onChangeCenter}
                            stateCheck={this.stateCheck}
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
              //}
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
