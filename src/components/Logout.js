import { ContextConsumer, AppContext } from "../context/ContextProvider"
import React, { useContext } from "react";
import { withRouter } from "react-router-dom";


function Logout(props) {
    const processLogout = () => {
        context.processLogout();
        props.history.push("/");
    }

    const context = useContext(AppContext);
    return (<input type = "button" value = "Logout" onClick = {processLogout}/>)

}

export default withRouter(Logout);