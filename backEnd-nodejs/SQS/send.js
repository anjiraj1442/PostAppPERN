var AWS = require("aws-sdk");
AWS.config.update({
    region: 'ap-south-1'
})

var sqs = new AWS.SQS({
    apiVersion: '2008-10-17'
})