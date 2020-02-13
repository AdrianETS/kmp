import React from 'react';
import { AppContext } from './../context/ContextProvider.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./Users";
import CreateUser from "./CreateUser";
import { Link } from 'react-router-dom';

class Topbar extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
        this.searchUsersByLatNorth = this.searchUsersByLatNorth.bind(this);
        this.searchUsersByLatSouth = this.searchUsersByLatSouth.bind(this);
        this.goToCreateUser = this.goToCreateUser.bind(this);
    }


    searchUsers(event) {
        this.context.setListOfUsers(this.context.originalUsers.filter(item => item.name.toUpperCase().includes(event.target.value.toUpperCase())));
    }

    searchUsersByLatNorth(event) {
        let listOfUsersCopy = this.context.listOfUsers;
        if (event.target.checked) {
            listOfUsersCopy.forEach(
                (item, index, array) => {
                    if (parseInt(item.address.geo.lat) > 0) array[index] = null;
                });
                this.context.setListOfUsers(listOfUsersCopy.filter(item=>item != null));
        } else {

            this.context.setListOfUsers([...this.context.listOfUsers, ...this.context.originalUsers.filter(item => parseInt(item.address.geo.lat) > 0)]);

        }

    }

    searchUsersByLatSouth(event) {
        let listOfUsersCopy = this.context.listOfUsers;
        if (event.target.checked) {
            listOfUsersCopy.forEach(
                (item, index, array) => {
                    if (parseInt(item.address.geo.lat) < 0) array[index] = null;
                });
                this.context.setListOfUsers(listOfUsersCopy.filter(item=>item != null));
        } else {
           this.context.setListOfUsers([...this.context.listOfUsers, ...this.context.originalUsers.filter(item => parseInt(item.address.geo.lat) < 0)]);
        }

    }

    goToCreateUser(){
        this.props.history.push("/createuser");
    }




    render() {
        return (
            <div>
                <input type="checkbox" value="North" onChange={this.searchUsersByLatNorth} /> North
                <br></br>
                <input type="checkbox" value="South" onChange={this.searchUsersByLatSouth} /> South
                <button type="button" className="btn btn-link" ><Link to="/createuser">Create users</Link></button>
                <nav className="navbar navbar-light bg-light">
                    <a className="form-inline"></a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" onChange={this.searchUsers} placeholder="Search" aria-label="Search"></input>
                    </form>
                </nav>
            </div>
        );
    }

}

export default Topbar;


