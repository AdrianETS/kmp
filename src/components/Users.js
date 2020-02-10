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
        this.state = {listofUserPosts:[]}//{listOfUsers: []}
    }

    componentDidMount() {
        !this.context.userLogged && this.props.history.push("/");
        this.retrieveUsers();
        this.retrieveUserPosts();
        this.showUserPosts = this.showUserPosts.bind(this);
        this.goToEditUser = this.goToEditUser.bind(this);
    }

    retrieveUsers(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then((json) => {
        //this.setState({ listOfUsers: json })
        this.context.setListOfUsers([...json]);
        this.context.setOriginalUsers([...json]);       
      })
    }

    retrieveUserPosts(){
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then(res => res.json())
          .then((json) => {
            this.setState({ listofUserPosts: json })
          })
        }

    showUserPosts(event){
        //alert("the id is "+ event.target.id);
        this.state.listofUserPosts.filter(post => (post.userId == event.target.id) && alert(post.body));
    }


    goToEditUser(event, id){
      this.context.setUserId(id);
      this.props.history.push("/edituser");
    }

    render() {
        return <div>
            <Navbar />
            <Topbar />
            <h6>This is the list of users:</h6>
             
            {this.context.listOfUsers.map((user, index) => 
            
            <div onClick = {this.showUserPosts}>{index}. {user.name}-{user.address.geo.lat}
              <button style = {{float: "right"}} type="button" className="btn btn-primary tiny" onClick = {event=>this.goToEditUser(event, user.id)}>Edit</button>
              <br/><br/></div>
              
              )}
            
            
        </div>
    }

    //ol: ordered list (números) envuelve a li: list item

}

export default Users;