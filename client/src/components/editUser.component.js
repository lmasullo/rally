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
};

// Functional Hooks Component
function EditUser() {
  // Set initial State with Hooks
  // const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  const [skillLevel, setSkillLevel] = useState(1);
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  // const [userCenters, setUserCenters] = useState([]);
  const [availCenters, setAvailCenters] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [arrayLength, setArrayLength] = useState(0);

  // Get the url id parameter
  const { id } = useParams();

  // Use useEffect instead of ComponentDidMount
  useEffect(() => {
    //! **************************

    // Use async await to fetch centers and users
    async function go() {
      try {
        // Axios calls for centers and current user
        const centerPromise = axios(`${API_URL}center`, {
          withCredentials: true,
        });
        const userPromise = axios(`${API_URL}user/${id}`, {
          withCredentials: true,
        });

        // await both promises to come back and destructure the result into their own variables
        const [centersData, userData] = await Promise.all([
          centerPromise,
          userPromise,
        ]);

        console.log(centersData.data);
        console.log(userData.data);

        // Check if user logged in
        if (centersData.data === 'Not Logged In!') {
          console.log('No Data');
          setRedirect(true);
        } else {
          // User Logged in
          //! This is the logic to set isFavorite
          // Maps over the centers array and checks if it is in the user's centers array (using id) and then adds isFavorite true/false
          centersData.data = centersData.data.map(c => {
            const isFavorite = userData.data.centers.some(uc => uc === c._id);
            return { isFavorite, ...c };
          });
          // Set the available centers in state
          setAvailCenters(centersData.data);
        }

        // Set the user object in state
        console.log('Response User Array: ', userData.data);
        // setUser(userData.data);
        setUserId(userData.data._id);
        setUserName(userData.data.name);
        setSkillLevel(userData.data.skillLevel);
        setImage(userData.data.image);
        setEmail(userData.data.email);
        // setUserCenters(userData.data.centers);
        setArrayLength(userData.data.centers.length);
      } catch (e) {
        console.error(e); // 💩
      }
    }
    // Call the async/await function
    go();
    // Use arrayLength state to tell react to re-run useEffect after each change of the user's array
  }, [arrayLength, id]); // End Use Effect

  // Set state when the name changes
  function onChangeName(e) {
    setUserName(e.target.value);
  }

  // Set state when the skill level changes
  function onChangeSkillLevel(e) {
    setSkillLevel(e.target.value);
  }

  // Set state when the image url changes
  function onChangeImage(e) {
    setImage(e.target.value);
  }

  // Set state when the email changes
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  // Set state when the center changes
  function onChangeCenter(e) {
    //   // Need to save to the users collection
    console.log('Check: ', e.target.value);
    console.log('Check ID: ', e.target.id);

    // See if the clicked center is already a favorite of the user
    const checkCenter = e.target.checked;
    const centerId = e.target.id;
    console.log(checkCenter);

    // Create object of the center's id to send to backend
    const newCenter = {
      id: centerId,
    };

    // If not already a favorite, push to an array and then send to the home route to save
    if (checkCenter === true) {
      console.log('true');

      // Send to back-end to Update user's centers
      axios
        .post(`${API_URL}user/update/center/${userId}`, newCenter)
        .then(res => {
          console.log(res.data);
          // Set the setArrayLength state to re-trigger Component did Mount and re-render cards
          setArrayLength(res.data.length);
        })
        .catch(err => console.log(err));
    }
  }

  // Method to delete center from user
  function onChangeX(e) {
    // Get the tennis center to delete
    const centerId = e.target.id;

    // Create object of the center's id to send to backend
    const newCenter = {
      id: centerId,
    };

    // Delete center
    // Send to back-end to Update user's centers
    axios
      .post(`${API_URL}user/delete/center/${userId}`, newCenter)
      .then(res => {
        console.log(res.data);
        // Set the setArrayLength state to re-trigger useEffect and re-render cards
        setArrayLength(res.data.length);
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
    const newUser = {
      userName,
      skillLevel,
      image,
      email,
    };

    console.log(newUser);
    console.log(userId);

    // Send to back-end to Update user, look at routes/books.js
    axios
      .post(`${API_URL}user/update/${userId}`, newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  // Check if redirect state is true
  if (redirect) {
    console.log('Not Logged in!');
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <span>User Name</span>
          <input
            type="text"
            id="name"
            className="form-control"
            value={userName}
            onChange={onChangeName}
          ></input>
          <span>Skill Level</span>
          <select
            className="form-control"
            id="selSkill"
            onChange={onChangeSkillLevel}
            value={skillLevel}
            defaultChecked={skillLevel}
          >
            <option value="1">Beginner (1-2.5)</option>
            <option value="2">Intermediate (3-4.5)</option>
            <option value="3">Expert (Expert 5+)</option>
          </select>
          <span>Image</span>
          <input
            type="text"
            id="image"
            className="form-control"
            value={image}
            onChange={onChangeImage}
          ></input>
          <span>Email</span>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={onChangeEmail}
          ></input>
          <span>Available Centers</span>

          {/* Loop over the Centers and display */}
          {availCenters.map(
            center => (
              <div key={`ret${center._id}`}>
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
                      style={center.isFavorite ? styleRedX : styleHidden}
                    >
                      X
                    </div>
                  </div>
                  <div
                    key={`div4${center._id}`}
                    className="input-group-prepend"
                  >
                    <div key={`div5${center._id}`} className="input-group-text">
                      <input
                        key={`chk${center._id}`}
                        id={center._id}
                        type="checkbox"
                        checked={center.isFavorite ? 'checked' : ''}
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
            )
            // }
          )}
        </div>

        <button className="btn btn-primary" type="submit" style={styleBtn}>
          Save Changes
        </button>
        <button className="btn btn-warning" type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditUser;
