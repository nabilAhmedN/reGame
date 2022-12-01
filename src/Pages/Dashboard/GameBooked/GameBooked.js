import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const GameBooked = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookingsgame?email=${user?.email}`;

    const { data: bookingsgame = [] } = useQuery({
        queryKey: ["bookingsgame", user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });
            const data = await res.json();
            return data;
        },
    });

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Game Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingsgame?.length &&
                            bookingsgame?.map((game, index) => (
                                <tr key={game._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img
                                                    src={game.img}
                                                    alt="game"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{game.game_name}</td>
                                    <td>{game.price}</td>
                                    <td>
                                        {game.price && !game.paid && (
                                            <Link
                                                to={`/dashboard/payment/${game._id}`}
                                            >
                                                <button className="btn btn-primary btn-sm">
                                                    Pay
                                                </button>
                                            </Link>
                                        )}
                                        {game.price && game.paid && (
                                            <span className="text-green-500">
                                                Paid
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GameBooked;
