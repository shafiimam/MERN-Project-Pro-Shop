import React from 'react';
import { Spinner } from 'react-bootstrap'
const Loader = () => {
    return (
        <Spinner animation = 'border' role= 'status' style={{width:'100px',
        height:'100px',
        margin: 'auto',
        display:'block'
        }}>
            <spna className='sr-only'>Loading</spna>
        </Spinner>
    );
};

export default Loader;