import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaUserTag } from "react-icons/fa";
// import { GiWatch } from "react-icons/gi";
import { BiJoystick } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";
import { MdOutlineAvTimer, MdOutlineVerified } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import useBuyer from '../../Hook/useBuyer';
import load from '../../assets/images/loading.gif';

const SingleProduct = ({ product, user, setBookingProduct }) => {
    const { _id, productImgURL, category, productName, productLocation, resalePrice, originalPrice, productUsedFor, productPostTime, sellerName, sellerEmail, paid } = product;

    const [isBuyer, isBuyerLoading] = useBuyer(user?.email)

    const url = `http://localhost:5000/bookedProducts?email=${user?.email}`;
    const { data: bookedProductArray = [], isLoading } = useQuery({
        queryKey: ['bookedProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('as12tc-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    const userUrl = `http://localhost:5000/users/sellers?email=${user?.email}`;
    const { data: verifiedSellerArray = [], refetch } = useQuery({
        queryKey: ['sellers', user?.email],
        queryFn: async () => {
            const res = await fetch(userUrl, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('as12tc-token')}`
                }
            });
            const data = await res.json();
            // console.log(data)
            return data;
        }
    })

    const handleReportProduct = id => {
        fetch(`http://localhost:5000/allProducts/${id}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem('as12tc-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("You Report has been received")
                }
            })
            .catch(err => console.log(err))

    }

    const alreadyBooked = bookedProductArray.find(product => product.product_Id === _id)
    const verifiedSeller = verifiedSellerArray.find(user => user.email === sellerEmail && user.verifySeller === "yes")

    const ifBooked = <>
        {
            alreadyBooked ?
                <>
                    <Link to={'/dashboard/buyer/MyORders'}
                        className='btn btn-active btn-success btn-block my-2'>
                        Already Booked
                    </Link>
                </>
                :
                <label onClick={() => setBookingProduct(product)}
                    htmlFor="product-book-modal"
                    className='btn btn-outline btn-success btn-block my-2'>
                    <span className='text-slate-800 font-bold flex gap-2'>Book Now <BsFillBookmarkStarFill></BsFillBookmarkStarFill></span>
                </label>
        }
    </>
    const ifPaid = <>
        {
            paid ?
                <button
                    className='btn btn-outline btn-disabled btn-secondary btn-block my-2'>Item Sold</button>
                :
                <button onClick={() => handleReportProduct(_id)}
                    className='btn btn-outline btn-error btn-block my-2'>Report Item</button>
        }
    </>


    if (isLoading || isBuyerLoading) {
        return <img src={load} alt=''/>
    } else {
        refetch()
    }

    return (
        <div>
            <div className="w-full max-w-sm overflow-hidden bg-purple-50 rounded-lg shadow-lg">
                <img className="object-cover object-center w-full h-72" src={productImgURL} alt={productName} />

                <div className="flex items-center px-6 bg-base-100">
                    <BiJoystick className='text-lg'></BiJoystick>
                    <p className="mx-3 text-base font-semibold">{category}</p>
                </div>
                <div className="px-6 py-2">
                    <h2 className="text-2xl font-semibold text-gray-800 ">{productName}</h2>
                    <p className="py-2 text-fuchsia-500 text-lg font-bold">Resale : ${resalePrice}</p>
                    <div className='flex justify-center text-fuchsia-500'>
                        <MdOutlineAvTimer className='text-lg'></MdOutlineAvTimer>
                        <p className="px-2 text-sm">{productUsedFor} month old</p>
                    </div>
                    <div className="flex items-center mt-4 text-gray-700">
                        <TfiLocationPin className='text-lg'></TfiLocationPin>

                        <p className="px-2 text-sm">{productLocation}</p>
                    </div>
                    <div className="flex items-center mt-4 text-gray-700">
                        <ImPriceTag className='text-lg'></ImPriceTag>
                        <small className="text-gray-700 px-2">Original : ${originalPrice}</small>
                    </div>
                    <div className="flex items-center mt-4 text-gray-700">
                        <FaUserTag className='text-lg'></FaUserTag>
                        <div className='flex'>
                            <p className="px-2 text-base">{sellerName}</p>
                            {
                                verifiedSeller ? <MdOutlineVerified></MdOutlineVerified> : <></>
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-4 text-gray-700">
                        <p className="px-2 text-sm">Posted on {productPostTime}</p>
                        {
                            isBuyer ? ifBooked : <></>
                        }
                    </div>
                    {
                        isBuyer ? ifPaid : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;