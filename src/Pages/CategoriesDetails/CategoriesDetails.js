import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AllCategoriesDetails from '../AllCategoriesDetails/AllCategoriesDetails';
import BookModal from '../AllCategoriesDetails/BookModal/BookModal';

const CategoriesDetails = () => {
    const params = useParams();

    const id = params.id;

    const [category, setCategory] = useState([]);
    const [gameName, setGameName] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/category?service_id=${id}`)
            .then((res) => res.json())
            .then((data) => setCategory(data));
    }, [id])

    return (
        <div>
            <h2>this is category: {category.length}</h2>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-4">
                {category.map((catego) => (
                    <AllCategoriesDetails
                        key={catego._id}
                        catego={catego}
                        setGameName={setGameName}
                    />
                ))}
            </div>
            {
                gameName && 
                <BookModal gameName={gameName} setGameName={setGameName} />
                }
        </div>
    );
};

export default CategoriesDetails;