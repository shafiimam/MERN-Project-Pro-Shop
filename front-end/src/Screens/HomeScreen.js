import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product/Product";
import { useDispatch, useSelector } from 'react-redux'
import { listProducts }  from '../actions/productActions'
import { productListReducer } from "../reducer/productReducers";
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Message/Message";
import { useParams } from "react-router";

const HomeScreen = () => {
const {keyword} = useParams()
const dispatch = useDispatch()
console.log(keyword)
const productList = useSelector(state=> state.productList)

const {loading,products,error} = productList

useEffect(() =>{
   dispatch(listProducts(keyword))
},[dispatch, keyword])

  return (
    <div>
      <h1>Latest Products</h1>
      {
        loading? <Loader></Loader>: error ? <Message variant='danger'>{error}</Message>:
        <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row> 
      }
     
    </div>
  );
};

export default HomeScreen;
