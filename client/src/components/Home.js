import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
    
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
                                <button className="btn">My Courts</button>
                                <button className="btn">Logout</button>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3>Court Selection</h3>
                        </div>
                        <div className="row">
                            <div className="card col-md-6" style="width: 18rem;">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Austin Tennis Center</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card col-md-6" style="width: 18rem;">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">South Austin Tennis Center</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card col-md-6" style="width: 18rem;">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Caswell Tennis Center</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card col-md-6" style="width: 18rem;">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Pharr Tennis Center</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
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
};

export default Home;