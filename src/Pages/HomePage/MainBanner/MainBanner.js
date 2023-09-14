import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../../assets/images/img-1.jpg'

const MainBanner = () => {
    return (
        <div
            className="hero min-h-screen rounded-xl"
            style={{
                backgroundImage: `url(${banner})`,
            }}
        >
            <div className="hero-overlay bg-opacity-50 rounded-xl"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="">
                    <h1 className="mb-5 text-5xl font-bold text-white">
                        ReGame
                    </h1>
                    <p className="mb-5 font-medium text-gray-200">
                        <span className="text-pink-400 text-3xl"> Buy</span>{" "}
                        <span className="text-2xl">Play</span>{" "}
                        <span className="text-pink-400 text-3xl">Sell</span>{" "}
                        <br />
                        <span className="text-2xl">Repate</span>
                    </p>
                    <Link to="/login">
                        <button className="btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;