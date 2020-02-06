import React from 'react';
import { createContext } from "react";
import Auth from '../utils/Auth';

export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {userName: "", userLogged: false, 
        listOfUsers: [], originalUsers: []};
        this.processLogout = this.processLogout.bind(this);
        this.setUserLogged = this.setUserLogged.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setListOfUsers = this.setListOfUsers.bind(this);
        this.setOriginalUsers = this.setOriginalUsers.bind(this);
    }


    processLogout(){
        this.setState({userLogged: false, userName: ""});
        Auth.removeUserCredentials();
    }

    setUserLogged(status){
        this.setState({userLogged: status}); 
        
    }

    setUserName(user){
        this.setState({userName: user});
    }

    componentDidMount(){
        Auth.checkLocalAuth() && this.setUserValues();
    }
   

    setUserValues(){
        this.setState({userLogged: true, userName: Auth.getUserName()});
    }

    setListOfUsers(list){
        this.setState({listOfUsers: list});
    }


    setOriginalUsers(list){
        this.setState({originalUsers: list});
    }


    render() {
        return (
            <AppContext.Provider
                value={{ ...this.state, setUserLogged: this.setUserLogged, processLogout:this.processLogout, setUserName: this.setUserName,
                    setListOfUsers: this.setListOfUsers, setOriginalUsers: this.setOriginalUsers}}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;