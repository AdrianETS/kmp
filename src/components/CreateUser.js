import React from "react";
import { Link } from 'react-router-dom';

class CreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "", name: "", email: "",
            validuserName: false, validName: false, validEmail: false, submitDisabled: true,
            newUsers:[]
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.cancelButton = this.cancelButton.bind(this);

    }

    handleUserNameChange(event) {
        let userNameState = event.target.value ? true : false;
        let submitValid = (this.state.validName && this.state.validEmail) && userNameState;
        this.setState({ userName: event.target.value, validUser: userNameState, submitDisabled: !submitValid });
    }

    handleNameChange(event) {
        let nameState = event.target.value ? true : false;
        let submitValid = (this.state.validUser && this.state.validEmail) && nameState;
        this.setState({ name: event.target.value, validName: nameState, submitDisabled: !submitValid });
    }

    handleEmailChange(event) {
        let passConfirmedState = event.target.value ? true : false;
        let submitValid = (this.state.validUser && this.state.validName) && passConfirmedState;
        this.setState({ email: event.target.value, validEmail: passConfirmedState, submitDisabled: !submitValid });
    }

    addUser(event) {
        event.preventDefault();
        // we don't want the js engine to handle the form automatically
        //better to work with buttons since submits are handled automatically and this could pose a problem
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.userName,
                email: this.state.email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        //this is what we are getting from the url above
            .then(response => response.json())
            .then(response => alert(JSON.stringify(response)));
       
            
    }

    cancelButton() {
        this.props.history.push("/users");
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">New User</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserName" className="form-control" value={this.state.userName} onChange={this.handleUserNameChange} placeholder="Username" required autofocus />
                                        <label for="inputUserame">User Name</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="text" id="inputName" className="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required />
                                        <label for="inputName">User</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" id="inputEmail" className="form-control" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" required />
                                        <label for="inputEmail">Email</label>
                                    </div>
                                    <button type="button" class="btn btn-primary btn-lg" type="submit" onClick={this.addUser} disabled={this.state.submitDisabled}>Create user</button>
                                    <div className="float-right">
                                        <button type="button" class="btn btn-secondary btn-lg btn-secondary" type="submit" onClick={this.cancelButton}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}



export default CreateUser;