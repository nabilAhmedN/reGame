import React from "react";
import toast from "react-hot-toast";
import { MdVerifiedUser } from "react-icons/md";

const AllCategoriesDetails = ({ catego, setGameName, refetch }) => {
    const {
        _id,
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

    const handleStatusUpdate = (id) => {
        toast.success("Successfully Reported!");

        console.log(id);
        fetch(`https://re-game-server.vercel.app/reportupdate/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ report: "true" }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch();
                }
            });
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={img} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{game_name}</h2>
                <h2 className="card-title">
                    Location: <span className="font-normal">{location}</span>
                </h2>
                <p>Resale Price: ${resale_price}</p>
                <p>Origal Price: ${original_price}</p>
                <p>Range of Used: {year_used} Months </p>
                <p>Post On: {registered.slice(0, 10)}</p>
                <p>
                    Saller: {seler_name}{" "}
                    {verified === "true" ? (
                        <>
                            <div className="badge badge-secondary">
                                <MdVerifiedUser className="text-white" />
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </p>
                <div className="flex justify-between">
                    <div className="card-actions">
                        <label
                            className="btn btn-primary"
                            htmlFor="booking-game"
                            onClick={() => setGameName(catego)}
                        >
                            Book Now
                        </label>
                    </div>
                    <div className="card-actions">
                        <label
                            className="btn btn-primary"
                            htmlFor="booking-game"
                            onClick={() => handleStatusUpdate(_id)}
                        >
                            Report
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCategoriesDetails;
