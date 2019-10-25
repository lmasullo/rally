//Dependencies
import React , { Component } from "react";
import axios from "axios";
// import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
//import { Link } from 'react-router-dom';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/home';
}else{
    API_URL = 'http://localhost:4000/home';
}

//CSS Styles
const cardStyle = {
    width: '18rem'
}


// function handleLogout() {
//     console.log('Log out clicked');
// }

//Class Component
export default class Home extends Component {   

    //Set state and bindings
    constructor(props){
        super(props);
        this.state = {
            userName: ''
        };
    }

    componentDidMount(){        
        axios.get(API_URL)
        .then(response => {
            console.log(response);
            
            // this.setState({
            //     users: response.data
            // })
        })
        .catch(err =>{
            console.log(err);        
        })
    }

//const Home = () => {
        render(){
            return (
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            {/* <nav>
                                <div className="col-2 float-left">
                                    <h2>Racquet Ralley</h2>
                                </div>
                                <div className="col-10 float-right">
                                    <Link to='/mycourts'>
                                    <button href="#" className="btn btn-primary">My Courts</button>
                                    </Link>
                                    <button href="#" className="btn btn-primary" onClick={handleLogout}>Logout</button>
                                </div>
                            </nav> */}
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3>Court Selection</h3>
                            </div>
                            <div className="row">
                                <div className="card col-md-6" style={cardStyle}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Austin Tennis Center</h5>
                                        <p className="card-text">The Austin Tennis Center is the largest public tennis and Pickleball Center in the Austin and surrounding areas.  Play on any of the ten tournament standard tennis courts or 8 outdoor pickleball courts.</p>
                                        <button href="#" className="btn btn-primary">Go somewhere</button>
                                    </div>
                                </div>
                                <div className="card col-md-6" style={cardStyle}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">South Austin Tennis Center</h5>
                                        <p className="card-text">Welcome to Rippner Tennis at South Austin Tennis Center. No matter your age or ability, we’ll help you play more tennis!</p>
                                        <button href="#" className="btn btn-primary">Go somewhere</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card col-md-6" style={cardStyle}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Caswell Tennis Center</h5>
                                        <p className="card-text">Built in 1946, Caswell Tennis Center has been an Austin icon for decades. Located at 24th and Lamar, its central location and historic significance makes Caswell the hub of tennis activity in Austin.</p>
                                        <button href="#" className="btn btn-primary">Go somewhere</button>
                                    </div>
                                </div>
                                <div className="card col-md-6" style={cardStyle}>
                                    <img src="..." className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Pharr Tennis Center</h5>
                                        <p className="card-text">Pharr Tennis Center is a family-friendly, public tennis facility, dedicated to growing the game of tennis and serving the surrounding community.</p>
                                        <button href="#" className="btn btn-primary">Go somewhere</button>
                                    </div>
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
        };

    };

