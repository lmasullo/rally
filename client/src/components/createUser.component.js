//Dependencies
import React , { Component } from "react";
import axios from 'axios';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/rally';
}else{
    API_URL = 'http://localhost:4000/rally';
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
        this.onChangeSkillLevel = this.onChangeSkillLevel.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            name: '',
            skillLevel:0,
            image:'',
        }
    }
    
    //Set state when the name changes
    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    //Set state when the skill level changes
    onChangeSkillLevel(e){
        this.setState({
            skillLevel: e.target.value
        });
    }

    //Set state when the image url changes
    onChangeImage(e){
        this.setState({
            image: e.target.value
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
        const user = {
            name: this.state.name,
            skillLevel: this.state.skillLevel,
            image: this.state.image
        }

        //Send to back-end, look at routes/rally.route.js
        axios.post(`${API_URL}/add`, user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Clear the fields
        this.setState({
            name: "",
            skillLevel: "",
            image: ""
        })       
    }
    
    render(){
        return(
            <div>
                <h1>Create New User</h1>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}></input>
                        <label>Skill Level</label>
                        <input type="text" className="form-control" value={this.state.skillLevel} onChange={this.onChangeSkillLevel}></input>
                        <label>Image</label>
                        <input type="text" className="form-control" value={this.state.image} onChange={this.onChangeImage}></input>
                    </div>
                    <button className="btn btn-primary" type="submit" style={styleBtn}>Add User</button>
                    <button className="btn btn-warning" type="button" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}