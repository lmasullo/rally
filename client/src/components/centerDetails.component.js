// Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import VideoBg from "reactjs-videobg";
import ogg from "../videos/Neon.ogg";
import webm from "../videos/Neon.webm";
import mp4 from "../videos/Neon.mp4";
import poster from "../image/poster.jpg";
import "../style.css";
// Import the centerCard component
// import User from './userCard.component';

//! Is this the correct way????????
// Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://racquet-rally.herokuapp.com/';
} else {
  API_URL = 'http://localhost:4000/';
}

// Class Component
export default class CenterDetails extends Component {
  // Set state and bindings
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      center: [],
      redirect: '',
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}center/${this.props.match.params.id}`, {
        withCredentials: true,
      })
      .then(response => {
        console.log(response.data);
        // User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
        if (response.data === 'Not Logged In!') {
          console.log('no data');
          this.setState({
            redirect: true,
          });
        } else {
          // User Logged in
          this.setState({
            center: response.data,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${API_URL}user`, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        // User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
        if (response.data === 'Not Logged In!') {
          console.log('no data');
          this.setState({
            redirect: true,
          });
        } else {
          // User Logged in
          this.setState({
            users: response.data,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // Check if redirect state is true
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <VideoBg poster={poster}>
            <VideoBg.Source src={ogg} type="video/ogg" />
            <VideoBg.Source src={webm} type="video/webm" />
            <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">{this.state.center.centerName}</h1>
            <p className="lead">Welcome!</p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <table className="col-12 table">
              <tbody>
                <tr>
                  <th scope="row">Address</th>
                  <td>{this.state.center.addressLink}</td>
                </tr>

                <tr>
                  <th scope="row">Hours</th>
                  <td>{this.state.center.hours}</td>
                </tr>

                <tr>
                  <th scope="row">Number of Courts</th>
                  <td>{this.state.center.numCourts}</td>
                </tr>

                <tr>
                  <th scope="row">Cost (Free?)</th>
                  <td>{String(this.state.center.cost)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-12">
              <h3 className="text-center">Players At This Court</h3>
              <br></br>
              <div className="courtPlayers">
                {/* Render current players playing at this court */}
              </div>
            </div>
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
}
