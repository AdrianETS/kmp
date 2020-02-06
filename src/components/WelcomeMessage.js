import React, { useContext } from "react";
import { AppContext } from "../context/ContextProvider"

function WelcomeMessage(props) {
    const context = useContext(AppContext);
    return <p class="font-weight-bold">Welcome {context.userName}</p>
}

export default WelcomeMessage;