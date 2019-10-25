//Dependencies
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import Components
//Nav Bar
import Navbar from "./components/navbar.component";
//Users
import UserList from "./components/userList.component";
import CreateUser from "./components/createUser.component";
import EditUser from "./components/editUser.component";
//Centers
import CreateCenter from "./components/createCenter.component";
import CenterList from "./components/centerList.component";
import EditCenter from "./components/editCenter.component";
//Home page
import Home from "./components/home.component";
//Login page
import Login from "./components/login.component";
//Profile page
import Profile from "./components/profile.component";

//Main Component that is served up in index.js
function App() {
  return (
    
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Login}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/users" exact component={UserList}/>
        {/* <Route path="/" exact component={UserList}/> */}

        {/* <Route path="/auth/google" exact component={UserList}/> */}

        <Route path="/main" exact component={Home}/>
        <Route path="/create" exact component={CreateUser}/>
        <Route path="/edit/:id" exact component={EditUser}/>
        <Route path="/createCenter" exact component={CreateCenter}/>
        <Route path="/centers" exact component={CenterList}/>
        <Route path="/center/edit/:id" exact component={EditCenter}/>
      </div>
    </Router>
  );
}

//Export the component
export default App;
