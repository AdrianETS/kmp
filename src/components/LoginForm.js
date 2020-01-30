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
            this.props.loginStateChanged(true);
            this.setState({show:true});
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
        return (!this.state.show &&            
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-9 mx-auto">
                  <div className="card card-signin flex-row my-5">
                    <div className="card-img-left d-none d-md-flex">
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-center">Register</h5>
                      <form className="form-signin">
                        <div className="form-label-group">
                          <input type="text" id="inputUserame" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" required autofocus />
                          <label for="inputUserame">User</label>
                        </div>
                        
                        <div className="form-label-group">
                          <input type="password" id="inputPassword" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" required />
                          <label for="inputPassword">Password</label>
                        </div>             
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.processLogin}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

    }

}

export default LoginForm;