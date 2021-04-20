import axios from 'axios';
import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText, Jumbotron } from 'reactstrap';
import { API } from '../helper'
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            show: "Show"
        }
    }

    onBtShow = () => {
        if (this.state.passType != "password") {
            this.setState({ passType: "password", show: "Show" })
        } else {
            this.setState({ passType: "text", show: 'Hidden' })
        }
    }

    onBtRegis = () => {
        let username = this.regisUsername.value
        let email = this.regisEmail.value
        let password = this.regisPassword.value
        let confPass = this.regisConfPass.value
        console.log("Tes input regis :", username, email, password, confPass)

        // Proteksi jika form ada yg kosong
        if (username == '' || email == '' || password == '' || confPass == '') {
            alert('Isi semua form !')
        } else {
            // Proteksi jika email salah
            if (email.includes('@')) {
                // Proteksi jika password sesuai dgn confpass
                if (password == confPass) {
                    axios.post(API + `/users`, {
                        username,
                        email,
                        password,
                        role: 'user'
                    }).then(res => {
                        console.log("Regis success", res.data)
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    alert('Password tidak sesuai')
                }
            } else {
                alert('Email kamu salah')
            }
        }
    }

    render() {
        return (
            <div className="container m-auto row" style={{ paddingTop: '10vh' }}>
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
                            <Input type="text" name="username" id="exampleUsername" placeholder="ex. aldo123..." innerRef={el => this.regisUsername = el} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="exampe@mail.com" innerRef={el => this.regisEmail = el} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <InputGroup>
                                <Input type={this.state.passType} innerRef={el => this.regisPassword = el} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText onClick={this.onBtShow}>{this.state.show}</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirmation Password</Label>
                            <InputGroup>
                                <Input type={this.state.passType} innerRef={el => this.regisConfPass = el} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText onClick={this.onBtShow}>{this.state.show}</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <Button type="button" onClick={this.onBtRegis}>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;