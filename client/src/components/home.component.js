// Dependencies
import React, { useState, useEffect } from 'react';
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
// This is to make the Delete button look like a link
// const styleLink = {
//     overflow: 'visible',
//     width: 'auto',
//     fontSize: '1em',
//     textAlign: 'left',
//     color: 'cornflowerblue',
//     background: 'none',
//     margin: 0,
//     padding: 0,
//     border: 'none',
//     cursor: 'pointer',
// };

const cardStyle = {
  width: '18rem',
  marginBottom: '20px',
};

// Functional Component with Hooks
function Home() {
  // Set initial State with Hooks
  const [centers, setCenters] = useState([]);
  const [redirect, setRedirect] = useState('');
  const [user, setUser] = useState([]);
  const [justUserCenterNames, setJustUserCenterNames] = useState([]);

  // Get all the centers when the component mounts and put in centers
  // Use useEffect instead of ComponentDidMount
  useEffect(() => {
    // Use async await to fetch centers and users
    async function go() {
      try {
        const centerPromise = axios(`${API_URL}center`, { withCredentials: true });
        const userPromise = axios(`${API_URL}user`, {
          withCredentials: true,
        });

        // await both promises to come back and destructure the result into their own variables
        const [centers, user] = await Promise.all([centerPromise, userPromise]);
        console.log(centers.data, user.data);

        // Check if user logged in
        if (centers.data === 'Not Logged In!') {
          console.log('No Data');
          setRedirect(true);
        } else {
          // User Logged in
          console.log('Response (Centers):', centers.data);
          setCenters(centers.data);
        }

        console.log('Response User Array: ', user.data);
        setUser(user.data);

        // Set just the User's Centers in state
        setJustUserCenterNames(user.data[0].centers);
      } catch (e) {
        console.error(e); // 💩
      }
    }
    // Call the async/await function
    go();
  }, []); // End Use Effect

  // Function when user clicks Save Me checkbox on center card
  function onChangeSaveCenter(e) {
    //! Need function to delete if unchecked
    console.log('User Array: ', user);
    console.log('Checkbox Clicked: ', e.target.value);
    // Get just the centers from the user object
    console.log(justUserCenterNames);

    // See if the clicked center is already a favorite of the user
    const checkCenter = justUserCenterNames.includes(e.target.value);
    console.log(checkCenter);

    // If not already a favorite, push to an array and then send to the home route to save
    if (checkCenter === false) {
      // Push the new center to the user's centers array
      justUserCenterNames.push(e.target.value);

      // Send to back-end to Update user's centers
      axios
        .post(
          `${API_URL}home/update/${user[0]._id}`,
          justUserCenterNames
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  }

  // Functional component of the Centers cards
  function Center(props) {
    // This is the card html
    return (
      <div className="col-sm-4">
        <div className="card" style={cardStyle}>
          <img
            src={props.centers.image}
            className="card-img-top"
            alt="Center"
          />
          <h5 className="card-header">{props.centers.centerName}</h5>
          <div className="card-body">
            <p className="card-text">{props.centers.description}</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.centers.addressLink}
              className="btn btn-primary m-2"
            >
              Web Site
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.centers.mapLink}
              className="btn btn-primary"
            >
              Map
            </a>
          </div>
          <div className="card-footer text-center">
            <input
              type="checkbox"
              className="form-check-input"
              id="chkSaveMe"
              value={props.centers.centerName}
              onChange={onChangeSaveCenter}
              checked={props.checked}
            />
            <label
              htmlFor="chkSaveMe"
              className="form-check-label"
              htmlFor="chkSaveMe"
            >
              Save Me
            </label>
          </div>
        </div>
      </div>
    ); // End Return
  } // End Center Functional Component

  // Function to delete a center
  // function deleteCenter(id){
  //     axios.delete(`${API_URL}${id}`)
  //     .then(res => {
  //         //console.log(res.data);
  //         //Delete the center from view by filtering out the deleted center
  //         setCenters(centers.filter(el => el._id !==id))
  //     })
  //     .catch(err =>{
  //         console.log(err);
  //     })
  // }

  // Method to display each Center's Card on the page
  // This is called in the return statement at the bottom of the page
  function centerList() {
    // Loop over the centers array
    return centers.map(currentCenter => {
      // Check if the center name is in the user's center array
      const centerChecked = justUserCenterNames.includes(
        currentCenter.centerName
      );
      console.log('Included: ', currentCenter.centerName, centerChecked);

      // If already saved, check that cards checkbox
      if (centerChecked) {
        // setChecked(checked);
        // console.log(checked);

        // Send props to the above Center functional component
        // deleteCenter={deleteCenter}
        return (
          <Center
            centers={currentCenter}
            key={currentCenter._id}
            checked="checked"
          />
        );
      }
      return <Center centers={currentCenter} key={currentCenter._id} />;
    });
  }

  // Check if redirect state is true
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">Court Selection</h3>
          </div>
        </div>
        <div className="row">{centerList()}</div>
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

export default Home;
