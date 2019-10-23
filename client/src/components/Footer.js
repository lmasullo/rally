import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

const Footer = () => {
    return (
        <div>

            <div className="container-fluid">
                <div className="row">
                    <footer className="col-12 text-center">
                    <p>Copyright &copy; 2019 Team Racquet Rally.</p>
                    </footer>
                </div>
            </div>

        </div>
    )
}

export default Footer;