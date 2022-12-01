import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    // TODO: payment
    const booking = useLoaderData();
    console.log("booking data", booking);

    const { price, game_name, location } = booking;

    return (
        <div>
            <p className="text-xl">
                Please pay <strong>{price}BDT</strong> for the purchase{" "}
                <strong>{game_name}</strong> at {location}
            </p>
            <div className="w-96 my-12">
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
