import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookModal = ({ gameName, setGameName }) => {
    const { user } = useContext(AuthContext);

    const {
        img,
        game_name,
        resale_price,
    } = gameName;

    const handleBooking = (event) => {
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const game_name = form.game_name.value;
        const img = form.img.value;
        const price = form.price.value;
        const phone = form.phone.value;
        const location = form.location.value;
        
        const booking = {
            name,
            email,
            game_name,
            img,
            price,
            phone,
            location,
        };
        fetch('http://localhost:5000/bookingsgame', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged){
                setGameName(null);
                toast.success("Your booking is confirmed");
            }
        })
    }

    return (
        <div>
            <input type="checkbox" id="booking-game" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="booking-game"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    {/* <h3 className="text-lg font-bold">{name}</h3> */}
                    <form
                        onSubmit={handleBooking}
                        className="grid grid-cols-1 gap-3 mt-10"
                    >
                        <input
                            name="name"
                            type="text"
                            value={user?.displayName}
                            className="input w-full input-bordered"
                            readOnly
                        />
                        <input
                            name="email"
                            type="email"
                            value={user?.email}
                            className="input w-full input-bordered"
                            readOnly
                        />
                        <input
                            name="game_name"
                            type="text"
                            value={game_name}
                            className="input w-full input-bordered"
                            readOnly
                        />
                        <input
                            name="img"
                            type="text"
                            value={img}
                            className="input w-full input-bordered"
                            readOnly
                        />
                        <input
                            name="price"
                            type="text"
                            value={resale_price}
                            className="input w-full input-bordered"
                            readOnly
                        />
                        <input
                            name="phone"
                            type="text"
                            placeholder="Your Phone Number"
                            className="input w-full input-bordered"
                        />
                        <input
                            name="location"
                            type="text"
                            placeholder="meeting location"
                            className="input w-full input-bordered"
                        />
                        <br />
                        <input
                            className="btn btn-primary w-full "
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookModal;
