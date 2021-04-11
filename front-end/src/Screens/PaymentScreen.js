import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, userDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from "../Components/FormContainer/FormContainer";
import CheckOutSteps from '../Components/CheckOutSteps/CheckOutSteps'
const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const shippingAddress = cart
    const history = useHistory()
    if (!shippingAddress) {
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as="legend">
                        Select payment method
                    </Form.Label>
                    <Col>
                        <Form.Check type="radio" label="paypal or credit card" id="Paypal" name="paymentMethod" value="Paypal" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        {/* <Form.Check type="radio" label="stripe" id="Stripe" name="paymentMehod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant="primary">Continue</Button>

            </Form>

        </FormContainer>
    );
};

export default PaymentScreen;