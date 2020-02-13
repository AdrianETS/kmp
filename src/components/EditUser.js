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
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.editUser = this.editUser.bind(this);
        this.cancelButton = this.cancelButton.bind(this);
    }

    componentDidMount() {
        let filteredList = this.context.listOfUsers.filter(user => (user.id == this.context.userId));
        filteredList.length > 0 && this.setState({ name: filteredList[0].name, userName: filteredList[0].username, email: filteredList[0].email });

    }

    componentDidUpdate() {

    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleUserNameChange(event) {
        this.setState({ userName: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }


    editUser(event) {
        event.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/users/' + this.context.userId, {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.userName,
                email: this.state.email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
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
                                <h5 className="card-title text-center">Edit User</h5>
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
                                    <button type="button" class="btn btn-primary btn-lg" type="submit" onClick={this.editUser} disabled={this.state.submitDisabled}>Edit user</button>
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

export default EditUser;