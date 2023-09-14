import { useQuery } from "@tanstack/react-query";
import React from "react";
import load from '../../../assets/images/loading.gif';
import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  const url = "http://localhost:5000/productsCategory";
  const { data: categoryArray = [], isLoading } = useQuery({
    queryKey: ["productsCategory"],
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
  // console.log(categoryArray)

  if (isLoading) {
    return <img src={load} alt=''/>;
  }

  return (
    <div className="flex flex-col text-center justify-center mx-2 md:mx-0 ">
      <h2 className=" text-center font-bold text-3xl">
          Category of <span className="text-fuchsia-600">Platform</span>
      </h2>
      <div className="flex justify-center mx-auto mt-2 mb-6 md:mb-16">
        <span className="inline-block w-40 h-1 bg-fuchsia-300 rounded-full"></span>
        <span className="inline-block w-8 h-1 mx-1 bg-fuchsia-200 rounded-full"></span>
        <span className="inline-block w-4 h-1 bg-fuchsia-100 rounded-full"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArray.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
