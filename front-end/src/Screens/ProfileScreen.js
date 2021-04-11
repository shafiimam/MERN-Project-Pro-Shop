import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, userDispatch, useSelector } from "react-redux";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { getUserDetails , updateUserProfile} from "../actions/userActions";

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory()

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success  } = userUpdateProfile;
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
        else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('password dont match')
        }
        else {
           dispatch(updateUserProfile({id: user._id, name , email, password}))
        }


    };

    return (


        <Row>
            <Col md={3}>

                <h2>USer Profile</h2>
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="danger">{message}</Message>}
                {success && <Message variant="success">User updated successfully</Message>}
                {loading && <Loader> </Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Enter password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                             </Button>
                </Form>
            </Col>
            <Col md={9}>

            </Col>
        </Row>

    );
};

export default ProfileScreen;
