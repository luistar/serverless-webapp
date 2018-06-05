const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = 'Comments';

exports.handler = (event, context, callback) => {
    //event: API Gateway Request
    //context: runtime informations: e.g. remaining time
    //callback(error,data): function to be used to send response to caller

    getComments().then((data) => {

        data.Items.sort(function(a,b){
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                comments: data
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        errorResponse(err.message, context.awsRequestId, callback)
    });
};

function getComments() {
    return ddb.scan({
        TableName: tableName
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