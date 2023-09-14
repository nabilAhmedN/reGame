import { useQuery } from '@tanstack/react-query';
import React from 'react';
import load from '../../../assets/images/loading.gif';
import AdvertiseSectionCard from './AdvertiseSectionCard';

const AdvertiseSection = () => {
    const url = `http://localhost:5000/advertisedProducts`;
    const { data: advertiseArray = [], isLoading } = useQuery({
        queryKey: ["advertisedProducts"],
        queryFn: async () => {
        const res = await fetch(url, {
            headers: {
            "content-type": "application/json",
            },
        });
        const data = await res.json();
        return data;
        },
    });
    console.log(advertiseArray.length)
    if (isLoading) {
        return <img src={load} alt=''/>
    }
    
    return (
        
        <div>
        {advertiseArray.length > 0 ? (
            <div className="flex flex-col text-center justify-center mt-28 mx-2 md:mx-0">
                <h2 className=" text-center font-bold text-3xl">
                    Pick the <span className="text-fuchsia-600">Hit</span> Games
                </h2>
                <div className="flex justify-center mx-auto mt-2 mb-6 md:mb-12">
                    <span className="inline-block w-40 h-1 bg-fuchsia-300 rounded-full"></span>
                    <span className="inline-block w-8 h-1 mx-1 bg-fuchsia-200 rounded-full"></span>
                    <span className="inline-block w-4 h-1 bg-fuchsia-100 rounded-full"></span>
                </div>
            </div>
        ) : (
            <></>
        )}
        <div className="grid gap-7 md:gap-14 lg:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-6 md:ml-0 ml-[51px] ">
            {advertiseArray.map((advertise) => (
                <AdvertiseSectionCard key={advertise._id} advertise={advertise}></AdvertiseSectionCard>
            ))}
        </div>
    </div>
    );
};

export default AdvertiseSection;