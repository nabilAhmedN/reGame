import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserValidation';
import load from '../../../assets/images/loading.gif'

const CategoryCard = ({ category }) => {
    const { loader } = useContext(UserContext)

    if (loader) {
        return <img src={load} alt=''/>
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div className="w-full h-64 bg-yellow-200 bg-center bg-cover rounded-lg shadow-md"
                style={{
                    backgroundImage:
                        `url(${category.imageURL})`,
                }}>

            </div>

            <div className="w-56 -mt-10 overflow-hidden bg-[#D0BFFF] rounded-lg shadow-lg md:w-64">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">{category?.categoryName}</h3>

                <div className="flex items-center justify-center px-3 py-2 bg-[#EDE4FF]">
                    <Link to={`/category/products/${category?.categoryName}`}>
                        <button className="btn btn-sm text-xs font-semibold btn-outline btn-primary uppercase transition-colors duration-300 transform bg-base-100 rounded">See All Products</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;