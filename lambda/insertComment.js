const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();
const comprehend = new AWS.Comprehend();

const tableName = 'Comments';

exports.handler = (event, context, callback) => {
    //event: API Gateway Request
    //context: runtime informations: e.g. remaining time
    //callback(error,data): function to be used to send response to caller

    if (!event.requestContext.authorizer) {
      errorResponse('Authorization not configured', context.awsRequestId, callback);
      return;
    }

    // Because we're using a Cognito User Pools authorizer, all of the claims
    // included in the authentication token are provided in the request context.
    // This includes the username as well as other attributes.
    const username = event.requestContext.authorizer.claims['cognito:username'];

    // The body field of the event in a proxy integration is a raw string.
    // In order to extract meaningful values, we need to first parse this string
    // into an object. A more robust implementation might inspect the Content-Type
    // header first and use a different parsing strategy based on that value.
    const requestBody = JSON.parse(event.body);

    const commentText = requestBody.text;

    if(commentText === 'undefined' || commentText === ''){
        errorResponse('No comment provided', context.awsRequestId, callback);
        return;
    }

    var params = {
        Text: commentText /* required */
    };

    comprehend.detectDominantLanguage(params, (err,data) => {
        if (err) {
            console.log(err, err.stack);
            errorResponse('Error during language detection.', context.awsRequestId, callback);
            return; 
        }
        else{
            const language = data.Languages[0].LanguageCode;
            console.log('DETECTED LANGUAGE: '+language);
            if ( isSupportedLanguage(language) ){
                getSentimentAndSave(username,commentText,language);
            } else {
                saveComment(username, commentText, language, "UNSUPPORTED");
            }
        }
    });
    
    function isSupportedLanguage(language){
        return ['en','es'].includes(language);
    }

    function getSentimentAndSave(username,commentText,language){
        var params = {
            LanguageCode: language,
            Text: commentText 
        };
        comprehend.detectSentiment(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
                errorResponse('Error during sentiment analysis.', context.awsRequestId, callback);
                return; 
            }
            else{
                const sentiment = data.Sentiment;
                saveComment(username, commentText, language, sentiment).then(()=>{
                    callback(null, {
                        statusCode: 201,
                        body: JSON.stringify({
                            success: true
                        }),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                        },
                    });
                }).catch((err)=>{
                    console.error(err);

                    // If there is an error during processing, catch it and return
                    // from the Lambda function successfully. Specify a 500 HTTP status
                    // code and provide an error message in the body. This will provide a
                    // more meaningful error response to the end client.
                    errorResponse(err.message, context.awsRequestId, callback);
                })
            }
        });
    }
};

function saveComment(username, commentText, language, sentiment) {
    return ddb.put({
        TableName: tableName,
        Item: {
            user: username,
            text: commentText,
            timestamp: new Date().toISOString(),
            language: language,
            sentiment: sentiment
        },
    }).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}