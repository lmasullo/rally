import React , { Component } from "react";
import axios from 'axios';

//CSS Styles
const styleBtn = {
    margin: '5px' 
};

export default class EditUser extends Component {

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

    componentDidMount(){
        axios.get('http://localhost:4000/rally/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                name: response.data.name,
                skillLevel: response.data.skillLevel,
                image: response.data.image,
            })
        })
        .catch(err => {
            console.log(err);          
        })
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

    onCancel(e){
        //Prevent default submission
        e.preventDefault();

        //Send back to Users List
        window.location = '/';
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

        //Send to back-end, look at routes/books.js
        //todo need to change to production and local db
        axios.post('http://localhost:4000/rally/update/'+this.props.match.params.id, user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Clear the fields
        this.setState({
            name: "",
            skillLevel: "",
            image: ""
        })        

        //Go back to the User list
        window.location = '/';
    }
    
    render(){
        return(
            <div>
                <h1>Edit User</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}></input>
                        <label>Skill Level</label>
                        <input type="text" className="form-control" value={this.state.skillLevel} onChange={this.onChangeSkillLevel}></input>
                        <label>Image</label>
                        <input type="text" className="form-control" value={this.state.image} onChange={this.onChangeImage}></input>
                    </div>
                    <button className="btn btn-primary" type="submit" style={styleBtn}>Save Changes</button>
                    <button className="btn btn-warning" type="submit" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}