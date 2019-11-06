// Dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// Import the centerCard component
import Center from "./centerCard.component";

// Check if production or local
let API_URL = "";
if (process.env.NODE_ENV === "production") {
  API_URL = "https://racquet-rally.herokuapp.com/";
} else {
  API_URL = "http://localhost:4000/";
}

const styleBody = {
  height: "100%",
  display: "flex",
  msFlexAlign: "center",
  alignItems: "center",
  paddingTop: "40px",
  paddingBottom: "40px",
  backgroundColor: "#f5f5f5"
};

const styleForm = {
  width: "100%",
  maxWidth: "600px",
  margin: "auto",
  position: "relative",
  boxSizing: "border-box",
  height: "auto",
  padding: "10px",
  fontSize: "16px",
  zIndex: "2",
  textAlign: "center"
};

// Method to display each Center's Card on the page
// This is called in the return statement at the bottom of the page
function centerList(centers, onChangeSaveCenter) {
  // Loop over the centers array
  return centers.map(currentCenter => (
    // Send props to the centerCard component, imported from components
    <Center
      key={currentCenter._id}
      centers={currentCenter}
      centerId={currentCenter._id}
      isFavorite={currentCenter.isFavorite}
      onChangeSaveCenter={onChangeSaveCenter}
    />
  ));
}

// Functional Component with Hooks
function Profile() {
  // Set initial State with Hooks
  const [centers, setCenters] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [user, setUser] = useState([]);
  const [arrayLength, setArrayLength] = useState(0);

  // Get all the centers when the component mounts and put in centers
  // Use useEffect instead of ComponentDidMount
  useEffect(() => {
    // Use async await to fetch centers and users
    async function go() {
      try {
        // Axios calls for centers and current user
        const centerPromise = axios(`${API_URL}center`, {
          withCredentials: true
        });
        const userPromise = axios(`${API_URL}user/auth`, {
          withCredentials: true
        });

        // await both promises to come back and destructure the result into their own variables
        const [centersData, userData] = await Promise.all([
          centerPromise,
          userPromise
        ]);

        // Check if user logged in
        if (centersData.data === "Not Logged In!") {
          console.log("No Data");
          setRedirect(true);
        } else {
          // User Logged in
          // Maps over the centers array and checks if it is in the user's centers array (using id) and then adds isFavorite true/false
          centersData.data = centersData.data.map(c => {
            const isFavorite = userData.data.centers.some(uc => uc === c._id);
            return { isFavorite, ...c };
          });
          // Set centers state
          setCenters(centersData.data);

          // Set the user object in state
          setUser(userData.data);

          // Check if the user has a skill level entered, if not show toast
        }
      } catch (e) {
        console.error(e); // 💩
      }
    }
    // Call the async/await function
    go();
    // Use arrayLength state to tell react to re-run useEffect after each change of the user's array
  }, [arrayLength]); // End Use Effect

  // Function when user clicks Save Me checkbox on center card
  function onChangeSaveCenter(e, centerId) {
    // See if the clicked center is already a favorite of the user
    const checkCenter = e.target.checked;

    // Create object of the center's id to send to backend
    const newCenter = {
      id: centerId
    };

    // If not already a favorite, push to an array and then send to the home route to save
    if (checkCenter === true) {
      // Send to back-end to Update user's centers
      axios
        .post(`${API_URL}user/update/center/${user._id}`, newCenter)
        .then(res => {
          // Set the setArrayLength state to re-trigger useEffect and re-render cards
          setArrayLength(res.data.centers.length);
        })
        .catch(err => console.log(err));
    } else {
      // Delete center
      // Send to back-end to Update user's centers
      axios
        .post(`${API_URL}user/delete/center/${user._id}`, newCenter)
        .then(res => {
          // Set the setArrayLength state to re-trigger useEffect and re-render cards
          setArrayLength(res.data.centers.length);
        })
        .catch(err => console.log(err));
    }
  }

  // Check if redirect state is true
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div style={styleBody}>
      <div className="container">
        <div className="row">
          <form className="form-signin" style={styleForm}>
            <h1 className="h3 mb-3 font-weight-normal">View your Profile!</h1>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <img src={user.image} alt="User" height="100" width="100" />

            <h3>
              <label>Skill Level: </label>
              {user.skillLevel}
            </h3>
          </form>
          <div className="col-12">
            {/* Toast, send show and message prop */}

            <h3 className="text-center mb-4">
              {user.name}'s' Favorite Courts!
            </h3>
          </div>
        </div>
        {/* Call centerList function to map over the centers and render the cards */}
        {/* Pass in the centers, onChangeSaveCenter Function */}
        <div className="row">{centerList(centers, onChangeSaveCenter)}</div>
      </div>
    </div>
  );
}

export default Profile;
