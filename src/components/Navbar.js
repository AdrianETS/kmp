import React from 'react';
import { AppContext, ContextConsumer } from './../context/ContextProvider.js';
import LoginForm from "./LoginForm.js";
import Dashboard from "./Dashboard";
import { Link } from 'react-router-dom';
import Logout from './Logout.js';
import WelcomeMessage from "./WelcomeMessage";
import StatisticsPosts from "./StatisticsPosts";

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
                        <a className="nav-link active" href={"/#"}><Link to="/dashboard">Home</Link></a>
                        <a className="nav-link active" href={"/#"}><Link to="/about">About</Link></a>
                        <a className="nav-link active" href={"/#"}><Link to="/users">Users</Link></a>

                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Statistics</a>
                            <div className="dropdown-menu">
                                <a className="nav-link active" href={"/#"}><Link to="/statisticsposts">Posts per user</Link></a>
                                <a className="nav-link active" href={"/#"}><Link to="/statisticscomments">Comments per user</Link></a>
                            </div>
                        </div>


                        <div className="ml-auto" style={{ float: "right" }}>
                            <ContextConsumer>
                                {({ userName }) => <WelcomeMessage />}
                            </ContextConsumer>
                            <ContextConsumer>
                                {({ processLogout }) => <Logout />}
                            </ContextConsumer>
                        </div>

                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;