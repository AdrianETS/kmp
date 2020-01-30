import React from 'react';
import Auth from './../utils/Auth';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: !Auth.checkLocalAuth() };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.processLogin = this.processLogin.bind(this);
    }

    processLogin(event) {
        if (Auth.checkCredentials(this.state.username, this.state.password)) {
            Auth.storeAuth(this.state.username, this.state.password);
            this.props.loginStateChanged(false);
        } else {
            alert("Username and pass: " + this.state.username + " - " + this.state.password + " FAILED");
        }

        event.preventDefault();
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    render() {
        return (this.props.loginStateChanged &&
            <form >
                <label>Enter credentials</label>
                <br />
                <label>Username</label><input value={this.state.username} onChange={this.handleUsernameChange}></input>
                <br />
                <label>Password</label><input value={this.state.password} onChange={this.handlePasswordChange}></input>
                <br />
                <input type="submit" value="Submit" onClick={this.processLogin} />
            </form>);


    }

}

export default LoginForm;