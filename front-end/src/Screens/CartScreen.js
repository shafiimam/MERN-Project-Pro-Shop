import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../Components/Message/Message';

const CartScreen = () => {
    const {id} = useParams();
    const history = useHistory()
    const location =  useLocation()
   
    const qty =  location.search ? Number(location.search.split('=')[1]): 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id,qty))
           console.log('qty is',qty)
        }
    },[dispatch, id, qty])

    const removeFromCartHandler = (id) => {
       dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? <Message>Your cart is empty <Link to ='/'>Go back</Link></Message> :
                    (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item=> <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                        </Col>
                                        <Col md={3}>
                                            <Link to = {`/product/${item.product}`}>{item.name} </Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                                            {
                                                                [...Array(item.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                        </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type = 'button' variant='light' onClick={()=> removeFromCartHandler(item.product)} ><i className='fas fa-trash'/></Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>)
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4} className='mt-3'>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <h2>Subtotal:({cartItems.reduce((acc,item)=>acc+item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc,item)=>acc+ item.qty*item.price,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length=== 0} onClick={checkOutHandler}>Proceed To Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    );
};

export default CartScreen;