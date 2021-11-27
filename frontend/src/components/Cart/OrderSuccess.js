import React, { Fragment } from 'react';
import './OrderSuccess.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <Fragment>
            <MetaData title='Success'/>
            <div className="orderSuccess">
                <CheckCircleIcon />
                <Typography>Your order has been placed successfully</Typography>
                <Link to='/orders'>View orders</Link>
            </div>
        </Fragment>
    )
}

export default OrderSuccess;
