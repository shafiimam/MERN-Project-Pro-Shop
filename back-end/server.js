const express = require('express') 
const products = require('./Data/products') 
require('dotenv').config();
const cors = require('cors')
const app = express()
app.use(cors())



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


app.listen(000 || process.env.PORT ,console.log(`server running ${process.env.NODE_ENV} mode  on ${process.env.PORT}`))