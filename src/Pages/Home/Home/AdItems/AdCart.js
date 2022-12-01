import React from "react";
import { GoVerified } from "react-icons/go";

const AdCart = ({ category }) => {
    const {
        game_name,
        img,
        verified,
        resale_price,
        original_price,
        year_used,
        registered,
        seler_name,
    } = category;
    return (
        <div className="card w-72 bg-base-100 shadow-xl image-full">
            <figure>
                <img src={img} alt="" />
            </figure>
            <div className="card-body items-center justify-end">
                <h2 className="card-title">
                    {game_name}
                    {verified !== "false" ? (
                        <>
                            <div className="badge badge-secondary">
                                <GoVerified className="text-white" />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </h2>
                <p>Resale Price: ${resale_price}</p>
                <p>Origal Price: ${original_price}</p>
                <p>Range of Used: {year_used} Month </p>
                <p>Post On: {registered.slice(0, 10)}</p>
                <p>Saller: {seler_name}</p>
            </div>
        </div>
    );
};

export default AdCart;
