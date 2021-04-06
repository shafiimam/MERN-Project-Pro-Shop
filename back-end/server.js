<<<<<<< HEAD
import express from 'express'; 
import products from './Data/products.js'; 
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js'
dotenv.config()
const app = express()
app.use(cors())

connectDB();
=======
const express = require('express') 
const products = require('./Data/products') 
require('dotenv').config();
const cors = require('cors')
const app = express()
app.use(cors())


>>>>>>> e5664caeca8bbf05cae9f7417b6953ca6aeaf2e3

app.get('/', (req, res)=>{
    res.send('api is running');
})

app.get('/api/products', (req, res)=>{
    res.send(products);
})

app.get('/api/product/:id', (req, res)=>{
    const product = products.find(p=> p._id === req.params.id)
    res.send(product)
})


<<<<<<< HEAD
app.listen(5000 || process.env.PORT ,console.log(`server running ${process.env.NODE_ENV} mode  on ${process.env.PORT}`))
=======
app.listen(000 || process.env.PORT ,console.log(`server running ${process.env.NODE_ENV} mode  on ${process.env.PORT}`))
>>>>>>> e5664caeca8bbf05cae9f7417b6953ca6aeaf2e3
