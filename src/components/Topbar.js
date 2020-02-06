import React from 'react';
import { AppContext} from './../context/ContextProvider.js';
import Users from "./Users";

class Topbar extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
    }


    searchUsers(event){
        this.context.setListOfUsers(this.context.originalUsers.filter(item=>item.name.toUpperCase().includes(event.target.value.toUpperCase())));
    }


    render() {
        return (
            <div>
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