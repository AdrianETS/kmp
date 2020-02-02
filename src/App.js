import React from 'react';
import LoginForm from './components/LoginForm.js';
import './App.css';
import { ContextProvider } from './context/ContextProvider';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
    this.loginStateChanged = this.loginStateChanged.bind(this);
  }

  loginStateChanged(status){
    this.setState({loggedUser: status});
  }

  render() {
    return (
      <ContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </ContextProvider>
    );
  }
}
export default App;
