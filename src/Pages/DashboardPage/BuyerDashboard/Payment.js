import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../../Hook/useTitle';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)
// console.log(stripePromise)
const Payment = () => {
    useTitle("Payment")
    const booking = useLoaderData();
    const { productName, resalePrice } = booking;
    // console.log(booking)
    return (
        <div className='mx-4 flex flex-col my-10'>
            <h2 className='my-4 text-2xl font-semibold underline underline-offset-2'>
                Payment for <br className='block md:hidden' /> {productName}
            </h2>
            <p className='my-4 text-xl font-semibold'>
                Please pay <strong>${resalePrice}.00</strong> for your order!
            </p>
            <div className="w-full md:w-4/5">
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;