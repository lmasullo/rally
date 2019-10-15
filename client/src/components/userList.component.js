import React , { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

let API_URL = '';

//Check if production or local
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/rally';
}else{
    API_URL = 'http://localhost:4000/rally';
}

//`${API_URL}/rally`

//CSS Styles
const styleLink = {
    overflow: 'visible',
    width: 'auto',
    fontSize: '1em',
    textAlign: 'left',
    color: 'cornflowerblue',
    background: 'none',
    margin: 0,
    padding: 0,
    border: 'none',
    cursor: 'pointer',
};

//Functional component
const User = props => (
    <tr>
        <td>{props.users.name}</td>
        <td>{props.users.skillLevel}</td>
        <td>{props.users.image}</td>
        <td>
            <Link to={"/edit/"+props.users._id}>Edit</Link> | 
            <button onClick={() => {props.deleteUser(props.users._id)}} style={styleLink}>Delete</button>
            {/* <a href="#" onClick={() => {props.deleteUser(props.users._id)}}>Delete</a> */}
        </td>
    </tr>
)

//Class Component
export default class UserList extends Component {   

    constructor(props){
        super(props);
        this.deleteUser  = this.deleteUser.bind(this);
        this.state = {users: []};
    }

    componentDidMount(){
        axios.get(API_URL)
        .then(response => {
            console.log(response.data);
            
            this.setState({
                users: response.data
            })
        })
        .catch(err =>{
            console.log(err);        
        })
    }

    //Function to delete a user
    deleteUser(id){
        axios.delete('http://localhost:4000/rally/'+id)
        .then(res => {
            console.log(res.data);
            //Delete the user from view by filtering out the deleted user
            this.setState({
                users: this.state.users.filter(el => el._id !==id)
            })
        })
        .catch(err =>{
            console.log(err);           
        })
    }

    //Method to display each element in the table
    userList(){
        // Loop over the users array
        return this.state.users.map(currentUser => {
            //Return the User component, pass some props to the User Component
            //The User component is above in this file as a functional component
            return <User users={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
    });
};


    render(){
        return(
            <div>
                <h1>Users</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Skill Level</th>
                            <th>Image</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Call the bookList method to display each element */}
                        {this.userList()}
                    </tbody>
                </table>
            </div>
        )
    }
}