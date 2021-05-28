import React, { Component } from 'react';
import './App.css' // import css
import NavbarComp from './components/navbar' // import component
import { Route } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import axios from 'axios';
import { API } from './helper';
import { loginAction } from './actions'
import { connect } from 'react-redux'
// Class component
class App extends Component {
  // storage data
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.keepLogin()
  }

  // function place
  keepLogin = () => {
    let tkn = localStorage.getItem("tkn_name")
    // condition jika token ada maka akan login
    if (tkn) {
      axios.get(API + `/users?username=${tkn}`)
        .then(res => {
          // mengecek data respon
          console.log("data respon :", res.data)
          // condition jika data respon memiliki panjang data > 0 maka 
          // datanya akan disimpan ke localstorage dan globalstore
          if (res.data.length > 0) {
            localStorage.setItem("tkn_name", res.data[0].username)

            // menyimpan data ke global store melalui action
            this.props.loginAction(res.data[0])
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div>
        <NavbarComp />
        <Route path="/" component={LandingPage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    );
  }
}

export default connect(null, { loginAction })(App);