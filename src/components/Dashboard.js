import React from 'react';
import Auth from './../utils/Auth';
import { AppContext } from './../context/ContextProvider.js';
import Navbar from "./Navbar.js";
import Users from "./Users";

class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.context.userLogged || this.props.history.push("/");
    }

    render() {
        return this.context.userLogged &&
            (
                <div>
                    <Navbar />
                    <div>Welcome to Dashboard</div>
                
                </div>

            ); 
    }



}

export default Dashboard;