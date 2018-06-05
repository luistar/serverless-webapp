import React, {Component} from 'react';
import {Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';

import PropTypes from 'prop-types';

import { withRouter } from "react-router-dom";

class LoginPage extends Component {

    state = {
        username: '',
        password: '',
        authSuccess: false
    }

    static propTypes = {
        history: PropTypes.object.isRequired,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        
        this.props.handleAppUserLogin(username,password);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentUser !== null){
            console.log(this.props.history)
            this.props.history.goBack();
        }
    }

    render(){
        return(
            <Container className="mt-3">
                <Form>
                    <h1>Log in</h1>
                    <p>Log in now and you will be able to leave comments!</p>
                    <FormGroup>
                        <Label for="usernameInput">Username</Label>
                        <Input type="text" name="username" id="usernameInput" placeholder="John" 
                        onChange = {(event) => this.setState({username:event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordInput">Password</Label>
                        <Input type="password" name="password" id="passwordInput" placeholder="password"
                        onChange = {(event) => this.setState({password:event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default withRouter(LoginPage);