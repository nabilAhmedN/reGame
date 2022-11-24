import React from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/images/img-1.jpg";

const Banner = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${banner})`,
            }}
        >
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="">
                    <h1 className="mb-5 text-5xl font-bold text-white">
                        Shutter Up
                    </h1>
                    <p className="mb-5 font-medium text-gray-200">
                        Shutter Up offers a variety of inexpensive bundles with
                        high-quality services that are hard to obtain elsewhere.{" "}
                        <br />
                        Shutter Up provide a broad range of photography and
                        videography services, including wedding, pre/post
                        wedding and so on.
                    </p>
                    <Link to="/login">
                        <button className="btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
