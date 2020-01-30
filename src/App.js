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
      <div className="App">
        <header className="App-header">
          My secured app
        <br />
          <LoginForm {...{loginStateChanged: this.loginStateChanged}}/>
        </header>
      </div>
    );
  }
}
export default App;
