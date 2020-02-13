import React from "react";
import { AppContext } from "./../context/ContextProvider";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import Topbar from "./Topbar";
import EditUser from "./EditUser";

class Users extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      listofUserPosts: [],
      postsByUser: []
    }
    this.showUserPosts = this.showUserPosts.bind(this);
    this.goToEditUser = this.goToEditUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);


  }

  componentDidMount() {
    !this.context.userLogged && this.props.history.push("/");
    this.retrieveUsers();
    this.retrieveUserPosts();
  }

  retrieveUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then((json) => {
        //this.setState({ listOfUsers: json })
        this.context.setListOfUsers([...json]);
        this.context.setOriginalUsers([...json]);
      })
  }

  retrieveUserPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then((json) => {
        this.setState({ listofUserPosts: json })
      })
  }


  showUserPosts(id) {
    let userPostsById = this.state.listofUserPosts.filter(post => (post.userId == id)); 
    this.setState({ postsByUser: userPostsById });
  }

  goToEditUser(event, id) {
    this.context.setUserId(id);
    this.props.history.push("/edituser");
  }

  deleteUser(event, id) {
    event.preventDefault();
    fetch('http://jsonplaceholder.typicode.com/users/' + id, {
      method: 'DELETE'
    }).then( response => alert("User deleted"))
    .catch(error=>alert("Sorry, there was an internal error: " + error));
  }

  render() {
    return <div>
      <Navbar />
      <Topbar />
      <h6>This is the list of users:</h6>

      {this.context.listOfUsers.map((user) =>

        <div>{user.id}. {user.name}-{user.address.geo.lat}

          <div>

            <button style={{ float: "left" }} className="btn btn-outline-success" data-toggle="modal" data-target={"#modal" + user.id} onClick={() => this.showUserPosts(user.id)}>{user.username}'s posts</button>


            <div className="modal fade" id={"modal"+ user.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{user.username}'s posts</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">

                    {this.state.postsByUser.map(post => <div>{post.id}.-{post.body}</div>)}

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <button style={{ float: "right" }} type="button" className="btn btn-danger tiny" onClick={event => this.deleteUser(event, user.id)}>Delete</button>
          <button style={{ float: "right" }} type="button" className="btn btn-primary tiny" onClick={event => this.goToEditUser(event, user.id)}>Edit</button>

          <br /><br /></div>

      )}


    </div>
  }

  //ol: ordered list (números) envuelve a li: list item

}

export default Users;