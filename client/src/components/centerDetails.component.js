import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';
// Import the User Card
import UserCard from './userCard.component';

// Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://racquet-rally.herokuapp.com/';
} else {
  API_URL = 'http://localhost:4000/';
}

// Method to display each Center's Card on the page
// This is called in the return statement at the bottom of the page
function userList(users) {
  // Loop over the users array
  return users.map(currentUser => (
    // Send props to the userCard component, imported from components
    <UserCard
      key={currentUser._id}
      users={currentUser}
      userId={currentUser._id}
      isAffiliated={currentUser.isAffiliated}
    />
  ));
}

// Functional Component with Hooks
function CenterDetails() {
  // Set initial State with Hooks
  const [center, setCenter] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState('');
  const [arrayLength, setArrayLength] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [cost, setCost] = useState('Nope!');

  // Get the url id parameter
  const { id } = useParams();

  // Get all the centers when the component mounts and put in centers
  // Use useEffect instead of ComponentDidMount
  useEffect(() => {
    // Use async await to fetch centers and users
    async function go() {
      try {
        // Axios calls for center, current user, and affiliated users
        const centerPromise = axios(`${API_URL}center/${id}`, {
          withCredentials: true,
        });

        const currentUserPromise = axios(`${API_URL}user/auth`, {
          withCredentials: true,
        });

        const usersPromise = axios(`${API_URL}user`, {
          withCredentials: true,
        });
        // await all promises to come back and destructure the result into their own variables
        const [centerData, currentUserData, usersData] = await Promise.all([
          centerPromise,
          currentUserPromise,
          usersPromise,
        ]);
        // Check if user logged in
        if (centerData.data === 'Not Logged In!') {
          console.log('No Data');
          setRedirect(true);
        } else {
          // User Logged in
          //! This is the logic to set isFavorite

          console.log('Center!!:', centerData.data);

          // Look at current user's array of centers
          // Check if this center's id is in there
          const isFavorite = currentUserData.data.centers.some(
            uc => uc === center._id
          );

          // Set state to check favorite checkbox
          console.log(isFavorite);
          if (isFavorite) {
            setIsChecked(true);
          }

          // Set cost state
          if (center.cost) {
            setCost('Yes!');
          }

          // Set the currently logged in user to state
          setCurrentUser(currentUserData);

          // This adds the isAffiliated to the users array
          usersData.data = usersData.data.map(function(c, index) {
            const isAffiliated = usersData.data[index].centers.some(
              uc => uc === id
            );
            return { isAffiliated, ...c };
          });

          // Set centers state
          setCenter(centerData.data);
          console.log(centerData.data);

          // Set the user object in state
          console.log('Response User Array: ', usersData.data);

          // Filter the users to just those affiliated with these centers
          const filteredUsers = usersData.data.filter(
            user => user.isAffiliated === true
          );

          // Set the affiliated users to state
          setUsers(filteredUsers);
        }
      } catch (e) {
        console.error(e); // 💩
      }
    }
    // Call the async/await function
    go();
    // Use arrayLength state to tell react to re-run useEffect after each change of the user's array
  }, [arrayLength, center._id, center.cost, id]); // End Use Effect

  function onChangeSaveCenter(e, centerId) {
    // See if the clicked center is already a favorite of the user
    const checkCenter = e.target.checked;
    console.log('Check Center', checkCenter);

    // Create object of the center's id to send to backend
    const newCenter = {
      id: centerId,
    };

    console.log(newCenter);
    console.log(currentUser.data._id);

    // If not already a favorite, push to an array and then send to the home route to save
    if (checkCenter === true) {
      // Send to back-end to Update user's centers
      axios
        .post(`${API_URL}user/update/center/${currentUser.data._id}`, newCenter)
        .then(res => {
          console.log(res.data);
          console.log(res.data.centers.length);
          // Set the setArrayLength state to re-trigger useEffect and re-render cards
          setArrayLength(res.data.centers.length);
        })
        .catch(err => console.log(err));
    } else {
      // Delete center
      // Send to back-end to Update user's centers
      axios
        .post(`${API_URL}user/delete/center/${currentUser.data._id}`, newCenter)
        .then(res => {
          console.log(res.data);
          console.log(res.data.centers.length);

          // Set the setArrayLength state to re-trigger useEffect and re-render cards
          setArrayLength(res.data.centers.length);
          setIsChecked(false);
        })
        .catch(err => console.log(err));
    }
  }

  // Check if redirect state is true
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">{center.centerName}</h1>
          <p className="lead">Welcome!</p>
          <p>{center.description}</p>
          <div className="text-left ml-4">
            <input
              name="chkSaveMe"
              type="checkbox"
              className="form-check-input"
              id={center._id}
              value={center.centerName}
              onChange={e => onChangeSaveCenter(e, center._id)}
              checked={isChecked ? 'checked' : ''}
            />
            <label htmlFor="chkSaveMe" className="form-check-label">
              Favorite
            </label>
          </div>
          <div className="mt-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={center.mapLink}
              className="btn btn-primary"
            >
              Map
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <table className="col-12 table">
            <tbody>
              <tr>
                <th scope="row">Web Site</th>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={center.addressLink}
                  >
                    {center.centerName}
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">Hours</th>
                <td>{center.hours}</td>
              </tr>
              <tr>
                <th scope="row">Number of Courts</th>
                <td>{center.numCourts}</td>
              </tr>
              <tr>
                <th scope="row">Cost (Free?)</th>
                <td>{cost}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">Players At This Court</h3>
          </div>
        </div>
        <div className=" row">
          {/* Render current players playing at this court */}
          {userList(users)}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <footer className="col-12">
            <p>Copyright &copy; 2019 Team Racquet Rally.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default CenterDetails;
