const express = require('express')

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const auth = require('./middleware/auth')
const uow = require('./middleware/uow')
const timesheet = require('./Template/template')
var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      status: error.status || error.code || 500,
      message: error.detail || error.message || 'Internal Server Error',
    });
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})
const AWS = require('aws-sdk');

// aws configure

const creds = new AWS.SharedIniFileCredentials({profile: 'default'})

const sns = new AWS.SNS({creds, region: 'ap-south-1'})


app.get('/status', (req, res, next)=>{
    res.send({status: 'ok', sns})
});

app.post('/subscribe', (req, res)=>{
 let params ={
    Protocol: "EMAIL",
    TopicArn: 'arn:aws:sns:ap-south-1:463151767820:MyFirstTopic',
    Endpoint: req.body.email

 }

 sns.subscribe(params, (err, data)=>{
    if(err) console.log("erroe", err);
    console.log(data);

    res.send(data)
 })
})

const userRoute = require('./routes/users');
app.use('/users',  cors(corsOptions),  uow.initDb, userRoute )

const postRoute = require('./routes/posts');
app.use('/posts',   cors(corsOptions), uow.initDb, postRoute)







app.listen(5500,()=>{
    console.log("server is listening at port number 5500");
})