import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { MdCancel, MdVerifiedUser } from "react-icons/md";
import useTitle from '../../../../Hook/useTitle';
import ConfirmationModal from '../../../../components/ConfirmarionModal/ConfirmationModal';
import load from '../../../../assets/images/loading.gif'
import { UserContext } from '../../../../context/UserValidation';


const AllSellers = () => {
    useTitle('All Sellers')
    const [deletingSeller, setDeletingSeller] = useState(null);

    const closeModal = () => {
        setDeletingSeller(null);
    }
    const { user } = useContext(UserContext)
    const url = `http://localhost:5000/users/sellers?email=${user?.email}`;
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

    const handleVerifySeller = id => {
        fetch(`http://localhost:5000/users/sellers/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Seller is verified.')
                    refetch();
                }
            })
    }

    const handleDeleteSeller = seller => {
        fetch(`http://localhost:5000/users/sellers/${seller?._id}`, {
            method : "DELETE",
            headers : {
                authorization: `bearer ${localStorage.getItem('as12tc-token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Seller ${seller.name} deleted successfully`)
            }
        })
    }

    if (isLoading) {
        return <img src={load} alt=''/>
    }

    return (
        <div>
            <h2 className='my-8 text-2xl font-semibold underline underline-offset-2'>
                {usersArray.length > 0 ? `${usersArray.length} Sellers are currently registered` : "No Seller is registered yet"}
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
                                        <td>
                                            {
                                                user?.verifySeller !== "yes" ? <button onClick={() => handleVerifySeller(user._id)}
                                                    className='btn btn-sm text-center btn-primary'>Verify Seller</button>
                                                    :
                                                    <button className='btn btn-sm text-center btn-ghost text-amber-500'><MdVerifiedUser></MdVerifiedUser></button>
                                            }
                                        </td>
                                        <td>
                                            <label onClick={() => setDeletingSeller(user)} htmlFor="confirmation-modal" className="btn btn-error">< MdCancel></MdCancel></label>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={`Are you sure you want to remove?`}
                    message={`If you delete ${deletingSeller.name}. It cannot be undone.`}
                    successAction={handleDeleteSeller}
                    successButtonName="remove"
                    modalData={deletingSeller}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;