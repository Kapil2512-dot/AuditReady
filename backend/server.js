const express = require('express')
const mongoose = require('mongoose')
const app = express();

app.get("/", (req,res)=>{
    res.send('Hello , express');
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log("Hello");
    
})