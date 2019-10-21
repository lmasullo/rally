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
            </div>

            
        )
    }
}

export default Home;