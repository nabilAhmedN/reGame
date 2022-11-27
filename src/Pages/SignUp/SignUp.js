import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import Signimg from "../../assets/images/Signimg.png";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
    // const [error, setError] = useState("");

    // const { createUser, updateUserProfile, loading } = useContext(AuthContext);
    // const handleSignUp = (event) => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;

    //     createUser(email, password)
    //         .then((result) => {
    //             const user = result.user;
    //             console.log(user);
    //             form.reset();
    //             setError("");
    //             handleupdateUserProfile(name);
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             setError(err.message);
    //         });
    // };

    // const handleupdateUserProfile = (name) => {
    //     const profile = {
    //         displayName: name
    //     };
    //     updateUserProfile(profile)
    //         .then(() => {})
    //         .catch((error) => console.error(error));
    // };
    //  if (loading) {
    //     //  return <img className="mx-auto d-block" src={load} alt="" />;
    //  }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState("");
    const [createdUserEmail, setCreatedUserEmail] = useState("");
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    if(token){
        navigate('/')
    }

    const handleSignUp = (data) => {
        setSignUpError("");
        createUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    displayName: data.name,
                };
                updateUser(userInfo)
                    .then(() => {
                        // navigate("/");
                    })
                    .catch((err) => console.log(err));
            })
            .catch((error) => {
                console.log(error);
                setSignUpError(error.message);
            });
        const name = data.name;
        const email = data.email;
        const role = data.userType;
        const signupUser = {
            name,
            email,
            role,
        };
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(signupUser),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.acknowledged) {
                    setCreatedUserEmail(email)
                    toast.success("Signup Successfully");
                }
            });
    };

    return (
        // <div className="hero w-full my-20">
        //     <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        //         <div className="text-center lg:text-left">
        //             <img
        //                 className="
        //             mx-auto
        //             w-3/4
        //             "
        //                 src={Signimg}
        //                 alt=""
        //             />
        //         </div>
        //         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
        //             <h1 className="text-5xl text-center font-bold">Sign Up</h1>
        //             <form onSubmit={handleSignUp} className="card-body">
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">Name</span>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         name="name"
        //                         placeholder="Your Name"
        //                         className="input input-bordered"
        //                     />
        //                 </div>
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">Email</span>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         name="email"
        //                         placeholder="email"
        //                         className="input input-bordered"
        //                         required
        //                     />
        //                 </div>
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">Password</span>
        //                     </label>
        //                     <input
        //                         type="password"
        //                         name="password"
        //                         placeholder="password"
        //                         className="input input-bordered"
        //                         required
        //                     />
        //                 </div>
        //                 <div className="form-control mt-6">
        //                     <input
        //                         className="btn btn-primary"
        //                         type="submit"
        //                         value="Sign Up"
        //                     />
        //                 </div>
        //             </form>
        //             <div className="text-red-600 text-center">{error}</div>
        //             <p className="text-center">
        //                 Already have an account?
        //                 <Link
        //                     className="text-fuchsia-500 font-bold"
        //                     to="/login"
        //                 >
        //                     Login
        //                 </Link>
        //             </p>
        //         </div>
        //     </div>
        // </div>

        <div className="h-[500px] flex justify-center items-center">
            <div className="w-96 p-7">
                <h1 className="text-4xl text-center font-bold">Sign Up</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: true,
                            })}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be 6 charecter or more",
                                },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                    message: "password must be strong",
                                },
                            })}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {errors.password && (
                            <p className="text-red-600 font-semibold">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>

                    <div className="form-control w-full max-w-xs mt-3 bordered">
                        <select
                            className="bordered"
                            {...register("userType", {
                                required: "Selected UserType",
                            })}
                        >
                            <option selected value="Buyer">
                                Buyer
                            </option>
                            <option value="Seller">Seller</option>
                        </select>
                        {errors.userType && (
                            <p className="text-red-600 font-semibold">
                                {errors.userType?.message}
                            </p>
                        )}
                    </div>
                    <input
                        className="btn btn-primary w-full mt-5"
                        value="Login"
                        type="submit"
                    />
                    {signUpError && (
                        <p className="text-red-600">{signUpError}</p>
                    )}
                </form>
                <p>
                    Already have an account?{" "}
                    <Link className="text-green-400" to="/login">
                        Please Login
                    </Link>
                </p>
                {/* <div className="divider">OR</div>
                <button className="btn btn-outline w-full">
                    CONTINUE WITH GOOGLE
                </button> */}
            </div>
        </div>
    );
};

export default SignUp;
