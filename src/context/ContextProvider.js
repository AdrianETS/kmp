import React from 'react';
import { createContext } from "react";

export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {userName: "", userLogged: false};
        this.processLogout = this.processLogout.bind(this);
        this.login = this.login.bind(this);
    }


    processLogout(){
        this.setState({userLogged: false});
    }

    login(user){
        this.setState({userLogged: true}); 
        this.setState({userName: user});
    }


    render() {
        return (
            <AppContext.Provider
                value={{ ...this.state, login: this.login, processLogout:this.processLogout}}
            >
                {/*Inyectaremos el estado (todos sus atributos, en este caso solo tenemos theme) 
                de AppContext y el método toogleTheme a los hijos*/}

                {this.props.children}
                {/*Esto va siempre aquí, decimos que los hijos tendrán este contexto.*/}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;