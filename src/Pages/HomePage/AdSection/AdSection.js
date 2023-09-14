import { useQuery } from "@tanstack/react-query";
import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import load from '../../../assets/images/loading.gif';

const AdSection = () => {
  const url = `http://localhost:5000/advertisedProducts`;
  const { data: advertiseArray = [], isLoading } = useQuery({
    queryKey: ["advertisedProducts"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    },
  });
  // console.log(advertiseArray.length)
  if (isLoading) {
    return <img src={load} alt=''/>
  }
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const slider = (
    <>
      <AutoplaySlider
        className="h-96"
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={6000}
      >
        {advertiseArray.map((add, i) => (
          <div key={i} data-src={add.productImgURL} />
        ))}
      </AutoplaySlider>
    </>
  );
  return (
    advertiseArray.length > 0 && (
      <div className="flex flex-col text-center justify-center mx-2 md:mx-0">
        <h2 className=" text-center font-bold text-3xl">
          Pick the <span className="text-fuchsia-600">Hit</span> Games
      </h2>
        <div className="flex justify-center mx-auto mt-4 mb-12">
          <span className="inline-block w-40 h-1 bg-fuchsia-300 rounded-full"></span>
          <span className="inline-block w-8 h-1 mx-1 bg-fuchsia-200 rounded-full"></span>
          <span className="inline-block w-4 h-1 bg-fuchsia-100 rounded-full"></span>
        </div>
        <div>{slider}</div>
      </div>  
    )
  );
};

export default AdSection;
