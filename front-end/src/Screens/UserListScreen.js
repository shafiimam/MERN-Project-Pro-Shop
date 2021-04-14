import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message/Message";
import Loader from "../Components/Loader/Loader";
import { listUsers , deleteUser} from "../actions/userActions"
import { useHistory } from "react-router";
const UserListScreen = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userList = useSelector(state => state.userList)
    const userLogin = useSelector(state => state.userLogin)
    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete
    const {userInfo}  = userLogin
    const { loading, error, users } = userList
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
             dispatch(listUsers())
        }
        else{
            history.push('/login') 
        }
       
    }, [dispatch,userInfo,history,successDelete]);
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')){
            dispatch(deleteUser(id))
        }
        
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className="fas fa-check" style={{ color: 'green' }}
                                ></i>) : (<i className="fas fa-times" style={{ color: 'red' }}
                                ></i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant="info" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() =>deleteHandler(user._id)}><i className="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;