import { ContextConsumer, AppContext } from "../context/ContextProvider"
import React, { useContext } from "react";
import { withRouter } from "react-router-dom";


function Logout(props) {
    const processLogout = () => {
        context.processLogout();
        props.history.push("/");
    }

    const context = useContext(AppContext);
    return (<button type="button" className="btn btn-primary" onClick={processLogout}>Logout</button>)
    

}

export default withRouter(Logout);