import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, userDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {saveShippingAddress} from '../actions/cartActions'
import CheckOutSteps from '../Components/CheckOutSteps/CheckOutSteps'
const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const shippingAddress = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const history = useHistory()
    const dispatch = useDispatch()
    const submitHanlder = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <div>
            <h1>Shipping</h1>
            <CheckOutSteps step1 step2 ></CheckOutSteps>
            <Form onSubmit={submitHanlder}>
                <Form.Group controlId="name">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="name">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="postalCode"
            placeholder="Enter postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type= 'submit' variant="primary"  >Continue</Button>
            </Form>
        </div>
    );
};

export default ShippingScreen;