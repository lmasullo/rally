//Dependencies
import React , { Component } from "react";
import axios from 'axios';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/center/';
}else{
    API_URL = 'http://localhost:4000/center/';
}

//CSS Styles
const styleBtn = {
    marginRight: '5px' 
};

//Class Component
export default class EditCenter extends Component {

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

    //Get the center that matches the id when the component mounts
    componentDidMount(){
        console.log(`${API_URL}${this.props.match.params.id}`);
        //Get the center by ID
        axios.get(`${API_URL}${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                centerName: response.data.centerName,
            })
        })
        .catch(err => {
            console.log(err);          
        })
    }

    //Set state when the centerName changes
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
        
        //Create center object to save
        const center = {
            centerName: this.state.centerName,
        }

        //Send to back-end, look at routes/books.js
        axios.post(`${API_URL}/update/${this.props.match.params.id}`, center)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Clear the fields
        this.setState({
            centerName: "",
        })        

        //Go back to the User list
        window.location = '/centers';
    }
    
    render(){
        return(
            <div>
                <h1>Edit Center</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" value={this.state.centerName} onChange={this.onChangeName}></input>
                    </div>
                    <button className="btn btn-primary" type="submit" style={styleBtn}>Save Changes</button>
                    <button className="btn btn-warning" type="button" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}