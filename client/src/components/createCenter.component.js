//Dependencies
import React , { Component } from "react";
import axios from 'axios';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/center';
}else{
    API_URL = 'http://localhost:4000/center';
}

//CSS Styles
const styleBtn = {
    marginRight: '5px' 
};

//Class Component
export default class CreateUser extends Component {

    //Set state and bindings
    constructor(props){
        //Need super if a sub class, this is not in app.js
        super(props);

        //Need to bind this to the class
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            centerName: '',
        }
    }

    //Set state when the name changes
    onChangeName(e){
        this.setState({
            centerName: e.target.value
        });
    }

    //Method to route to root when clicks cancel
    onCancel(e){
        //Prevent default submission
        e.preventDefault();

        //Send back to Users List
        window.location = '/';
    }

    //Method when click Save Changes button
    onSubmit(e){
        //Prevent default submission
        e.preventDefault();
        
        //Create user object to save
        const center = {
            centerName: this.state.centerName,
        }

        //Send to back-end, look at routes/centers.route.js
        axios.post(`${API_URL}/add`, center)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Clear the fields
        this.setState({
            centerName: "",
        })       
    }
    
    render(){
        return(
            <div>
                <h1>Create New Center</h1>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" value={this.state.centerName} onChange={this.onChangeName}></input>
                    </div>
                    <button className="btn btn-primary" type="submit" style={styleBtn}>Add Center</button>
                    <button className="btn btn-warning" type="button" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}