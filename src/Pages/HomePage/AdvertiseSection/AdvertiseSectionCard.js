import React from 'react';

const AdvertiseSectionCard = ({advertise}) => {
    const {productImgURL, productName, originalPrice, resalePrice, productUsedFor} = advertise
    return (
        <div className="card w-72 bg-base-100 shadow-xl image-full">
            <figure>
                <img src={productImgURL} alt="" />
            </figure>
            <div className="card-body items-center justify-end">
                <h2 className="card-title text-[#C5DFF8]">
                    {productName}
                </h2>
                <p>Resale Price: ${resalePrice}</p>
                <p>Origal Price: ${originalPrice}</p>
                <p>Range of Used: {productUsedFor} Month </p>
                
            </div>
        </div>
    );
};

export default AdvertiseSectionCard;