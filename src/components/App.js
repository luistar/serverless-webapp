import React, { Component } from 'react';

import Navbar from 'components/Navbar';
import Content from 'components/Content';
import Footer from 'components/Footer';
//import 'components/App.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import Amplify from 'aws-amplify';
import aws_exports from 'aws-exports';
import {Auth} from 'aws-amplify';

Amplify.configure(aws_exports);


class App extends Component {

    state = {
        currentUser: null
    }

    componentDidMount(){
        /* Uncomment this if you want to log the jwt cognito token
           (useful for testing API gateway authentication) 
        Auth.currentSession().then(
            session => {
                console.log('JWT TOKEN: ' + session.idToken.jwtToken)
            }
        ).catch( err => {
            console.log('JWT TOKEN: not logged in');
        });
        */
        Auth.currentUserInfo()
            .then(user => {
                //console.log(user);
                this.setState({
                    currentUser: user
                })
            })
            .catch(err => console.log(err));
    }

    handleUserLogin = (username, password) => {
        Auth.signIn(username, password)
            .then(data => {
                console.log("auth success");
                console.log(data)
                this.setState({currentUser: data});
            })
            .catch(err => console.log(err)); 
    }

    handleUserSignOut = () => {
        Auth.signOut()
            .then(data => {
                this.setState({
                    currentUser: null
                });
            })
            .catch(err => console.log(err));
    }
    
    render(props) {
        return (
            <div id="app-wrapper">
            <Navbar currentUser={this.state.currentUser} handleAppUserSignOut={this.handleUserSignOut}/>
            <Content handleAppUserLogin={this.handleUserLogin} currentUser={this.state.currentUser}/>
            <Footer/>
            </div>
        );
    }
}

export default App;
