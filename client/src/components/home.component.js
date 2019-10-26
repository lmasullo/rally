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

//CSS Styles
const cardStyle = {
    width: '18rem'
}

//Functional component of center cards to display in home page
const Center = props => (
    <div className="row">
        <div className="card col-md-6" style={cardStyle}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.center.centerName}</h5>
                <p className="card-text">{props.centers.description}</p>
                <button href="#" className="btn btn-primary">Go somewhere</button>
            </div>
        </div>
    </div>
)

//Class Component
export default class Home extends Component {   

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

    //Method to display the functional component Center
    centerList(){
        // Loop over the centers array
        return this.state.centers.map(currentCenter => {
            //Return the User component, pass some props to the User Component
            //The User component is above in this file as a functional component
            return <Center centers={currentCenter} deleteCenter={this.deleteCenter} key={currentCenter._id}/>;
    });
};

        render(){
            //Check if redirect state is true
            if (this.state.redirect){
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
                            <div className='col-12' id="cardList">
                                {this.centerList()}
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

