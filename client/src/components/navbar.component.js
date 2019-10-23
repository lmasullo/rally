//Dependencies
import React , { Component } from "react";
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Racquet Rally</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createCenter" className="nav-link">Add Center</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/centers" className="nav-link">Centers</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to='/mycourts'>My Courts</Link>
                        </li>
                        <li className="navbar-item">
                            <button>Logout</button>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}