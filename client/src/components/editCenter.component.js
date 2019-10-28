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
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeNumCourts = this.onChangeNumCourts.bind(this);
        this.onChangeAddressLink = this.onChangeAddressLink.bind(this);
        this.onChangeMapLink = this.onChangeMapLink.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            centerName: '',
            description: '',
            hours: '',
            cost: true,
            numCourts: 1,
            addressLink: '',
            mapLink: '',
            image: '',
            check: '',
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
                description: response.data.description,
                hours: response.data.hours,
                cost: response.data.cost,
                numCourts: response.data.numCourts,
                addressLink: response.data.addressLink,
                mapLink: response.data.mapLink,
                image: response.data.image,
            })
        })
        .catch(err => {
            console.log(err);          
        })

        // if(this.state.cost === true){
        //     this.setState({
        //         check: 'checked'
        //     })
        // }
    }

    //Set state when the centerName changes
    onChangeName(e){
        this.setState({
            centerName: e.target.value
        });
    }

    //Set state when the description changes
    onChangeDescription(e){
        //console.log(e.target.value);
        
        this.setState({
            description: e.target.value
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

        // if(this.state.cost === true){
        //     this.setState({
        //         check: 'checked',
        //     })
        // }
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

    //Set state when the Map URL changes
    onChangeMapLink(e){
        this.setState({
            mapLink: e.target.value
        });
    }

    //Set state when the image uri changes
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
        window.location = '/centers';
    }

    //Method when click Save Changes button
    onSubmit(e){
        //Prevent default submission
        e.preventDefault();

        console.log(this.state.description);
        
        
        //Create center object to save
        const center = {
            centerName: this.state.centerName,
            description: this.state.description,
            hours: this.state.hours,
            cost: this.state.cost,
            numCourts: this.state.numCourts,
            addressLink: this.state.addressLink,
            mapLink: this.state.mapLink,
            image: this.state.image,
        }

        //Send to back-end, look at routes/books.js
        axios.post(`${API_URL}/update/${this.props.match.params.id}`, center)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Clear the fields
        this.setState({
            centerName: "",
            description: "",
            hours: "",
            costs: true,
            numCourts: 1,
            addressLink: "",
            mapLink: "",
            image: "",
        })        

        //Go back to the User list
        //window.location = '/centers';
    }
    
    render(){
        return(
            <div>
                <h1>Edit Center</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" value={this.state.centerName} onChange={this.onChangeName}></input>
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription}></input>
                        <label>Hours</label>
                        <input type="text" className="form-control" value={this.state.hours} onChange={this.onChangeHours}></input>
                        <label>Cost - Free?</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioCost" id="radioCost1" value={true} onChange={this.onChangeCost} />
                            <label className="form-check-label" htmlFor="radioCost1">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioCost" id="radioCost2" value={false} onChange={this.onChangeCost} />
                            <label className="form-check-label" htmlFor="radioCost2">
                                No
                            </label>
                        </div>
                        <label>Number of Courts</label>
                        <input type="text" className="form-control" value={this.state.numCourts} onChange={this.onChangeNumCourts}></input>
                        <label>Address URL</label>
                        <input type="text" className="form-control" value={this.state.addressLink} onChange={this.onChangeAddressLink}></input>
                        <label>Map URL</label>
                        <input type="text" className="form-control" value={this.state.mapLink} onChange={this.onChangeMapLink}></input>
                        <label>Image URI</label>
                        <input type="text" className="form-control" value={this.state.image} onChange={this.onChangeImage}></input>
                    </div>
                    <button className="btn btn-primary" type="submit" style={styleBtn}>Save Changes</button>
                    <button className="btn btn-warning" type="button" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}