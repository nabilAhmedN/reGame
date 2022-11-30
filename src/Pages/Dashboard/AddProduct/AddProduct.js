import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";


const AddProducts = () => {
    const { user } = useContext(AuthContext);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleAddProduct = (data) => {
        console.log(data);
        const email = data.email;
        const seler_name = data.name;
        const title = data.category;
        const game_name = data.GameName;
        const original_price = data.originalPrice;
        const resale_price = data.resalePrice;
        const phoneNumber = data.number;
        const location = data.location;
        const year_used = data.usedYear;
        const img = data.photo;
        const condition = data.condition;
        const description = data.description;
        const verified = false;
        const report = false;
        const advertise = false;
        const isSoled = false;
        const dateobj = new Date();
        const registered = dateobj.toISOString();
        const addProduct = {
            email,
            seler_name,
            title,
            game_name,
            original_price,
            resale_price,
            phoneNumber,
            location,
            year_used,
            img,
            condition,
            description,
            verified,
            report,
            advertise,
            isSoled,
            registered,
        };
        fetch("http://localhost:5000/addproduct", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addProduct),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Added successfuly");
                }
            });
    };
    return (
        <div className="h-[500px] ">
            <div className="w-96 p-7">
                <h1 className="text-4xl text-center font-bold">
                    Add A Product
                </h1>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="form-control w-full max-w-xs mt-3 bordered">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                defaultValue={user.email}
                                type="email"
                                {...register("email", {
                                    required: true,
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input
                                defaultValue={user.displayName}
                                type="text"
                                {...register("name", {
                                    required: true,
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <label className="label">
                            <span className="label-text">Product Category</span>
                        </label>
                        <select
                            className="select-bordered outline-purple-500"
                            {...register("category", {
                                required: "Selected UserType",
                            })}
                        >
                            <option selected value="PS4">
                                PS4
                            </option>
                            <option value="XBox">Xbox</option>
                            <option value="PC">PC</option>
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Game Name</span>
                        </label>
                        <input
                            required
                            type="text"
                            {...register("GameName")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label required className="label">
                            <span className="label-text"> Original Price</span>
                        </label>
                        <input
                            type="text"
                            {...register("originalPrice")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label required className="label">
                            <span className="label-text">Resale Price</span>
                        </label>
                        <input
                            type="text"
                            {...register("resalePrice")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Mobile number</span>
                        </label>
                        <input
                            required
                            type="text"
                            {...register("number")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                            type="text"
                            {...register("location")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Year of Used</span>
                        </label>
                        <input
                            required
                            type="text"
                            {...register("usedYear")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            required
                            type="file"
                            {...register("photo")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>

                    <div className="form-control w-full max-w-xs mt-3 bordered">
                        <label className="label">
                            <span className="label-text">condition type</span>
                        </label>
                        <select
                            className="bordered"
                            {...register("condition", {
                                required: "Selected UserType",
                            })}
                        >
                            <option selected value="Excellent">
                                Excellent
                            </option>
                            <option selected value="Good">
                                Good
                            </option>
                            <option value="Fair">fair</option>
                        </select>
                        {errors.userType && (
                            <p className="text-red-600 font-semibold">
                                {errors.userType?.message}
                            </p>
                        )}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input
                            type="text"
                            {...register("description")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <input
                        className="btn btn-primary w-full mt-5"
                        value="Add Product"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddProducts;
