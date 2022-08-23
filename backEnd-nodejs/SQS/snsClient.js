const SNSClient = require('@aws-sdk/client-sns')
const REGION = 'ap-south-1'

const snsClient = new SNSClient({ region: REGION})

module.exports = snsClient