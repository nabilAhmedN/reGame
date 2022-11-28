import React, { useEffect, useState } from 'react';

const AllSeller = () => {

    const [seller, setSeller] = useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:5000/users?role=Seller`)
            .then((res) => res.json())
            .then((data) => setSeller(data));
    }, [])

    return (
        <div>
            <h2>All seller: {seller.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seller.map((Seller, index) => (
                            <tr key={Seller._id}>
                                <th>{index + 1}</th>
                                <td>{Seller.name}</td>
                                <td>{Seller.email}</td>
                                <td>
                                    <button className="btn btn-xs btn-primary">
                                        Verify
                                    </button>
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
        </div>
    );
};

export default AllSeller;