import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

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

class Login extends Component {


  //Set state and bindings
  constructor(props){
    super(props);
    this.state = {
        user: '',
    };
}

  //Get all the centers when the component mounts and put in centers
  componentDidMount(){
    axios.get('http://localhost:4000/profile', { withCredentials: true })
    .then(response => {
        console.log(response.data);
        
        this.setState({
            user: response.data
        })
    })
}
  
  
  render() {
    return (
      <div style={styleHTML}>
          <div style={styleBody} className="text-center">
            <form className="form-signin" style={styleForm}>
              <h1 className="h3 mb-3 font-weight-normal">Signed In User:</h1>
              <h2>{this.state.user.name}</h2>
              <h3>{this.state.user.email}</h3>
              <img src={this.state.user.image} alt="User" height="100" width="100"/>
              <p className="mt-5 mb-3 text-muted">&copy; 2019</p>
            </form>
          </div>
      </div>
    );
  }
}

export default Login;