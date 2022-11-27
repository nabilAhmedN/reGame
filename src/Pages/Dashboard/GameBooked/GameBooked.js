import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const GameBooked = () => {

    const {user} = useContext(AuthContext)
    const url = `http://localhost:5000/bookingsgame?email=${user?.email}`;

    const { data: bookingsgame = []} = useQuery({
        queryKey: ["bookingsgame", user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        },
    });

    return (
        <div>
            <h2>Game is booked</h2>
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
                        {bookingsgame.map((game, index) => (
                            <tr key={game._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={game.img} alt="game" />
                                        </div>
                                    </div>
                                </td>
                                <td>{game.game_name}</td>
                                <td>{game.price}</td>
                                <td>Blue</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GameBooked;