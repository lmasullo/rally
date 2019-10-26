import React, { Component } from "react";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/profile/';
}else{
    API_URL = 'http://localhost:4000/profile/';
}

const styleHTML = {
  height: '100%',
}

const styleBody = {
  height: '100%',
  display: 'flex',
  msFlexAlign: 'center',
  alignItems: 'center',
  paddingTop: '40px',
  paddingBottom: '40px',
  backgroundColor: '#f5f5f5'
}

const styleForm = {
  width: '100%',
  maxWidth: '330px',
  margin: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  height: 'auto',
  padding: '10px',
  fontSize: '16px',
  zIndex: '2',
}

//Functional component
const Center = props => (
  <tr>
      <td>{props.centers}</td>
  </tr>
)

class Login extends Component {

  //Set state and bindings
  constructor(props){
    super(props);
    this.state = {
        user: [],
        redirect: '',
    };
}

  //Get user info from authentication
  componentDidMount(){
    axios.get(API_URL, { withCredentials: true })
    .then(response => {
        //console.log(response.data);
        //User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
        if(response.data === 'Not Logged In!'){
          console.log('no data');
          this.setState({
            redirect: true
          })
        }else{
          //User Logged in
          this.setState({
            user: response.data
          })          
        }     
    })
}

  //Method to display each element in the table
  centerList(){
    console.log(this.state);

    if (this.state.user.centers){
      // Loop over the centers array
    return this.state.user.centers.map(currentCenter => {
      console.log(currentCenter);
      
        //Return the User component, pass some props to the User Component
        //The User component is above in this file as a functional component
        return <Center centers={currentCenter} key={currentCenter}/>;
  });
    }else {
      return 'Loading...'
    }
    
    
};
  
  render() {

    //Check if redirect state is true
    if (this.state.redirect){
      return <Redirect to="/" />;
    }

    return (
      <div style={styleHTML}>
          <div style={styleBody} className="text-center">
            <form className="form-signin" style={styleForm}>
              <h1 className="h3 mb-3 font-weight-normal">Signed In User:</h1>
              <h2>{this.state.user.name}</h2>
              <h3>{this.state.user.email}</h3>
              <img src={this.state.user.image} alt="User" height="100" width="100"/>
              <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
              {this.centerList()}

            </form>
          </div>
      </div>
    );
  }
}

export default Login;