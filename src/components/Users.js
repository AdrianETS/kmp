import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

class Users extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {}//{listOfUsers: []}
    }

    componentDidMount() {
        !this.context.userLogged && this.props.history.push("/");
        this.retrieveUsers();
    }

    retrieveUsers(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then((json) => {
        //this.setState({ listOfUsers: json })
        this.context.setListOfUsers(json);
        this.context.setOriginalUsers(json);
        
      })
    }

    render() {
        return <div>
            <Navbar />
            <Topbar />
            <h6>This is the list of users:</h6>
            <ol> 
            {this.context.listOfUsers.map(user => <li>{user.name}-{user.address.geo.lat}</li>)}
            </ol>
        </div>
    }

    //ol: ordered list (números) envuelve a li: list item

}

export default Users;