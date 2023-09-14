import React from "react";
import ReactPlayer from "react-player";

const HomeVideoBanner = () => {
  return (
    <div className="w-full h-96 lg:h-screen mt-[110px] mb-32 md:mb-60">
      <h2 className=" text-center font-bold text-3xl">
        Gaming <span className="text-fuchsia-600">Action</span>
      </h2>

      <div className="flex justify-center mx-auto mt-2 mb-6 md:mb-16">
        <span className="inline-block w-40 h-1 bg-fuchsia-300 rounded-full"></span>
        <span className="inline-block w-8 h-1 mx-1 bg-fuchsia-200 rounded-full"></span>
        <span className="inline-block w-4 h-1 bg-fuchsia-100 rounded-full"></span>
      </div>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=Gr5H85CxI58"
        playing
        loop
        muted
        autoplay={true}
        className="aspect-auto"
        width="100%"
        height="100%"
      />
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Best Driver's Watch
        </h1>
        <p className="text-base md:text-lg lg:text-xl">
          60 seconds with it, Chase with Ryan Gosling
        </p>
      </div> */}
    </div>
  );
};

export default HomeVideoBanner;
