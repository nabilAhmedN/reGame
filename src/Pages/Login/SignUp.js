import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../../Hook/useTitle';
import useToken from '../../Hook/useToken';
import { UserContext } from '../../context/UserValidation';

const SignUp = () => {
    useTitle("Sign up")
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createNewUser, updateUser, setLoader } = useContext(UserContext);
    const [authError, setAuthError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleRegister = data => {
        // console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    // console.log(imageData.data.url)
                    const name = data?.name;
                    const email = data?.email;
                    const password = data?.password;
                    const imageURL = imageData?.data?.url;
                    const role = data?.role;
                    createNewUser(email, password)
                        .then(result => {
                            const user = result?.user;
                            // console.log(user)
                            const displayName = data?.name;
                            const photoURL = imageURL;
                            const userInfo = {
                                displayName,
                                photoURL
                            }
                            updateUser(userInfo)
                                .then(() => {
                                    const userData = { name, email, imageURL, role }
                                    saveUserData(userData)
                                    setLoader(false)
                                    reset()
                                })
                                .catch(err => console.error(err))
                        })
                        .catch(err => {
                            console.error(err);
                            setAuthError(err?.message);
                        })
                }
                console.log(authError)
            })
            .catch(err => console.error(err))
    }

    const saveUserData = (userData) => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    toast.success("Account created successfully!");
                    setCreatedUserEmail(userData?.email)
                }
            })
            .catch(error => console.error(error))
    }


    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token])
    return (
        <div className='container mx-auto'>
            <div className="w-full max-h-auto d-block min-h-screen p-4 flex items-center justify-center" >
                <div className="bg-base-100 py-6 px-10 sm:max-w-md w-full ">
                    <div className="text-2xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500 pb-12">
                        Registration Form
                    </div>
                    <form onSubmit={handleSubmit(handleRegister)} >
                        <div>
                            <input type="text" {...register("name", { required: "Your full name is required." })}
                                className="focus:outline-none border w-full p-2 border-[#D0BFFF] placeholder-[#b9abdf]" placeholder="Full Name *"
                            />
                            {errors.name && <p className='text-error my-2'>{errors.name.message}</p>}
                        </div>
                        <div className='mt-4'>
                            <label>Upload a profile photo*</label>
                            <input type="file" {...register("image", { required: "Your photo is required." })}
                                className="focus:outline-none border w-full p-2 border-[#D0BFFF] placeholder-[#b9abdf] mt-2" />
                            {errors.image && <p className='text-error my-2'>{errors.image.message}</p>}
                        </div>
                        <div className='my-6'>
                            <label>Select your purpose*</label>
                            <select {...register("role", { required: "Select your purpose." })}
                                className="focus:outline-none border w-full p-2 border-[#D0BFFF] placeholder-[#b9abdf] mt-2"
                                required
                            >
                                <option selected value={'Buyer'}>Buyer</option>
                                <option value={'Seller'}>Seller</option>
                            </select>
                        </div>
                        <div className='my-6'>
                            <input type="text" {...register("email", { required: "Your email is required." })}
                                className="focus:outline-none border w-full p-2 border-[#D0BFFF] placeholder-[#b9abdf]" placeholder="Your Email" />
                            {errors.email && <p className='text-error my-2'>{errors.email.message}</p>}
                        </div>
                        <div className="my-6">
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })}
                                className="focus:outline-none border w-full p-2 border-[#D0BFFF] placeholder-[#b9abdf]" placeholder="********" />
                            {errors.password && <p className='text-error my-2'>{errors.password.message}</p>}
                        </div>
                        <div className="flex">
                            <input type="checkbox"
                                {...register("accepted", { required: "Please check the terms & conditions." })}
                                className="border-[#D0BFFF] " value="" />
                            <div className="px-3 text-gray-500">
                                I accept terms & conditions
                            </div>
                        </div>
                        {errors.accepted && <p className='text-error my-2'>{errors.accepted.message}</p>}
                        <div className="flex justify-center my-6">
                            <input className="btn btn-outline rounded-full w-full sm:w-56 text-lg font-semibold "
                                type="submit" value="CREATE ACCOUNT"
                            />
                        </div>
                        {
                            authError && <p className='text-center text-error my-2'>{authError}</p>
                        }
                        <div className="flex justify-center ">
                            <p className="text-gray-500">Already have an account? </p>
                            <Link to={'/login'} className="hover:text-primary hover:underline hover:underline-offset-2 pl-2">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default SignUp;