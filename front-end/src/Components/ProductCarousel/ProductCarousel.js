import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import  {Link} from 'react-router-dom';
import {Carousel, Image} from 'react-bootstrap'
import { listTopProducts } from '../../actions/productActions';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
const ProductCarousel = () => {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state=> state.productTopRated)
    const { loading, error , products} = productTopRated
    console.log(products)
    useEffect(() => {
        dispatch(listTopProducts())
    },[dispatch])
    return loading ? <Loader/>: error ? <Message variant='danger'>{error}</Message> :
    <Carousel pause='hover' className='bg-dark mt-5' >
        {products.map(product =>
            <Carousel.Item>
                <Link to={`/productDetail/${product._id}`}>
                    <Image className="d-block" src={product.image} alt={product.name} fluid></Image>
                    <Carousel.Caption className='carousel-caption'>
                      <h2>{product.name} (${product.price})</h2>   
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        )}
    </Carousel>
};

export default ProductCarousel;