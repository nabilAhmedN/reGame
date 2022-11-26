import React from 'react';
import { Link } from 'react-router-dom';

const AllCategorization = ({category}) => {
    const { _id, img, title} = category;
    return (
        <Link to={`/category/${_id}`}>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-6 pt-6">
                    <img src={img} alt="" className="rounded-xl" />
                </figure>
                <div className="card-body items-center ">
                    {<Link to={`/category/${_id}`}>
                        <h2 className="card-title">{title}</h2>
                    </Link>
                    
                    }
                    {/* <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div> */}
                </div>
            </div>
        </Link>
    );
};

export default AllCategorization;