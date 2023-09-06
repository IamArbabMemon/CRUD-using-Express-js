const path = require('path');
const {getEmployees,getEmployeeById} = require('./database');
const express = require('express');
const app = express();

app.get('/employees',(req,res)=>{

    getEmployees().then((data)=>{
        res.status(200).json(data);
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(clientIP);
    }).catch(err =>{
        res.status(404);
    })
  
});



app.get('/employee/:id',(req,res)=>{
    getEmployeeById(req.params.id).then((data)=>{
        res.status(200).json(data);
    }).catch(err =>{
        res.status(404);
    })
})


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})


app.listen(3000,()=>console.log('SERVER IS LISTENING'));

