import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Card, Image} from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Rating from '../Components/Rating/Rating';


const ProductScreen = () => {
   const {id} = useParams();
   const [product, setProduct] = useState({}) 

   useEffect(() =>{
    const fetchProduct = async()=>{
        const {data} = await axios.get('/api/products/'+id)
        setProduct(data)
    }
    fetchProduct();
 },[id])

    return (
        <>
            <Link className="btn btn-light my-3" to ="/">Go back</Link>
        <Row>
            <Col md={6} >
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                   <ListGroup variant="flush">
                   <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                   </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                       <ListGroup.Item>
                       <Row>
                             <Col>
                             Price:
                             </Col>
                             <Col>
                             <strong>{product.price}</strong>
                             </Col>
                        </Row>
                       </ListGroup.Item>

                       <ListGroup.Item>
                       <Row>
                             <Col>
                            Status:
                             </Col>
                             <Col>
                               {product.countInStock > 0 ? 'In stock':'Out of stock'}
                             </Col>
                        </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <button className="btn btn-primary btn-block" type="button" disabled={product.countInStock ===0}>
                               Add to cart
                           </button>
                       </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    );
};

export default ProductScreen;