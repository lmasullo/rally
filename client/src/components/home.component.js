// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Center from "./centerCard.component";
// Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://racquet-rally.herokuapp.com/';
} else {
  API_URL = 'http://localhost:4000/';
}

function centerList(centers, justUserCenterNames, onChangeSaveCenter) {

  //Array for checkboxes
  var arrCheck = [];

  // Loop over the centers array
  return centers.map((currentCenter, index) => {

    // Push the checkbox index to the checkbox array
    arrCheck.push(index);

    // console.log("The current iteration is: " + index);
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
          centerId={currentCenter._id}
          index={index}
          checked="checked"
          onChangeSaveCenter={onChangeSaveCenter}
          chkIndex={arrCheck}
        />
      );
    }
    // IF Not a saved center, don't send the checked parameter
    return <Center centers={currentCenter} key={currentCenter._id} index={index} chkIndex={arrCheck}/>;
  });
}


// Functional Component with Hooks
function Home() {
  // Set initial State with Hooks
  const [centers, setCenters] = useState([]);
  const [redirect, setRedirect] = useState('');
  const [user, setUser] = useState([]);
  const [justUserCenterNames, setJustUserCenterNames] = useState([]);
  //const [checked, setChecked] = useState(false);
  //const [checkboxes, setCheckboxes] = useState([]);

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
        let [centersData, user] = await Promise.all([centerPromise, userPromise]);
        var firstUser = user.data[0];
        console.log(firstUser, centersData);
        centersData.data = centersData.data.map(c => {
          var isFavorite = firstUser.centers.some(uc => uc === c.centerName);
          return {isFavorite, ...c}
        })

        console.log(centersData.data, user.data);
        
        // Check if user logged in
        if (centersData.data === 'Not Logged In!') {
          console.log('No Data');
          setRedirect(true);
        } else {
          // User Logged in
          console.log('Response (Centers):', centersData.data);
          setCenters(centersData.data);
        }

        // Set the user object in state
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
  function onChangeSaveCenter(e, centerId) {
    //! Need function to delete if unchecked


    console.log('e.target', e.target);
    console.log('e.target.checked', e.target.checked);
    
    ///console.log('Checked?: ',checked);
    console.log('Index: ' , e.target.getAttribute("data-index"));

    const index = e.target.getAttribute("data-index");

    console.log('Array Check: ' , e.target.getAttribute("data-arrcheck"));

    //console.log(checkboxes);

    const checkboxes = e.target.getAttribute("data-arrcheck");

    // Add the checkbox to the state variable
    //setCheckboxes(arrCheck);
    

    //checkboxes[index].checked = !checkboxes[index].checked;
    //checkboxes[index].checked = setChecked(!checked);

    
    // if(checked === true){
    //   setChecked(false);
    // }else{
    //   setChecked(true);
    // }
    //setChecked(!checked);
    
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
      //! save by ID
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
        <div className="row">{centerList(centers, justUserCenterNames, onChangeSaveCenter)}</div>
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
