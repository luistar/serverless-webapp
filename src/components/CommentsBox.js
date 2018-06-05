import React, {Component} from 'react';
import CommentsAPI from 'API/CommentsAPI';
import {Flag} from 'semantic-ui-react';



class CommentsBox extends Component {

    state = {
        isLoading: true,
        comments: []
    }

    componentDidMount() {
        const commentsAPI = new CommentsAPI();
        commentsAPI.getComments().then( (data) => {
            data.json().then(data => {
                this.setState({comments: data.comments.Items, isLoading: false});
            }).catch(err=>{console.error(err)});
        });
    }

    handleCommentsReload = (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        const commentsAPI = new CommentsAPI();
        commentsAPI.getComments().then( (data) => {
            data.json().then(data => {
                this.setState({comments: data.comments.Items, isLoading: false});
            }).catch(err=>{console.error(err)});
        });
    }


    render(){
        const {comments} = this.state;
        if( comments.length > 0 ) {
            return (
                <div className="mb-3 mt-3">
                    <h2>{ comments.length } { (comments.length)===1 ? 'comment' : 'comments' } <small className="float-right" onClick={this.handleCommentsReload}><i className={"fas fa-sync-alt " + (this.state.isLoading ? 'fa-spin' : '')}/></small> </h2>
                    <ul className="list-group">
                    { comments.map((comment, i) => 
                        <CommentItem comment={comment} key={comment.timestamp+comment.user}/>
                    )}
                    </ul>
                </div>
            );
        } 
        return (      
            <div className="comment-box mb-3 mt-3">
                <h2>There are currently no comments :(<br/>
                Be the first to leave one!</h2>
            </div>
        );
    }
}

class CommentItem extends Component {

    getFlagCodeFromLanguage(language){
        if(language==='en')
            language = 'gb';
        return language;
    }

    render(){
        const comment = this.props.comment;
        return(
            <li className="list-group-item" >
                <div className="media">
                    <img className="align-self-top mr-3 rounded-circle" src={"//api.adorable.io/avatars/64/" + comment.user } alt={ comment.user +"'s avatar"}/>
                    <div className="media-body">
                        <h5 className="mt-0"><Flag name={this.getFlagCodeFromLanguage(comment.language)}/>{comment.user } <small className="text-muted display" 
                            title={ new Date(comment.timestamp).toString() } >
                            on { new Date(comment.timestamp).toLocaleString('en-GB',{
                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                                hour : 'numeric', minute: 'numeric', second: 'numeric'
                            }) }</small> <CommentSentimentIcon comment={comment}/> </h5><div className="clearfix"/>
                        { comment.text }
                    </div>
                </div>
            </li>
        );
    }
}

class CommentSentimentIcon extends Component {

    render(){
        switch(this.props.comment.sentiment){
            case 'POSITIVE':
                return <i title="This looks like a positive comment!" className="float-right fas fa-thumbs-up"/>
            case 'NEGATIVE':
                return <i title="This looks like a negative comment! Sorry to hear that :(" className="float-right fas fa-thumbs-down"/>
            case 'NEUTRAL':
                return <i title="This looks like a neutral comment!" className="float-right far fa-meh"/>
            case 'MIXED':
                return <i title="This looks like a mixed-feeling comment!" className="float-right fas fa-adjust"/>
            case 'UNSUPPORTED':
                return <i title="Sentiment analysis for this language currently unsupported." className="float-right far fa-question-circle"/>
            default:
                return null; //render nothing
        }
    }
}

export default CommentsBox;