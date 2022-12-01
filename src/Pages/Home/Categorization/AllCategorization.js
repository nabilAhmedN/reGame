import React from 'react';
import { Link } from 'react-router-dom';

const AllCategorization = ({category}) => {
    const { img, title} = category;
    return (
        <Link to={`/category/${title}`}>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-6 pt-6">
                    <img src={img} alt="" className="rounded-xl" />
                </figure>
                <div className="card-body items-center ">
                    {<Link to={`/category/${title}`}>
                        <h2 className="card-title">{title}</h2>
                    </Link>
                    
                    }
                </div>
            </div>
        </Link>
    );
};

export default AllCategorization;