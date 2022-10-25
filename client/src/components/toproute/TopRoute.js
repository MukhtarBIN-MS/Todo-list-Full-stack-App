import React from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import Home from '../home/Home';
import "./style.css";

function TopRoute() {

    const activeBottomLink = {
        color:"white", 
        backgroundColor:"black",
        paddingBottom: "0.1rem",
        paddingLeft: "0.2rem",
        paddingRight: "0.2rem",
        borderRadius: "0.2rem"
    }
    
    return (
        <div>
        <Router>
            <div className="linker">
                <NavLink
                className="changelink"
                activeStyle={activeBottomLink}
                exact strict to="/">
                    Home
                </NavLink>

                <NavLink
                className="changelink"
                activeStyle={activeBottomLink} 
                exact strict to="/about-us">
                    About Us
                </NavLink>
            </div>
            <Route path="/" exact component={Home} />
        </Router>
    </div>
    );
}

export default TopRoute;