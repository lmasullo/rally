import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

class Display extends Component {

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <nav>
                            <div className="col-2 float-left">
                                <h4>Racquet Ralley</h4>
                            </div>
                            <div className="col-10 float-right">
                                <button className="btn">Login</button>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12 card" id="banner">
                            
                        </div>
                        <div className="col-12 card" id="instructions">
                            
                        </div>
                        <div className="col-12 card" id="about">
                            
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <footer className="col-12">
                        <p>Copyright &copy; 2019 Team Racquet Rally.</p>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default Display;