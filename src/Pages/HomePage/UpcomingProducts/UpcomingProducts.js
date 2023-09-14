import React from 'react';

const BuyerReviews = () => {
    return (
        <section className="bg-base-100 my-10">
            <div className="container px-6 py-10 mx-auto">
                <div className="mt-6 md:flex md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold capitalize xl:text-5xl lg:text-4xl ">
                            What our clients are saying
                        </h1>

                        <div className="flex mx-auto mt-6">
                            <span className="inline-block w-40 h-1 bg-amber-300 rounded-full"></span>
                            <span className="inline-block w-3 h-1 mx-1 bg-amber-200 rounded-full"></span>
                            <span className="inline-block w-1 h-1 bg-amber-100 rounded-full"></span>
                        </div>
                    </div>
                </div>

                <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="p-8 border rounded-lg ">
                        <p className="leading-loose">
                            “Quick and fast delivery - I bought the Casio A700 for myself from a new shop, then realized it was too small. Time Craft was there to solve this issue, I got a Casio G Shock from this platform on a very low price. It was preowned but very elegant look. I'm happy with my purchase, very rugged watch, has everything you'll ever need in a watch.”
                        </p>

                        <div className="flex items-center mt-8 -mx-2">
                            <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="avatar" />

                            <div className="mx-2">
                                <h1 className="font-semibold ">Arif Uddin Raihan</h1>
                                <span className="text-sm">Buyer, Dhaka | Bangladesh</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-warning border border-transparent rounded-lg">
                        <p className="leading-loose text-base-100">
                            “User friendly website. Very helpful online service, fast & efficient. Great first class service from beginning to end. Delivered on time as promised. Genuine saving on watch I purchased versus reputable High Standers, reclaimed. Very pleased with my purchase and would recommend this reseller watch shop!”
                        </p>

                        <div className="flex items-center mt-8 -mx-2">
                            <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-200" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="avatar" />

                            <div className="mx-2">
                                <h1 className="font-semibold text-base-100">Mahfuza Maaya</h1>
                                <span className="text-sm text-base-300">Buyer, Dhaka | Bangladesh</span>
                            </div>
                        </div>
                    </div>


                    <div className="p-8 border rounded-lg">
                        <p className="leading-loose">
                            “I had too many watch from past centuries and on Time-Craft website I not only got a decent value og those vintage watches but also best buyers. Very fast and beautifully designed website to make your search and selling or buying time efficient. Very helpful online service, fast & efficient. Great first class service from beginning to end.”
                        </p>

                        <div className="flex items-center mt-8 -mx-2">
                            <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="avatar" />

                            <div className="mx-2">
                                <h1 className="font-semibold ">Tariqul Islam</h1>
                                <span className="text-sm">Seller, Dhaka | Bangladesh</span>
                            </div>
                        </div>
                    </div>


                </section>
            </div>
        </section>
    );
};

export default BuyerReviews;