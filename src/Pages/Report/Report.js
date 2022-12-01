import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Report = () => {
    const { data: report= [], refetch } = useQuery({
        queryKey: ["allrole"],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:5000/allproduct?report=true`
            );
            const data = await res.json();
            return data;
        },
    });

    const handleDelete = (id) => {
        const proceed = window.confirm(
            "Are you sure, you want to cancel this Products"
        );
        if (proceed) {
            fetch(`http://localhost:5000/deleteproduct/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success("Successfully Adertise");
                        refetch();
                    }
                });
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Game Name</th>
                        <th>Original Price</th>
                        <th>Resell Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {report.map((users, index) => (
                        <tr key={users._id}>
                            <th>{index + 1}</th>
                            <td>{users.name}</td>
                            <td>{users.game_name}</td>
                            <td>{users.original_price}</td>
                            <td>{users.resale_price}</td>
                            <td>
                                <button
                                    className="btn btn-xs text-red-400"
                                    onClick={() => handleDelete(users._id)}
                                >
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

export default Report;