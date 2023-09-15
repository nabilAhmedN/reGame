import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";
import useTitle from '../../../../Hook/useTitle';
import load from '../../../../assets/images/loading.gif';
import ConfirmationModal from '../../../../components/ConfirmarionModal/ConfirmationModal';
import { UserContext } from '../../../../context/UserValidation';


const MyPostedProducts = () => {
    useTitle('Your Products')
    const [deletingPostedProduct, setDeletingPostedProduct] = useState(null);

    const closeModal = () => {
        setDeletingPostedProduct(null);
    }
    const { user } = useContext(UserContext)
    const url = `http://localhost:5000/allProducts/seller?email=${user?.email}`;
    const { data: productArray = [], refetch, isLoading } = useQuery({
        queryKey: ['users', user?.email],
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
    const handleAdvertiseProduct = id => {
        fetch(`http://localhost:5000/advertisedProducts/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Product added in advertisement")
                    refetch()
                }
            })
            .catch(err => console.log(err))
    }
    const handleDeleteProduct = modalData => {
        // console.log(modalData?._id)
        fetch(`http://localhost:5000/allProducts/${modalData?._id}`, {
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
        <div className='mx-4 md:mx-10'>
            <h2 className='my-8 text-2xl font-semibold underline underline-offset-2'>
                {
                    productArray.length > 0 ? `List of your ${productArray.length} products` : "You have not posted any product yet!"
                }
            </h2>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Product Details</th>
                                <th>Resale Price</th>
                                <th>Status</th>
                                <th>Advertise</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productArray.map((product, i) =>
                                    <tr key={product._id}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={product?.productImgURL} alt={product?.productName} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product?.productName}</div>
                                                    <div className="text-sm opacity-50">{product?.category}</div>
                                                    <div className="text-sm opacity-50">{product?.productUsedFor} month Old</div>
                                                    <div className="text-sm opacity-50">from: {product?.productLocation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">${product?.resalePrice}</div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{product?.status}</div>
                                        </td>
                                        <td>
                                            {
                                                product?.status === "available"
                                                && !product?.advertised &&
                                                <button onClick={() => handleAdvertiseProduct(product._id)}
                                                    className='btn btn-sm text-center btn-primary'>Advertise</button>
                                            }
                                        </td>
                                        <td>
                                            <label onClick={() => setDeletingPostedProduct(product)} htmlFor="confirmation-modal" className="btn">< MdCancel></MdCancel></label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletingPostedProduct && <ConfirmationModal
                    title={`Are you sure you want to remove?`}
                    message={`If you delete ${deletingPostedProduct?.productName}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="remove"
                    modalData={deletingPostedProduct}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyPostedProducts;