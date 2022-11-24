import React from 'react';

const AllCategorization = ({category}) => {
    const { img, title} = category;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-6 pt-6">
                    <img
                        src={img}
                        alt=""
                        className="rounded-xl"
                    />
                </figure>
                <div className="card-body items-center ">
                    <h2 className="card-title">{title}</h2>
                    {/* <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default AllCategorization;