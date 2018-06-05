import React, {Component} from 'react';

import {Switch, Route, /*Redirect*/} from 'react-router-dom';

import CommentsPage from 'pages/CommentsPage';
import Homepage     from 'pages/Homepage';
import NotFoundPage from 'pages/NotFoundPage';
import LoginPage    from 'pages/LoginPage';
import SignUpPage    from 'pages/SignUpPage';

class Content extends Component {

    render(){
        return (
            <main id="content">
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/comments' render={()=>
                        <CommentsPage {...this.props}/>
                    }/>
                    <Route path='/signup' render={()=>
                        <SignUpPage {...this.props} />   
                    }/>
                    <Route exact path="/login" render={()=>
                        <LoginPage handleAppUserLogin={this.props.handleAppUserLogin} currentUser={this.props.currentUser}/>}
                    /> 
                    <Route component={NotFoundPage}/>
                </Switch>
            </main>
        );
    }
}

export default Content;