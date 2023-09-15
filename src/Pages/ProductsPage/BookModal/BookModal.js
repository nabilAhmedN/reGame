import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const BookModal = ({ closeModal, modalData, user, refetch, setBookingProduct }) => {
    const { _id, productImgURL, category, productName, productLocation, resalePrice, sellerName, sellerEmail } = modalData;
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const productBookingData = data => {
        const bookedProduct = {
            clientName: user?.displayName,
            clientEmail: user?.email,
            clientContact: data?.customerContact,
            clientLocation: data?.customerLocation,
            sellerName,
            sellerEmail,
            productCategory: category,
            product_Id: _id,
            productName: productName,
            productLocation,
            productImgURL: productImgURL,
            productPrice: resalePrice,
            sold: "no",
            status: "booked",
        }

        fetch(`http://localhost:5000/bookedProducts/status-booked/${_id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    fetch(`http://localhost:5000/bookedProducts?email=${user?.email}`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${localStorage.getItem('as12tc-token')}`
                        },
                        body: JSON.stringify(bookedProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success("Product is booked!")
                                refetch()
                                reset()
                                setBookingProduct(null)
                                closeModal()
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <input type="checkbox" id="product-book-modal" className="modal-toggle" />
            <div className="modal modal-bottom md:modal-middle">
                <div className="modal-box relative">
                    <label htmlFor="product-book-modal" onClick={closeModal}
                        className="btn btn-sm btn-circle absolute right-2 top-2 btn-outline  border-0 btn-primary">✕</label>
                    <h3 className="font-bold text-lg text-center">Please share details for booking <br /> {productName}</h3>
                    <p className="py-4 text-center">Your booking information</p>
                    <form onSubmit={handleSubmit(productBookingData)}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your name</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"
                                disabled defaultValue={user?.displayName} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email address</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"
                                disabled defaultValue={user?.email} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Product name</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full"
                                disabled defaultValue={productName} />
                        </div>
                        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Product price</span>
                                </label>
                                <input type="text" placeholder="Type here" className="input input-bordered w-full"
                                    disabled defaultValue={resalePrice}$/>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Your Contact Number*</span>
                                </label>
                                <input type="text" {...register("customerContact", { required: "Cell number is required." })}
                                    placeholder="Type here" className="input input-bordered w-full" />
                                {errors.customerContact && <p className='text-error my-1'>{errors.customerContact.message}</p>}
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Location*</span>
                            </label>
                            <input type="text" {...register("customerLocation", { required: "You Location is required." })}
                                placeholder="Your Location" className="input input-bordered w-full" />
                            {errors.customerLocation && <p className='text-error my-2'>{errors.customerLocation.message}</p>}
                        </div>
                        <input type="submit" value="BOOK PRODUCT"
                            className="input btn btn-outline w-full my-4" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookModal;