const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 8000;
const cors = require('cors');


app.use(express.urlencoded());

app.use(cors());
app.use('/',require('./router/index'));

app.listen(port,function(err){
    if(err){
        console.log("error in server");
        return;
    }else{
        console.log('server is running on post',port);
    }
})