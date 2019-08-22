const express = require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const routes=require('./routes.js');

//local mongodb connection
//mongoose.connect('mongodb://localhost:27017/floodPortalDB');

//mongodb Atlas connection
var mongoDB="mongodb+srv://cluster0-barww.mongodb.net/floodPortalDB?retryWrites=true&w=majority"
var mongoDBcreds={"user": "sijils", "pass": "oliverqu33ndb1"};
mongoose.connect(mongoDB,mongoDBcreds);

let db=mongoose.connection;

//check for DB errors
db.on('error',function(err){
    console.log(err)
})

//check for connection
db.once('open',function(){
    console.log('connected to mongo db')
})

//init app
const app= express();

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set ('view engine','pug')

//Body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())

//Set public folder
app.use(express.static(path.join(__dirname,'public')))

routes(app);

app.listen(3000,function(){
    console.log('Server started on port 3000......')
})