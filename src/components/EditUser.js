import React from "react";
import { AppContext } from "./../context/ContextProvider";

class EditUser extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        return (<div></div>);
    }
}

export default EditUser;