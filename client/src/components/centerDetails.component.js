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
  // const [currentUser, setCurrentUser] = useState('');
  const [users, setUsers] = useState([]);

  const [redirect, setRedirect] = useState('');

  // const [arrayLength, setArrayLength] = useState(0);

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
        // const currentUserPromise = axios(`${API_URL}user/auth`, {
        //   withCredentials: true,
        // });
        const usersPromise = axios(`${API_URL}user`, {
          withCredentials: true,
        });
        // await all promises to come back and destructure the result into their own variables
        const [centerData, usersData] = await Promise.all([
          centerPromise,
          // currentUserPromise,
          usersPromise,
        ]);
        // Check if user logged in
        if (centerData.data === 'Not Logged In!') {
          console.log('No Data');
          setRedirect(true);
        } else {
          // User Logged in
          //! This is the logic to set isFavorite
          // Maps over the centers array and checks if it is in the user's centers array (using id) and then adds isFavorite true/false
          // centerData.data = centerData.data.map(c => {
          //   const isFavorite = usersData.data.centers.some(uc => uc === c._id);
          //   return { isFavorite, ...c };
          // });
          // console.log(usersData.data);
          // console.log(id);
          // console.log(usersData.data[0].centers);

          // setCurrentUser(currentUserData);

          usersData.data = usersData.data.map(function(c, index) {
            const isAffiliated = usersData.data[index].centers.some(
              uc => uc === id
            );
            return { isAffiliated, ...c };
          });

          // Set centers state
          setCenter(centerData.data);
          // console.log(centerData.data);

          // Set the user object in state
          console.log('Response User Array: ', usersData.data);
          // setCurrentUser(currentUser.data);
          // const filteredUsers = usersData.data.filter(
          //   usersData.data.isAffiliated === true
          // );

          const filteredUsers = usersData.data.filter(
            user => user.isAffiliated === true
          );

          console.log(filteredUsers);

          setUsers(filteredUsers);
          // console.log(usersData.data);
        }
      } catch (e) {
        console.error(e); // 💩
      }
    }
    // Call the async/await function
    go();
    // Use arrayLength state to tell react to re-run useEffect after each change of the user's array
  }, [id]); // End Use Effect

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
        </div>
      </div>
      <div className="container">
        <div className="row">
          <table className="col-12 table">
            <tbody>
              <tr>
                <th scope="row">Address</th>
                <td>{center.addressLink}</td>
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
                <td>{String(center.cost)}</td>
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
