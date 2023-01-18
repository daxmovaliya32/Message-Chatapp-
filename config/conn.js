const mongoose = require('mongoose');
// const express = require('express');
const { database } = require('./config')
// console.log(database);
const mongodb = async () => {
    try {
        mongoose.set("strictQuery", false);
        const conn = mongoose.connect(database,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then(()=>
        {console.log(`connection successfully`)})
        .catch((error)=>{console.log(error)})
        
    }catch (error) {
        console.log(error)
    }
};

 module.exports = mongodb;