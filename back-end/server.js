import express from 'express'; 
import {notFound,errorHandler} from './middleware/errroMiddleWare.js'
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
connectDB();


app.get('/', (req, res)=>{
    res.send('api is running');
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound)

app.use(errorHandler)




app.listen(5000 || process.env.PORT ,console.log(`server running ${process.env.NODE_ENV} mode  on ${process.env.PORT}`.yellow.bold))
