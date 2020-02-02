import React from 'react';
import { AppContext, ContextConsumer } from './../context/ContextProvider.js';
import LoginForm from "./LoginForm.js";
import Dashboard from "./Dashboard";
import { Link } from 'react-router-dom';
import Logout from './Logout.js';
//import Logout from "./Logout";

class Navbar extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" itemID="navbarNavAltMarkup">
                            <a class="nav-link active" href = {"/#"}><Link to = "/">Home</Link></a>
                            <a class="nav-link active"href = {"/#"}><Link to = "/about">About</Link></a>
                        <div class="navbar-nav">
                            <ContextConsumer>
                                {({processLogout}) =><Logout/>}
                            </ContextConsumer>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;