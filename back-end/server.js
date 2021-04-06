import express from 'express'; 
import products from './Data/products.js'; 
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js'
dotenv.config()
const app = express()
app.use(cors())

connectDB();

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



app.listen(5000 || process.env.PORT ,console.log(`server running ${process.env.NODE_ENV} mode  on ${process.env.PORT}`))
