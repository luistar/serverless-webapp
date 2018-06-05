import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {Container, Form, Label, Input, FormGroup, Button} from 'reactstrap';

import {Auth} from 'aws-amplify';

class SignUpPage extends Component {

    state = {
        username: '',
        password: '',
        passwordMatch: '',
        email: '',
        waitingForAuthCode: false,
        confirmationCode: '',
        authSuccess: false,
        invalidConfirmationCodeMessage: '',
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const username = this.state.username;
        const password = this.state.password;
        const email    = this.state.email;

        Auth.signUp(username,password,email)
            .then(
                this.setState(() => {
                    return {
                        waitingForAuthCode: true
                    }
                })
            )
            .catch( err =>
                console.error(err)
            )
    }

    handleSubmitConfirmationCode = async (e) => {
        e.preventDefault();
        const confirmationCode = this.state.confirmationCode;
        const username = this.state.username;
        Auth.confirmSignUp(username, confirmationCode)
            .then(
                this.setState(() => {
                    return {
                        authSuccess: true
                    }
                })
            )
            .catch(
                this.setState(() => {
                    return {
                        invalidConfirmationCodeMessage: 'Invalid Verification Code'
                    }
                })
            )
    }

    render(){
        return(
            <Container className="mt-3">
                { ! this.state.waitingForAuthCode && (
                    <Form>
                        <h1>Sign Up</h1>
                        <p>Sign up now and you will be able to leave comments!</p>
                        <FormGroup>
                            <Label for="usernameInput">Username</Label>
                            <Input type="text" name="username" id="usernameInput" placeholder="John" 
                            onChange = {(event) => this.setState({username:event.target.value, invalidUserNameMessage: '', invalidFormDataMessage: ''})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="passwordInput">Password</Label>
                            <Input type="password" name="password" id="passwordInput" placeholder="password"
                            onChange = {(event) => this.setState({password:event.target.value, invalidUserNameMessage: '', invalidFormDataMessage: ''})}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="emailInput">Email</Label>
                            <Input type="email" name="email" id="emailInput" placeholder="john@doe.com" 
                            onChange = {(event) => this.setState({email:event.target.value, invalidUserNameMessage: '', invalidFormDataMessage: ''})}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                        </FormGroup>
                    </Form>
                )}
                { this.state.waitingForAuthCode && (
                    <Form>
                        <h3>We're almost there, <strong>{this.state.username}</strong>!</h3>
                        <p>Enter the confirmation code in the box below.</p>
                    
                        <FormGroup>
                            <Label for="confirmationCode">Code</Label>
                            <Input type="text" name="confirmationCode" id="confirmationCode" placeholder="" 
                            onChange = {(event) => this.setState({confirmationCode:event.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" onClick={this.handleSubmitConfirmationCode}>Submit</Button>
                        </FormGroup>
                    </Form>
                )}
                {this.state.authSuccess && (
                    <Redirect to={{
                        pathname: '/login',
                    }}/>
                )}
                <SignUpRedirect authSuccess={this.state.authSuccess} {...this.props} history={this.props.history}/>
            </Container>
        );
    }
}

class SignUpRedirect extends Component {
    
    state = {
        authSuccess: true
    }

    render() {
        return null;
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextprops')
        console.log(nextProps)
        if(nextProps.currentUser !== null) {
            nextProps.history.goBack();
        }
    }
}

export default withRouter(SignUpPage);