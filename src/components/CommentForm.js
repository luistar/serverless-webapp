import React, {Component} from 'react';

import {Form, FormGroup, Label, Input, Button, FormFeedback} from 'reactstrap';
import {NavLink} from 'react-router-dom';

import CommentsAPI from 'API/CommentsAPI';

import {Auth} from 'aws-amplify';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'


class CommentForm extends Component {

    state = {
        text: null,
        token: null,
        commentInvalidMessage: null,
    }

    successToast = () => {
        toast("Comment successfully submitted. Thank you for your feedback!", {
            position: toast.POSITION.TOP_RIGHT,
            className: 'success-toast',
            autoClose: 10000
        });
    }

    componentDidMount(){
        Auth.currentSession().then(
            session => {
                this.setState({token: session.idToken.jwtToken});
            }
        ).catch(err => {
            console.log("CommentForm: user not authenticated");
        });
    }

    handleUpdateText = (event) => {
        const text = event.target.value;
        this.setState({
            text: text,
            commentInvalidMessage: this.isValidComment(text) ? null : 'Comment must not be blank!'
        });
    }

    isValidComment = (str) => {
        return !(!str || /^\s*$/.test(str));
    }

    handleSubmitComment = (event) => {
        event.preventDefault();
        if(! this.isValidComment(this.state.text)){
            this.setState({
                commentInvalidMessage: this.isValidComment(this.state.text) ? null : 'Comment must not be blank!'
            });
            return;
        }
        const commentsAPI = new CommentsAPI();
        commentsAPI.addComment(this.state.text, this.state.token).then( 
            response => response.json().then(
                data => {
                    this.successToast();
                }
            ).catch(err=>{console.error(err)})
        ).catch(err=>{console.error(err)});
        this.setState({text: ''});
        console.log(this.refs)
        this.refs.textInput.value='';
    }

    render(){
        const user = this.props.currentUser;
        if(user != null){
            return(
                <Form>
                    <FormGroup>
                        <Label for="usernameInput">Username</Label>
                        <Input type="text" name="username" id="usernameInput" readOnly placeholder="John" value={ user!=null ? user.username : ''}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="textInput">Comment</Label>
                        <textarea className={'form-control '+ (this.state.commentInvalidMessage ? 'is-invalid': '')} type="textarea" name="text" ref="textInput" id="textInput" placeholder="Your comment."
                            onChange = {(event) => this.handleUpdateText(event)}/>
                        { this.state.commentInvalidMessage ? <FormFeedback>{this.state.commentInvalidMessage}</FormFeedback> : '' }
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" onClick={this.handleSubmitComment}>Submit</Button>
                    </FormGroup>
                    <ToastContainer />
                </Form>
            );
        } else {
            return(
                <div>
                    <h3>You must be logged in to leave comments</h3>
                    <p>You can login in <NavLink className="text-amzn-orange" to="/login">here</NavLink> or you can <NavLink className="text-amzn-orange" to="/signup">sign up</NavLink> if you don't have an account. It only takes seconds!</p>
                </div>
            );
        }
    }
}

export default CommentForm;