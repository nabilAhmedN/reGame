import React, { useEffect, useState } from "react";
import AllCategorization from "./AllCategorization";

const Categorization = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        fetch("http://localhost:5000/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    },[])

    return (
        <div className="mt-6">
            <h2 className=" text-center font-bold text-2xl">
                Category of <span className="text-fuchsia-600">Platform</span>
            </h2>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-6">
                {categories.map((category) => (
                    <AllCategorization key={category._id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default Categorization;
