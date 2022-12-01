import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AllCategoriesDetails from '../AllCategoriesDetails/AllCategoriesDetails';
import BookModal from '../AllCategoriesDetails/BookModal/BookModal';

const CategoriesDetails = () => {
    const params = useParams();

    const id = params.id;

    // const [category, setCategory] = useState([]);
    const [gameName, setGameName] = useState(null);

    const { data: category = [], refetch } = useQuery({
        queryKey: ["allrole", id],
        queryFn: async () => {
            const res = await fetch(
                `http://localhost:5000/category?title=${id}`
            );
            const data = await res.json();
            return data;
        },
    });

    return (
        <div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-4">
                {category.map((catego) => (
                    <AllCategoriesDetails
                        key={catego._id}
                        catego={catego}
                        setGameName={setGameName}
                        refetch={refetch}
                    />
                ))}
            </div>
            {gameName && (
                <BookModal gameName={gameName} setGameName={setGameName} />
            )}
        </div>
    );
};

export default CategoriesDetails;