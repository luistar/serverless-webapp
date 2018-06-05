import React, {Component} from 'react';

import {Container} from 'reactstrap';
import CommentForm from 'components/CommentForm';
import CommentsBox from 'components/CommentsBox';

class CommentsPage extends Component {

    render(){
        return (
            <Container className="mt-3">
                <h1>Let me know what you think!</h1>
                
                <div className="comment-form mt-3">
                    <CommentForm {...this.props} />
                    <CommentsBox {...this.props} />
                </div>
            </Container>
        
        );
    }
}

export default CommentsPage;