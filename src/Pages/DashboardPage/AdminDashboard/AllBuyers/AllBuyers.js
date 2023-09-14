import { useQuery, } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";
import useTitle from '../../../../Hook/useTitle';
import ConfirmationModal from '../../../../components/ConfirmarionModal/ConfirmationModal';
import SpinnerPrimary from '../../../../components/Spinner/SpinnerPrimary';
import { UserContext } from '../../../../context/UserValidation';


const AllBuyers = () => {
    useTitle("All Buyers")
    const [deletingBuyer, setDeletingBuyer] = useState(null);

    const closeModal = () => {
        setDeletingBuyer(null);
    }
    const { user } = useContext(UserContext)
    const url = `http://localhost:5000/users/buyers?email=${user?.email}`;
    const { data: usersArray = [], refetch, isLoading } = useQuery({
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

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful.')
                    refetch();
                }
            })
    }

    const handleDeleteBuyer = buyer => {
        fetch(`http://localhost:5000/users/buyers/${buyer?._id}`, {
            method : "DELETE",
            headers : {
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Seller ${buyer.name} deleted successfully`)
            }
        })
    }

    if (isLoading) {
        return <SpinnerPrimary></SpinnerPrimary>
    }

    return (
        <div>
            <h2 className='my-8 text-2xl font-semibold underline underline-offset-2'>
                {usersArray.length > 0 ? `${usersArray.length} Buyers are currently registered` : "No Buyer is registered yet"}
            </h2>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>User Information</th>
                                <th>Email</th>
                                <th>Make Admin</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersArray.map((user, i) =>
                                    <tr key={user._id}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user?.imageURL} alt={user?.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user?.name}</div>
                                                    <div className="text-sm opacity-50">{user?.contact}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user?.email}</td>
                                        <td>{
                                            user?.role !== "admin" && <button onClick={() => handleMakeAdmin(user._id)}
                                                className='btn btn-sm text-center btn-primary'>Make Admin</button>
                                        }
                                        </td>
                                        <td>
                                            <label onClick={() => setDeletingBuyer(user)} htmlFor="confirmation-modal" className="btn">< MdCancel></MdCancel></label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletingBuyer && <ConfirmationModal
                    title={`Are you sure you want to remove?`}
                    message={`If you delete ${deletingBuyer.name}. It cannot be undone.`}
                    successAction={handleDeleteBuyer}
                    successButtonName="remove"
                    modalData={deletingBuyer}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllBuyers;