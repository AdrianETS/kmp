import React from 'react';
import LoginForm from './components/LoginForm.js';
import './App.css';
import { ContextProvider } from './context/ContextProvider';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Auth from "./utils/Auth";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import Statistics from "./components/Statistics";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
    
  }


  render() {
    return (
      <ContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path= "/users" component={Users} />
            <Route path= "/createuser" component={CreateUser} />
            <Route path= "/edituser" component={EditUser} />
            <Route path= "/statistics" component={Statistics} />
          </Switch>
        </Router>
      </ContextProvider>
    );
  }
}
export default App;
