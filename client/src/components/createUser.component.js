import React , { Component } from "react";
import axios from 'axios';

//Class Component
export default class CreateUser extends Component {

    constructor(props){
        //Need super if a sub class, this is not in app.js
        super(props);

        //Need to bind this to the class
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSkillLevel = this.onChangeSkillLevel.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            skillLevel:'',
            image:'',
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeSkillLevel(e){
        this.setState({
            skillLevel: e.target.value
        });
    }

    onChangeImage(e){
        this.setState({
            image: e.target.value
        });
    }

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
        //todo need to change to production and local db
        axios.post('http://localhost:4000/rally/add', user)
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
                    <button className="btn btn-primary" type="submit">Add User</button>
                </form>
            </div>
        )
    }
}