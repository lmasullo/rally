//Dependencies
import React , { Component } from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/home';
}else{
    API_URL = 'http://localhost:4000/home';
}


//Class Component
export default class CenterDetails extends Component {   

    //Set state and bindings
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            redirect: '',
        };
    }

    componentDidMount(){        
        axios.get(API_URL, { withCredentials: true })
        .then(response => {
            console.log(response);
            //User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
            if(response.data === 'Not Logged In!'){
                console.log('no data');
                this.setState({
                redirect: true
                })
            }else{
                //User Logged in
                this.setState({
                users: response.data
                })
            }    
        })
        .catch(err =>{
            console.log(err);        
        })
    }

        render(){
            //Check if redirect state is true
            if (this.state.redirect){
                return <Redirect to="/" />;
            }
            return (
                <div>
                   
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">{this.props.centers.centerName}</h1>
                            <p class="lead">Welcome!</p>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <table class="col-12 table">
                                <tbody>
                                    
                                    <tr>
                                    <th scope="row">Address</th>
                                    <td>{this.centers.addressLink}</td>
                                    </tr>

                                    <tr>
                                    <th scope="row">Hours</th>
                                    <td>{this.centers.hours}</td>
                                    </tr>

                                    <tr>
                                    <th scope="row">Number of Courts</th>
                                    <td>{this.centers.numCourts}</td>
                                    </tr>

                                    <tr>
                                    <th scope="row">Cost (Free?)</th>
                                    <td>{this.centers.cost}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <h3 className="text-center">
                                    Players At This Court
                                </h3>
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
        };

    };

