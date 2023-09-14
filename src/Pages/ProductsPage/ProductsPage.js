import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../Hook/useTitle';
import { UserContext } from '../../context/UserValidation';
import BookModal from './BookModal/BookModal';
import SingleProduct from './SingleProduct';
import load from '../../assets/images/loading.gif'

const ProductsPage = () => {
    useTitle("Products Page")
    const products = useLoaderData();
    // console.log(products)
    const url = `http://localhost:5000/productsPerCategory?name=${products?.categoryName}`;
    const { data: productsArray = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryProduct', products?.categoryName],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem('as12tc-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    const [bookingProduct, setBookingProduct] = useState(null);
    const { user } = useContext(UserContext);

    if (isLoading) {
        return <img src={load} alt=''/>
    }

    return (
        <div className='container mx-auto'>
            <div className='flex flex-col text-center justify-center mx-2 md:mx-0 mb-5'>
                <h2 className='text-[26px] md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400 py-10 '>
                    {
                        productsArray.length > 0 ? "Select your desire product" : "No Product for this Category listed"
                    }
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mx-3'>
                    {
                        productsArray.map(product =>
                            <SingleProduct
                                key={product._id}
                                setBookingProduct={setBookingProduct}
                                user={user}
                                product={product}
                            ></SingleProduct>)
                    }
                </div>
            </div>
            {
                bookingProduct && <BookModal
                    modalData={bookingProduct}
                    isLoading={isLoading}
                    refetch={refetch}
                    user={user}
                    setBookingProduct={setBookingProduct}
                ></BookModal>
            }
        </div>
    );
};

export default ProductsPage;