import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoriesDetails = () => {
    const params = useParams();

    const id = params.id;

    const [category, setCategory] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/category?service_id=${id}`)
            .then((res) => res.json())
            .then((data) => setCategory(data));
    }, [id])

    return (
        <div>
            <h2>this is category: {category.length}</h2>
            {
                category.map(catego => catego.title)
            }
        </div>
    );
};

export default CategoriesDetails;