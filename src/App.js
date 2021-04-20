import React, { Component } from 'react';
import './App.css' // import css
import NavbarComp from './components/navbar' // import component
import { Route } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';

// Class component
class App extends Component {
  // storage data
  constructor(props) {
    super(props);
    this.state = {}
  }

  // function place

  render() {
    return (
      <div>
        <NavbarComp />
        <Route path="/" component={LandingPage} exact/>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    );
  }
}

export default App;