const express= require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const app=express();

//Api......
const route=require('./routes/route');

// connection to database
mongoose.connect('mongodb://localhost:27017/Day');

mongoose.connection.on('connected',()=>{
    console.log("Connected to the Database");
})

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log("Errror in conection ,"+err);
    }
    else
    {console.log("Error in the database connection.....");}
 
});

var port = process.env.PORT || 3000;

app.use(bodyparser.json());

// routes
app.use('/routes',route);



app.listen(port,()=>{
    console.log("Server started at port..."+port);
});

