import React, { useEffect, useState } from "react";
import {PayPalButton} from "react-paypal-button-v2"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch,  useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Message from '../Components/Message/Message'
import Loader from '../Components/Loader/Loader'
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder , deliverOrder} from "../actions/orderActions";
import axios from "axios";
import {ORDER_PAY_RESET , ORDER_DELIVER_RESET} from '../constants/orderConstants'
const OrderScreen = () => {
    const {id} = useParams()
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}  = userLogin

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver,success: successDeliver } = orderDeliver
    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }
    
    useEffect(() => {
        if(userInfo){
            const addPaypalScript = async()=>{
                const {data:clientId} = await axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async = true
                script.onload = () =>{
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
    
            if(!order || successPay || successDeliver || order._id  !==id){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
             dispatch(getOrderDetails(id))    
            }
            else if(!order.isPaid){
                if(!window.paypal){
                    addPaypalScript()
                }
                else{
                    setSdkReady(true)
                }
            }
        }
        else{
            history.push('/login')
        }
       
    }, [dispatch, id, successPay, successDeliver, order, userInfo, history])
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id,paymentResult))
    }

    const deliverHandler = ()=> {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : 
    <>
        <h2>Order {order._id}</h2>
        <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                           <p> <strong>Name: </strong>{order.user.name}</p>
                           <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>
                                    Address :
                             </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},{order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success">delivered at {order.deliveredAt}</Message>: <Message variant="danger">not delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                            <strong>
                                method:
                            </strong>
                            {order.paymentMethod}</p>
                            {order.isPaid ? <Message variant="success">paid at {order.paidAt}</Message>: <Message variant="danger">not paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems === 0 ? <Message>Your order is empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/productDetail/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price} = ${item.qty * item.price}
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>)}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summery   </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? <Loader/> : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>)}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver&& <Loader/>}
                            {
                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type="button" className="btn btn-block" onClick={deliverHandler}>Mark As Delivered</Button>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
};

export default OrderScreen;