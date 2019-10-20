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
        //Need super if a sub className, this is not in app.js
        super(props);

        //Need to bind this to the className
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeNumCourts = this.onChangeNumCourts.bind(this);
        this.onChangeAddressLink = this.onChangeAddressLink.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            centerName: '',
            hours: '',
            cost: true,
            numCourts: 1,
            addressLink: '',
        }
    }

    //Set state when the name changes
    onChangeName(e){
        this.setState({
            centerName: e.target.value
        });
    }

    //Set state when the hours changes
    onChangeHours(e){
        this.setState({
            hours: e.target.value
        });
    }

    //Set state when the cost changes
    onChangeCost(e){
        this.setState({
            cost: e.target.value
        });    
    }

    //Set state when the num courts changes
    onChangeNumCourts(e){
        this.setState({
            numCourts: e.target.value
        });
    }

    //Set state when the Address URL changes
    onChangeAddressLink(e){
        this.setState({
            addressLink: e.target.value
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
            hours: this.state.hours,
            cost: this.state.cost,
            numCourts: this.state.numCourts,
            addressLink: this.state.addressLink,
        }

        //Send to back-end, look at routes/centers.route.js
        axios.post(`${API_URL}/add`, center)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Clear the fields
        this.setState({
            centerName: "",
            hours: "",
            costs: true,
            numCourts: 1,
            addressLink: "",
        })       
    }
    
    render(){
        return(
            <div>
                <h1>Create New Center</h1>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Center Name</label>
                        <input type="text" className="form-control" value={this.state.centerName} onChange={this.onChangeName}></input>
                        <label>Hours</label>
                        <input type="text" className="form-control" value={this.state.hours} onChange={this.onChangeHours}></input>
                        <label>Cost - Free?</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioCost" id="radioCost1" value={true} onChange={this.onChangeCost}/>
                            <label className="form-check-label" htmlFor="radioCost1">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioCost" id="radioCost2" value={false} onChange={this.onChangeCost}/>
                            <label className="form-check-label" htmlFor="radioCost2">
                                No
                            </label>
                        </div>
                        <label>Number of Courts</label>
                        <input type="text" className="form-control" value={this.state.numCourts} onChange={this.onChangeNumCourts}></input>
                        <label>Address URL</label>
                        <input type="text" className="form-control" value={this.state.addressLink} onChange={this.onChangeAddressLink}></input>
                    </div>
                    <button className="btn btn-primary" type="submit" style={styleBtn}>Add Center</button>
                    <button className="btn btn-warning" type="button" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}