//Dependencies
import React , { Component } from "react";
import axios from 'axios';

//! Is this the correct way????????
//Check if production or local
//Users Routes
let API_URL = '';
//Centers Routes
let API_URL_CENTERS = '';
if (process.env.NODE_ENV === 'production') {
    API_URL = 'https://racquet-rally.herokuapp.com/user/';
    API_URL_CENTERS = 'https://racquet-rally.herokuapp.com/center/';
}else{
    API_URL = 'http://localhost:4000/user/';
    API_URL_CENTERS = 'http://localhost:4000/center/';
}

//CSS Styles
const styleBtn = {
    marginRight: '5px' 
};

const styleRedX = {
    color: 'red' 
};

//Class Component
export default class EditUser extends Component {

    //Set state and bindings
    constructor(props){
        //Need super if a sub class, this is not in app.js
        super(props);

        //Need to bind this to the class
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSkillLevel = this.onChangeSkillLevel.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeCenter = this.onChangeCenter.bind(this);
        this.onChangeX = this.onChangeX.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            name: '',
            skillLevel:'',
            image:'',
            centers: [],
            newCenters: [],
            availCenters: [],
        }
    }

    //Get the user that matches the id when the component mounts
    componentDidMount(){
        console.log(`${API_URL}${this.props.match.params.id}`);
        //Get the user by ID
        axios.get(`${API_URL}${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                name: response.data.name,
                skillLevel: response.data.skillLevel,
                image: response.data.image,
                centers: response.data.centers,
                newCenters: response.data.centers,
            })
            console.log('Affilated',this.state.centers);
            console.log('New',this.state.newCenters);           
        })
        .catch(err => {
            console.log(err);          
        });

        axios.get(`${API_URL_CENTERS}`)      
        .then(response => {
            console.log(response.data);           
            this.setState({
                availCenters: response.data
            })
            console.log('Avail',this.state.availCenters); 
        })
        .catch(err =>{
            console.log(err);        
        })      
    }//End Component Did Mount

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

    //Set state when the center changes
    onChangeCenter(e){
        //Need to save to the users collection
        console.log("Check", e.target.value);

        let checkCenter = this.state.newCenters.includes(e.target.value);

        if (checkCenter === false){
            this.state.newCenters.push(e.target.value);
            this.setState({
                newCenters: this.state.newCenters
            });
        }   
        console.log('New Centers', this.state.newCenters);      
    }

    //Method to delete center from user
    onChangeX(e){

        console.log(e.target.getAttribute('data-value'));
        
        // axios.post(`${API_URL}e.target.value`)
        // .then(res => {
        //     console.log(res.data);
        //     //Delete the user from view by filtering out the deleted user
        //     // this.setState({
        //     //     users: this.state.users.filter(el => el._id !==id)
        //     // })
        // })
        // .catch(err =>{
        //     console.log(err);           
        // })

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
            image: this.state.image,
            centers: this.state.newCenters,
        }

        console.log(user);
        

        //Send to back-end, look at routes/books.js
        axios.post(`${API_URL}update/${this.props.match.params.id}`, user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        //Clear the fields
        // this.setState({
        //     name: "",
        //     skillLevel: "",
        //     image: ""
        // })        

        //Go back to the User list
        //window.location = '/';
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
                    
                        <label>Available Centers</label>
                        {/* Loop over the Centers and display */}
                        {this.state.availCenters.map((center) =>
                           {
                            let checkCenter = this.state.centers.includes(center.centerName);
                            if(checkCenter === true){
                                return <div>
                                 
                                    <div key={`div1${center._id}`} className="input-group mb-3">
                                    <div key={`div2${center._id}`} className="input-group-prepend">
                                        <div key={`div3${center._id}`} className="input-group-text red" style={styleRedX} data-value={center.centerName} onClick={this.onChangeX}>
                                            X
                                        </div>
                                    </div>
                                    <div key={`div2${center._id}`} className="input-group-prepend">
                                        <div key={`div3${center._id}`} className="input-group-text">
                                            <input key={center._id} type="checkbox" checked value={center.centerName} onChange={this.onChangeCenter}/>
                                        </div>
                                    </div>
                                        <input key={`text${center._id}`} type="text" disabled className="form-control" defaultValue={center.centerName}/>
                                    </div>
                                
                                </div>
                            
                            }else{
                                return <div>
                                 
                                    <div key={`div1${center._id}`} className="input-group mb-3">
                                    <div key={`div2${center._id}`} className="input-group-prepend">
                                        <div key={`div3${center._id}`} className="input-group-text">
                                            <input key={center._id} type="checkbox" value={center.centerName} onChange={this.onChangeCenter}/>
                                        </div>
                                    </div>
                                        <input key={`text${center._id}`} type="text" disabled className="form-control" defaultValue={center.centerName}/>
                                    </div>
                                
                                </div>
                            }

                           } 
                            

                            
                        )}
                    </div>


                    <button className="btn btn-primary" type="submit" style={styleBtn}>Save Changes</button>
                    <button className="btn btn-warning" type="button" onClick={this.onCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}