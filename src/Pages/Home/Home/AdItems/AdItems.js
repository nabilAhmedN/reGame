import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import { AuthContext } from '../../../../contexts/AuthProvider';
import AdCart from './AdCart';

const AdItems = () => {
    const { data: userdata = [], refetch } = useQuery({
        queryKey: ["allrole"],
        queryFn: async () => {
            const res = await fetch(
                "http://localhost:5000/mydata?advertise=true"
            );
            const data = await res.json();
            return data;
        },
    });
    return (
        <div>
            {userdata.length > 0 ? (
                <>
                    <h2 className="text-center font-bold text-2xl mt-10">
                        Advertised Item
                    </h2>
                </>
            ) : (
                <></>
            )}
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-6 ">
                {userdata.map((category) => (
                    <AdCart key={category._id} category={category}></AdCart>
                ))}
            </div>
        </div>
    );
};

export default AdItems;