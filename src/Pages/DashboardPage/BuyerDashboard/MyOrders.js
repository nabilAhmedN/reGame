import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";
import { Link } from 'react-router-dom';
import useTitle from '../../../Hook/useTitle';
import load from '../../../assets/images/loading.gif';
import ConfirmationModal from '../../../components/ConfirmarionModal/ConfirmationModal';
import { UserContext } from '../../../context/UserValidation';

const MyOrders = () => {
    useTitle("My Orders")
    const [deletingBookedProduct, setDeletingBookedProduct] = useState(null);

    const closeModal = () => {
        setDeletingBookedProduct(null);
    }
    const { user } = useContext(UserContext)
    const url = `http://localhost:5000/bookedProducts?email=${user?.email}`;
    const { data: productsArray = [], refetch, isLoading } = useQuery({
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
    // const allProductUrl = `http://localhost:5000/bookedProducts?email=${user?.email}`;
    // const { data: allProductArray = [] } = useQuery({
    //     queryKey: ['bookedProducts', user?.email],
    //     queryFn: async () => {
    //         const res = await fetch(allProductUrl, {
    //             headers: {
    //                 authorization: `Bearer ${localStorage.getItem('as12tc-token')}`
    //             }
    //         });
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    const handleDeleteOrder = modalData => {
        console.log(modalData?._id)
        fetch(`http://localhost:5000/bookedProducts/${modalData?._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${modalData?.productName} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <img src={load} alt=''/>
    }
    return (
        <div className='mx-4'>
            <h2 className='my-8 text-2xl font-semibold underline underline-offset-2'>
                {productsArray.length > 0 ? `Total ${productsArray.length} product in your list` : "No product booked yet!"}
            </h2>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Product Information</th>
                                <th>Seller Email</th>
                                <th>Pay Now</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsArray.map((booking, i) =>
                                    <tr key={booking._id}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={booking?.productImgURL} alt={booking?.productName} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{booking?.productName}</div>
                                                    <div className="text-sm opacity-50">Seller : {booking?.sellerName}</div>
                                                    <div className="text-sm opacity-50">Email : {booking?.sellerEmail}</div>
                                                    <div className="text-sm opacity-50">Location : {booking?.clientLocation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${booking?.productPrice}.00</td>
                                        <td>
                                            {
                                                booking?.sold === "no" ?
                                                    <>
                                                        <Link to={`/dashboard/buyer/payment/${booking?.product_Id}`}>
                                                            <button
                                                                className='btn btn-sm text-center btn-primary'>Pay Now
                                                            </button>
                                                        </Link>
                                                    </>
                                                    :
                                                    <>
                                                        <span
                                                            className='btn btn-sm text-center btn-disabled'>Sold
                                                        </span>
                                                    </>
                                            }
                                        </td>
                                        <td>
                                            <label onClick={() => setDeletingBookedProduct(booking)} htmlFor="confirmation-modal" className="btn btn-error">< MdCancel></MdCancel></label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletingBookedProduct && <ConfirmationModal
                    title={`Are you sure you want to remove?`}
                    message={`If you delete ${deletingBookedProduct?.productName}. It cannot be undone.`}
                    successAction={handleDeleteOrder}
                    successButtonName="remove"
                    modalData={deletingBookedProduct}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyOrders;