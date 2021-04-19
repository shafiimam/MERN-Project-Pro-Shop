import express from 'express'; 
import path from 'path';
import {notFound,errorHandler} from './middleware/errroMiddleWare.js'
import dotenv from 'dotenv'
import cors from 'cors';
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config()
const app = express()
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
    
}
app.use(cors())

app.use(express.json())
connectDB();




app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))



const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/front-end/build')))
   app.get('*',(req, res)=> res.sendFile(path.resolve(__dirname, '/front-end/build/index.html')))
}
else{
    app.get('/', (req, res)=>{
        res.send('api is running');
    })
}

app.use(notFound)

app.use(errorHandler)




app.listen(5000 || process.env.PORT ,console.log(`server running ${process.env.NODE_ENV} mode  on ${process.env.PORT}`.yellow.bold))
