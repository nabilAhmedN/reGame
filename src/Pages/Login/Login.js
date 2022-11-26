import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Logimg from "../../assets/images/logimg.png";
// import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";

const Login = () => {
    // const { login, googleProviderLogin} = useContext(AuthContext);

    // const googleProvider = new GoogleAuthProvider();

    // const handleGoogleSignIn = () => {
    //     googleProviderLogin(googleProvider)
    //         .then((result) => {
    //             const user = result.user;
    //             console.log(user);
    //             // navigate(from, { replace: true });
    //         })
    //         .catch((error) => console.error(error));
    // };

    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const email = form.email.value;
    //     const password = form.password.value;

    //     login(email, password)
    //         .then((result) => {
    //             const user = result.user;
    //             console.log(user);
    //             form.reset();
    //             // setError("");
    //             // navigate(from, { replace: true });
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             // setError(error.message);
    //         });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { signIn, googleLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");
    const googleProvider = new GoogleAuthProvider();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data) => {
        console.log(data);
        setLoginError("");
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
                setLoginError(error.message);
            });
    };
    const handleGoogle = () => {
        googleLogin(googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch((error) => console.log(error));
    };

    return (
        // <div className="hero w-full my-20">
        //     <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        //         <div className="text-center lg:text-left">
        //             <img
        //                 className="mx-auto w-3/4 rounded-lg"
        //                 src={Logimg}
        //                 alt=""
        //             />
        //         </div>
        //         <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
        //             <h1 className="text-5xl text-center font-bold">Login</h1>
        //             <form onSubmit={handleLogin} className="card-body">
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text">Email</span>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         name="email"
        //                         placeholder="email"
        //                         className="input input-bordered"
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
        //                     />
        //                 </div>
        //                 <div className="form-control mt-6">
        //                     <input
        //                         className="btn btn-primary"
        //                         type="submit"
        //                         value="Login"
        //                     />
        //                 </div>
        //             </form>
        //             {/* <div className="text-red-600 text-center">{error}</div> */}
        //             <p className="text-center">
        //                 New to this website? Please
        //                 <Link
        //                     className="text-fuchsia-500 font-bold"
        //                     to="/signup"
        //                 >
        //                     Sign Up
        //                 </Link>
        //             </p>
        //             <p className="text-center pt-3 divider">OR</p>
        //             <div className="text-center pt-3">
        //                 <button
        //                     onClick={handleGoogleSignIn}
        //                     className="btn btn-wide btn-outline btn-primary"
        //                 >
        //                     <FaGoogle />
        //                     <span className="ml-3 ">Login with Google</span>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="h-[500px] flex justify-center items-center">
            <div className="w-96 p-7">
                <h1 className="text-4xl text-center font-bold">Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="input input-bordered w-full max-w-xs"
                        />
                        {errors.email && (
                            <p className="text-red-600 font-semibold">
                                {errors.email?.message}
                            </p>
                        )}
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
                            <option value="">Select User Type</option>
                            <option value="Buyer">Buyer</option>
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
                    <div>
                        {loginError && (
                            <p className="text-red-600">{loginError}</p>
                        )}
                    </div>
                </form>
                <p>
                    New to Phone Resale?{" "}
                    <Link className="text-green-400" to="/signup">
                        Create an Account
                    </Link>
                </p>
                <div className="divider">OR</div>
                <button
                    onClick={handleGoogle}
                    className="btn btn-outline w-full"
                >
                    CONTINUE WITH GOOGLE
                </button>
            </div>
        </div>
    );
};

export default Login;
