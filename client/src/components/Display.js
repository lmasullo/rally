import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Display = () => {

    handleLogin()

    return (
        <div>

            <div className="container-fluid">
                <div className="row">
                    <nav>
                        <div className="col-2 float-left">
                            <h2>Racquet Ralley</h2>
                        </div>
                        <div className="col-10 float-right">
                            <Link to='/home'>
                            <button href="#" className="btn btn-primary">Login</button>
                            </Link>
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
    );
};


export default Display;