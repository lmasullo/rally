//Dependencies
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import Components
import Navbar from "./components/navbar.component";
import UserList from "./components/userList.component";
import CreateUser from "./components/createUser.component";
import EditUser from "./components/editUser.component";

//Main Component that is served up in index.js
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={UserList}/>
        <Route path="/create" exact component={CreateUser}/>
        <Route path="/edit/:id" exact component={EditUser}/>
      </div>
    </Router>
  );
}

//Export the component
export default App;
