//Dependencies
import React , { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

//! Is this the correct way????????
//Check if production or local
let API_URL = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/center/';
}else{
    API_URL = 'http://localhost:4000/center/';
}

//CSS Styles
//This is to make the Delete button look like a link
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
const Center = props => (
    <tr>
        <td>{props.centers.centerName}</td>
        <td>{props.centers.description}</td>
        <td>{props.centers.hours}</td>
        {/* Boolean needs to be converted to string in JSX */}
        <td>{String(props.centers.cost)}</td>
        <td>{props.centers.numCourts}</td>
        <td>{props.centers.addressLink}</td>
        <td>
            <Link to={"center/edit/"+props.centers._id}>Edit</Link> | 
            <button onClick={() => {props.deleteCenter(props.centers._id)}} style={styleLink}>Delete</button>
        </td>
    </tr>
)

//Class Component
export default class CenterList extends Component {   

    //Set state and bindings
    constructor(props){
        super(props);
        this.deleteCenter  = this.deleteCenter.bind(this);
        this.state = {
            centers: [],
            redirect: '',
        };
    }

    //Get all the centers when the component mounts and put in centers
    componentDidMount(){
        axios.get(API_URL, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            //User Not logged in, so redirect to login, by setting redirect to true, it triggers in render
            if(response.data === 'Not Logged In!'){
                console.log('no data');
                this.setState({
                redirect: true
                })
            }else{
                //User Logged in
                this.setState({
                    centers: response.data
                })
            }     
        })
        .catch(err =>{
            console.log(err);        
        })
    }

    //Function to delete a center
    deleteCenter(id){
        axios.delete(`${API_URL}${id}`)
        .then(res => {
            console.log(res.data);
            //Delete the center from view by filtering out the deleted center
            this.setState({
                centers: this.state.centers.filter(el => el._id !==id)
            })
        })
        .catch(err =>{
            console.log(err);           
        })
    }

    //Method to display each element in the table
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
        return(
            <div>
                <h1>Centers</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Hours</th>
                            <th>Cost (Free)</th>
                            <th>Number of Courts</th>
                            <th>Address URL</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Call the bookList method to display each element */}
                        {this.centerList()}
                    </tbody>
                </table>
            </div>
        )
    }
}