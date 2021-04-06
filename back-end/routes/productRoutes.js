import express from 'express'
import asyncHandler from 'express-async-handler' 
const router = express.Router()
import Product from '../models/productModel.js'

// @desc fetch all product
// @route get api/product
// @access public
router.get('/',asyncHandler(async (req, res)=>{
    const products = await Product.find({})
    res.send(products);
}) )



// @desc fetch single product
// @route get api/product/:id
// @access public
router.get('/:id',asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
       res.json(product) 
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
    
}))

export default router