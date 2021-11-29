import React from 'react';
import { Rating } from '@mui/material';
import profilePng from '../../images/Profile.png';

const ReviewsCard = ({ review }) => {

    const options = {
        value: review.rating,
        precision: 0.5,
        readOnly: true
    }

    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User"/>
            <p>{review.name}</p>
            <Rating { ...options }/>
            <span className='reviewCard-span'>{ review.comment }</span>
        </div>
    )
}

export default ReviewsCard
