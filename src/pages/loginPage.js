import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText, Jumbotron } from 'reactstrap';
import { API } from '../helper';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            show: "Show",
            redirect: false
        }
    }

    onBtShow = () => {
        if (this.state.passType != "password") {
            this.setState({ passType: "password", show: "Show" })
        } else {
            this.setState({ passType: "text", show: 'Hidden' })
        }
    }

    onBtLogin = () => {
        axios.get(API + `/users?username=${this.inUsername.value}&password=${this.inPassword.value}`)
            .then(res => {
                if (res.data.length > 0) {
                    // menyimpan data kedalam browser
                    localStorage.setItem("tkn_name", res.data[0].username)
                    // alert(`Hello, ${res.data[0].username}. Login Success ✔`)
                    this.setState({ redirect: true })
                } else {
                    alert(`User not found ❌`)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (<div className="container m-auto row" style={{ paddingTop: '10vh' }}>
            <div className="col-12 col-md-7">
                <Jumbotron className="text-md-center">
                    <h1 className="display-3">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>
            </div>
            <div className="col-12 col-md-5">
                <Form>
                    <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input type="text" name="username" id="exampleUsername" placeholder="ex. aldo123..." innerRef={el => this.inUsername = el} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <InputGroup>
                            <Input type={this.state.passType} innerRef={el => this.inPassword = el} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText onClick={this.onBtShow}>{this.state.show}</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <Button type="button" onClick={this.onBtLogin}>Sign In</Button>
                </Form>
            </div>
        </div>);
    }
}

export default LoginPage;