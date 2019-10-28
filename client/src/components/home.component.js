//Dependencies
import React , { useState, useEffect } from "react";
//import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/center/';
}else{
    API_URL = 'http://localhost:4000/center/';
}

//CSS Styles
//This is to make the Delete button look like a link
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
     marginBottom: '20px'
}

//Functional Component with Hools  
function Home() {

    //Set initial State with Hooks
    const [centers, setCenters] = useState([]);
    const [redirect, setRedirect] = useState('');

    //Get all the centers when the component mounts and put in centers
    //Use useEffect instead of ComponentDidMount
    //! Review useEffect!!!!!!
    useEffect(() => {
        axios.get(API_URL, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            //User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
            if(response.data === 'Not Logged In!'){
                console.log('No Data');
                setRedirect(true);
            }else{
                //User Logged in
                setCenters(response.data);
                console.log(centers);            
            }     
        })
        .catch(err =>{
            console.log(err);        
        })
      }, []);

    //Functional component of the Centers cards
    function Center(props) {
        function onChangeSaveCenter(e) {
            console.log('Checkbox Clicked: ', e.target.value);    
            //setCenters(e.target.value);
            console.log(centers);
            let categories = [...centers];
            let checkCenter = categories.includes(e.target.value);
            console.log(checkCenter);
            
            //if (checkCenter === false){
                //setCenters(centers.push(e.target.value));
            //}   
            //console.log('New Centers', props.center);        
        }

        // Declare a new state variable, which we'll call "count"
        //const [saveCenter, setSaveCenter] = useState('');
        return(
            <div className="col-sm-4">
                <div className="card" style={cardStyle}>
                    <img src={props.centers.image} className="card-img-top" alt="Center"/>
                    <h5 className="card-header">{props.centers.centerName}</h5>
                    <div className="card-body">            
                        <p className="card-text">{props.centers.description}</p>
                        <a target = "_blank" rel="noopener noreferrer" href={props.centers.addressLink} className="btn btn-primary m-2">Web Site</a>
                        <a target = "_blank" rel="noopener noreferrer" href={props.centers.mapLink} className="btn btn-primary">Map</a>
                        
                    </div>
                    <div className="card-footer text-center">
                        <input type="checkbox" className="form-check-input" id="chkSaveMe" value={props.centers.centerName} onChange={onChangeSaveCenter} />
                        <label className="form-check-label" htmlFor="chkSaveMe">Save Me</label>
                        {/* <label>{saveMe}</label> */}
                    </div>
                </div>
            </div>
        )//End Return
    }//End Center Functional Component

    //Function to delete a center
    function deleteCenter(id){
        axios.delete(`${API_URL}${id}`)
        .then(res => {
            console.log(res.data);
            //Delete the center from view by filtering out the deleted center
            setCenters(centers.filter(el => el._id !==id))
        })
        .catch(err =>{
            console.log(err);           
        })
    }

    //Method to display each element in the table
    function centerList(){
        // Loop over the centers array
        return centers.map(currentCenter => {
            //Return the User component, pass some props to the User Component
            //The User component is above in this file as a functional component
            return <Center centers={currentCenter} deleteCenter={deleteCenter} key={currentCenter._id}/>;
        });
    };

    //Check if redirect state is true
    if (redirect){
        return <Redirect to="/" />;
    }
    return (
        <div>         
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className='text-center'>Court Selection</h3>
                    </div>
                </div>
                <div className='row'>
                    {centerList()}
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
};

export default Home;