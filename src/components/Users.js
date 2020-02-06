import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./Navbar";

class Users extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {listOfUsers: []}
    }

    componentDidMount() {
        !this.context.userLogged && this.props.history.push("/");
        this.retrieveUsers();
    }

    retrieveUsers(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then((json) => {
        this.setState({ listOfUsers: json })
      })
    }

    render() {
        return <div>
            <Navbar />
            <h6>This is the list of users:</h6>
            <ol> 
            {this.state.listOfUsers.map(user => <li>{user.name}-{user.email}</li>)}
            </ol>
        </div>
    }

    //ol: ordered list (números) envuelve a li: list item

}

export default Users;