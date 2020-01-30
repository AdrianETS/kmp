import React from 'react';
import LoginForm from './components/LoginForm.js'
import './App.css';

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
      <div>
        <br />
          <LoginForm {...{loginStateChanged: this.loginStateChanged}}/>
      </div>
    );
  }
}
export default App;
