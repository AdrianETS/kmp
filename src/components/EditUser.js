import React from "react";
import { AppContext } from "./../context/ContextProvider";

class EditUser extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            userName: "",
            email: ""
        }
    }

    componentDidMount() {
        let filteredList = this.context.listOfUsers.filter(user => (user.id == this.context.userId));
        filteredList.length > 0 && this.setState({name: filteredList[0].name, userName:filteredList[0].username, email: filteredList[0].email });

    }

    componentDidUpdate() {

    }

    render() {
        return (<div>Welcome to Edit User
            <h6>{this.state.name}</h6>
            <h6>{this.state.userName}</h6>
            <h6>{this.state.email}</h6>
        </div>);
    }
}

export default EditUser;