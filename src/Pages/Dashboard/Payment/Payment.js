import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    // TODO: payment
    const { data } = useLoaderData()
    console.log('booking data', data);
    return (
        <div>
            <h3>taka dy</h3>
        </div>
    );
};

export default Payment;