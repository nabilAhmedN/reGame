import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserValidation';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const { user } = useContext(UserContext);
    // console.log(resalePrice)
    const stripe = useStripe();
    const elements = useElements();
    const { _id, resalePrice } = booking;
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: 'POST',
            headers: {
                "content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            },
            body: JSON.stringify({ resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resalePrice]);


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            toast.error(`${error?.message}`)
            setCardError(error?.message)
            console.log(error);
        } else {
            setCardError('')
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            // console.log('card info', card);
            // store payment info in the database
            const payment = {
                price: resalePrice,
                transactionId: paymentIntent.id,
                email: user?.email,
                bookingId: _id
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('as12tc-token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })
        }
        setProcessing(false);
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement className='my-6 bg-amber-300 py-7 rounded-xl bordered border-spacing-2 border-amber-500 px-4'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#0f172a',
                            '::placeholder': {
                                color: '#0f172a',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret || processing} className='btn btn-primary btn-outline mt-4'>
                Complete Payment
            </button>
            <p className='text-lg font-semibold text-error my-4'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                    <Link to={'/dashboard/buyer/MyORders'} className="text-lg my-3 text-green-400 hover:underline hover:underline-offset-1">
                        Press here for more purchase.
                    </Link>
                </div>
            }
        </form>
    );
};

export default CheckoutForm;