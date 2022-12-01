import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";

const Process = () => {
    return (
        <section className="bg-white ">
            <div className="py-8 px-10 mx-auto max-w-screen-xl lg:py-4 lg:px-10">
                <div className="grid gap-4 lg:grid-cols-4">
                    <article className="w-64 p-6 rounded-lg border shadow-md bg-fuchsia-100 ">
                        <FaShippingFast className="text-5xl m-auto" />
                        <h2 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900">
                            FREE SHIPPING
                        </h2>
                        <p className="mb-5 font-normal text-center text-gray-500">
                            CASH ON DELIVERY AVAILABLE AT NO EXTRA COST &
                            MULTIPLE PAYMENT OPTIONS AVAILABLE FOR ONLINE
                            PAYMENTS WITH EMI FACILITY! NO MINIMUM ORDER VALUE
                        </p>
                    </article>
                    <article className="w-64 p-6 rounded-lg border shadow-md bg-fuchsia-100 ">
                        <BsFillDoorOpenFill className="text-5xl m-auto" />
                        <h2 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900">
                            DOORSTEP PICKUP AND DELIVERY
                        </h2>
                        <p className="mb-5 font-normal text-center text-gray-500">
                            PICKUP AND DELIVERY AT YOUR DOOR
                        </p>
                    </article>
                    <article className="w-64 p-6 rounded-lg border shadow-md bg-fuchsia-100 ">
                        <FaMoneyCheckAlt className="text-5xl m-auto" />
                        <h2 className="mb-2 text-lg text-center font-bold tracking-tight text-gray-900">
                            MONEY TRANSFERRED IN YOUR ZOZILA WALLET/BANK ACCOUNT
                            WITHIN SAME DAY OF PRODUCTS SOLD!
                        </h2>
                        <p className="mb-5 font-normal text-center text-gray-500">
                            SELL ORDERS PAYMENTS WITHIN SAME DAY!
                        </p>
                    </article>
                    <article className="w-64 p-6 rounded-lg border shadow-md bg-fuchsia-100 ">
                        <AiTwotoneLike className="text-5xl m-auto" />
                        <h2 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900">
                            ALWAYS SALE ON EVERY PRODUCT
                        </h2>
                        <p className="mb-5 font-normal text-center text-gray-500">
                            24x7x365 SALE!
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Process;