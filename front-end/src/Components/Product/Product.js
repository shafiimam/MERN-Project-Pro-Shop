import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating'
import { LinkContainer } from 'react-router-bootstrap';
const Product = ({product}) => {
    return (
       <Card className="my-3 p-3 rounded">
           <LinkContainer to={`/productDetail/${product._id}`}>
               <Card.Img src={product.image} variant='top'/>
           </LinkContainer>
           <Card.Body>
           <Link to={"/productDetail/"+product._id}>
               <Card.Title as="div">
                   <strong>{product.name}</strong>
               </Card.Title>
           </Link>
           <Card.Text as='div'>
               <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
           </Card.Text>
           <Card.Text as='h3'>
               ${product.price}
           </Card.Text>
           </Card.Body>
       </Card>
    )
}

export default Product;