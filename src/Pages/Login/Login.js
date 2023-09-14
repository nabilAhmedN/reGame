import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../Hook/useTitle';
import useToken from '../../Hook/useToken';
import { UserContext } from '../../context/UserValidation';


const Login = () => {
    useTitle("Login Page")
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { signIn, loginProvider, setLoader, forgetPassLinkToEmail } = useContext(UserContext)
    const [loginError, setLoginError] = useState('');

    // User Email state for forget password
    const [userEmailForgetPass, setUserEmailForgetPass] = useState('');

    // User Email after user logged in
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    // navigate for after login user will be route into home
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true })
        }
    }, [token])
    // Google Login Handle
    const googleLoginProvider = new GoogleAuthProvider();
    const googleHandle = event => {
        event.preventDefault();
        loginProvider(googleLoginProvider)
            .then(res => {
                setLoader(false)
                const user = res.user
                // console.log(user)
                const userData = {
                    name: user?.displayName,
                    email: user?.email,
                    imageURL: user?.photoURL,
                    role: 'Buyer'
                }
                saveGoogleUserData(userData)
            })
            .catch(error => {
                toast.error(`${error.message}`)
                console.error(error.message);
                setLoginError(error.message);
            })
    }
    // Save Google User Data
    const saveGoogleUserData = (userData) => {
        fetch('http://localhost:5000/users', {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Successfully Logged in!')
                    setLoginUserEmail(userData?.email)
                }
            })
            .catch(error => console.error(error))
    }

    // Registered User login handle
    const handleLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                setLoginUserEmail(user?.email)
                setLoginError('')
                reset();
                toast.success('Successfully Logged in!')
            })
            .catch(error => {
                toast.error(`${error.message}`)
                console.error(error.message);
                setLoginError(error.message);
            })
    }

    // Forget Password handle
    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmailForgetPass(email);
    }
    const passwordReset = event => {
        if (!userEmailForgetPass) {
            toast.error('Please provide an email.')
            return;
        }
        forgetPassLinkToEmail(userEmailForgetPass)
            .then(() => {
                toast.success('Reset link sent. Please check your email.')
                setLoginError('')
            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoginError(errorMessage)
            });
    }

    return (
        <div className='container mx-auto'>
            <div className="w-full max-h-auto d-block min-h-screen p-4 flex items-center justify-center" >
                <div className="bg-base-100 py-6 px-10 sm:max-w-md w-full ">
                    <div className="text-2xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-warning to-primary pb-12">
                        Login to reGame
                    </div>
                    <form onSubmit={handleSubmit(handleLogin)} >
                        <div className='my-6'>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" onBlur={handleEmailBlur}
                                {...register("email", { required: "Your email is required." })}
                                className="focus:outline-none border w-full p-2 border-amber-500 placeholder-orange-200" placeholder="info@timecraft.com" />
                            {errors.email && <p className='text-error my-2'>{errors.email.message}</p>}
                        </div>
                        <div className="my-6">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })}
                                className="focus:outline-none border w-full p-2 border-amber-500 placeholder-orange-200"
                                placeholder="********" />
                            <label className="label">
                                <button onClick={passwordReset}
                                    className="label-text text-xs hover:underline hover:underline-offset-1">Forgot Password</button>
                            </label>
                            {errors.password && <p className='text-error my-2'>{errors.password.message}</p>}
                        </div>
                        {errors.accepted && <p className='text-error my-2'>{errors.accepted.message}</p>}
                        <div className="flex justify-center my-6">
                            <input className="btn btn-outline rounded-full w-full sm:w-56 text-lg font-semibold "
                                type="submit" value="Login"
                            />
                        </div>
                        {
                            loginError && <p className='text-center text-error my-2'>{loginError}</p>
                        }
                        <div className="flex justify-center ">
                            <p className="text-gray-500">Don't have an account? </p>
                            <Link to={'/register'} className="hover:text-warning hover:underline hover:underline-offset-2 pl-2">Register</Link>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="flex justify-center my-6">
                        <button onClick={googleHandle}
                            className="flex flex-row btn btn-outline rounded-full gap-4 text-sm md:text-lg">
                            <span>Login With Google</span> <FaGoogle></FaGoogle>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;