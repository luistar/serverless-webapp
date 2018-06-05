class CommentsAPI {
    
    constructor(){
        this.endpoint = 'https://ms8qk1bet9.execute-api.eu-west-1.amazonaws.com/production/comments';
    }

    getComments(){
        return fetch(this.endpoint);
    }

    addComment( commentText, token ){
        let headers = new Headers();
        headers.append('Authorization', token);
        return fetch(this.endpoint, {
            method: 'post', 
            headers: headers,
            body: JSON.stringify({
                text: commentText 
            })
        });
    }
}

export default CommentsAPI;