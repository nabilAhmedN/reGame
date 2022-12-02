import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const { data: mydata = [], refetch } = useQuery({
        queryKey: ["allrole"],
        queryFn: async () => {
            const res = await fetch(
                `https://re-game-server.vercel.app/mydata?email=${user?.email}`
            );
            const data = await res.json();
            return data;
        },
    });

    const handleStatusUpdate = (id) => {
        console.log(id);
        fetch(`https://re-game-server.vercel.app/advertiseupdate/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ advertise: "true" }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success("Successfully Adertise");
                    refetch();
                }
            });
    };
    const handleDelete = (id) => {
        const proceed = window.confirm(
            "Are you sure, you want to cancel this Products"
        );
        if (proceed) {
            fetch(`https://re-game-server.vercel.app/deleteproduct/${id}`, {
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
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mydata.map((users, index) => (
                            <tr key={users._id}>
                                <th>{index + 1}</th>
                                <td>{users.seler_name}</td>
                                <td>{users.email}</td>
                                <td>
                                    {users?.isSoled !== "false" ? (
                                        <>Sold</>
                                    ) : (
                                        <>Unsold</>
                                    )}
                                </td>

                                <td>
                                    {users?.advertise !== "false" ? (
                                        <>Already advertise</>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-xs btn-primary"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        users._id
                                                    )
                                                }
                                            >
                                                Advertise
                                            </button>
                                        </>
                                    )}
                                </td>
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
        </div>
    );
};

export default MyProduct;
