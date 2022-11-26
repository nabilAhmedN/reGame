import React from "react";
import { GoVerified } from "react-icons/go";

const AllCategoriesDetails = ({ catego }) => {
    const {
        img,
        game_name,
        location,
        resale_price,
        original_price,
        year_used,
        seler_name,
        registered,
        verified,
    } = catego;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={img} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {game_name}
                    {verified ? (
                        <>
                            <div className="badge badge-secondary">
                                <GoVerified className="text-white" />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </h2>
                <h2 className="card-title">
                    Location: <span className="font-normal">{location}</span>
                </h2>
                <p>Resale Price: ${resale_price}</p>
                <p>Origal Price: ${original_price}</p>
                <p>Range of Used: {year_used} Months </p>
                <p>Post On: {registered.slice(0, 10)}</p>
                <p>Saler: {seler_name}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default AllCategoriesDetails;
