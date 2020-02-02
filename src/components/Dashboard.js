import React from 'react';
import Auth from './../utils/Auth';
import { AppContext } from './../context/ContextProvider.js';
import Navbar from "./Navbar.js";

class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    render() {
        return this.context.userLogged && (
            <div>
                <Navbar />
            </div>
        );

    }

}

export default Dashboard;