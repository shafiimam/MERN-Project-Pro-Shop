import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product/Product";
import { useDispatch, useSelector } from 'react-redux'
import { listProducts }  from '../actions/productActions'
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Message/Message";
import { useParams } from "react-router";
import Paginate from "../Components/Paginate/Paginate";
import ProductCarousel from "../Components/ProductCarousel/ProductCarousel";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = () => {
const {keyword, pageNumber} = useParams()

const dispatch = useDispatch()
const productList = useSelector(state=> state.productList)

const {loading,products,pages,page,error} = productList

useEffect(() =>{
   dispatch(listProducts(keyword, pageNumber))
},[dispatch, keyword, pageNumber])

  return (
    <>
    <Meta/>
      {!keyword ? <ProductCarousel/>: <Link to='/' className='btn btn-light mt-3'>Go Back</Link>}
      <h1>Latest Products</h1>
      {
        loading? <Loader></Loader>: error ? <Message variant='danger'>{error}</Message>:
      <>
          <Row>
        {products.map((product) => (
          <Col key={product._id} sm={6} md={6} lg={4} xl={3} >
            <Product product={product}></Product>
          </Col>
        ))}
      </Row> 
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
      </>
      }
     
    </>
  );
};

export default HomeScreen;
