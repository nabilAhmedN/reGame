import React, { useEffect, useState } from "react";

const Categorization = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        fetch("fakedata.json")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    },[])

    return (
        <div>
            <h2>total Categorization {categories.length}</h2>
        </div>
    );
};

export default Categorization;
