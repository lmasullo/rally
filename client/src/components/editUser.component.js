// Dependencies
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';

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

//Functional Hooks Component
function EditUser() {

  // Set initial State with Hooks
  const [userId, setUserId] = useState();
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userCenters, setUserCenters] = useState([]);
  const [availCenters, setAvailCenters] = useState([]); 
  const [redirect, setRedirect] = useState('');
  const [arrayLength, setArrayLength] = useState(0);

  //Set the url id parameter
  let { id } = useParams();
  
  // Use useEffect instead of ComponentDidMount
  useEffect(() => {
    // Get the user by ID
    axios
      .get(`${API_URL}user/${id}`, {
        withCredentials: true,
      })
      .then(response => {
        // User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
        if (response.data === 'Not Logged In!') {
          console.log('no data');
          setRedirect(true)
        } else {
          // User Logged in
          setUser(response.data);
          setUserId(response.data._id)
          setUserName(response.data.name)
          setUserSkillLevel(response.data.skillLevel)
          setUserImage(response.data.image)
          setUserEmail(response.data.email)
          setUserCenters(response.data.centers)
          setArrayLength(response.data.centers.length)
        }
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
          var isFavorite = userCenters.some(uc => uc === c._id);
          return {isFavorite, ...c}
        })

        setAvailCenters(centerData)
      
      })
      .catch(err => {
        console.log(err);
      });
  }, [arrayLength]); // End Use Effect

  // Set state when the name changes
  function onChangeName(e) {
    setUser.name(e.target.value)
  }

  // Set state when the skill level changes
  function onChangeSkillLevel(e) {
    setUser.skillLevel(e.target.value)
    // this.setState({

  }

  // Set state when the image url changes
  function onChangeImage(e) {
    setUser.image(e.target.value)
    // this.setState({
    //   image: e.target.value,
    // });
  }

  // Set state when the email changes
  function onChangeEmail(e) {
    setUser.email(e.target.value)
    // this.setState({
    //   email: e.target.value,
    // });
  }

  // Set state when the center changes
  function onChangeCenter(e) {
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
          `${API_URL}user/update/center/${id}`,
          newCenter
        )
        .then(res => {
          console.log(res.data);
          //Set the setArrayLength state to re-trigger Component did Mount and re-render cards
          setArrayLength(res.data.length);
          // this.setState({
          //   stateCheck: 'true',
          //   ArrayLength: res.data.length
          // })
        })
        .catch(err => console.log(err));     
    }
  }

  // Method to delete center from user
  function onChangeX(e) {
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
        `${API_URL}user/delete/center/${id}`,
        newCenter
      )
      .then(res => {
        console.log(res.data);
        //Set the setArrayLength state to re-trigger useEffect and re-render cards
        setArrayLength(res.data.length);
        // this.setState({
        //   ArrayLength: res.data.length
        // })
      })
      .catch(err => console.log(err));
  }

  // Method to route to root when clicks cancel
  function onCancel(e) {
    // Prevent default submission
    e.preventDefault();

    // Send back to Users List
    window.location = '/profile';
  }

  // Method when click Save Changes button
  function onSubmit(e) {
    // Prevent default submission
    e.preventDefault();

    // Create user object to save
    const user = {
      name: userName,
      skillLevel: skillLevel,
      image: image,
      email: email,
    };

    console.log(user);

    // Send to back-end to Update user, look at routes/books.js
    axios
      .post(`${API_URL}user/update/${this.props.match.params.id}`, user)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

    // Check if redirect state is true
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Edit User</h1>
        
        <form onSubmit={onSubmit}>
          <h2>{arrayLength}</h2>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={onChangeName}
            ></input>
            <label htmlFor="selSkill">Skill Level</label>
            <select
              className="form-control"
              id="selSkill"
              onChange={onChangeSkillLevel}
              value={skillLevel} 
              defaultChecked={skillLevel}
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
              value={image}
              onChange={onChangeImage}
            ></input>
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={onChangeEmail}
            ></input>
            <label>Available Centers</label>
            
            {/* Loop over the Centers and display */}
            {availCenters.map(center => {               
                return (
                  <div key={`ret${center._id}`} id={arrayLength}>
                    <div key={`div1${center._id}`} className="input-group mb-3">
                      <div
                        key={`div2${center._id}`}
                        className="input-group-prepend"
                      >
                        <div
                          key={`div3${center._id}`}
                          className="input-group-text"
                          id={center._id}
                          onClick={onChangeX}
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
                            onChange={onChangeCenter}
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
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  
}

export default EditUser;
