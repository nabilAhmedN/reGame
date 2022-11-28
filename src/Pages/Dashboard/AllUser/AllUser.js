import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';

const AllUser = () => {
    const { data: allrole = [], refetch } = useQuery({
        queryKey: ["allrole"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/allrole");
            const data = await res.json();
            return data;
        },
    });

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/allrole/admin/${id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    toast.success("make admin successfully");
                    refetch();
                }
            });
    };


    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>UserType</th>
                        <th>Admin</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allrole.map((users, index) => (
                        <tr key={users._id}>
                            <th>{index + 1}</th>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>{users.role}</td>
                            <td>
                                {users?.role !== "admin" && (
                                    <button
                                        onClick={() =>
                                            handleMakeAdmin(users._id)
                                        }
                                        className="btn btn-xs btn-primary"
                                    >
                                        Make Admin
                                    </button>
                                )}
                            </td>
                            <td>
                                <button className="btn btn-xs text-red-400">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUser;