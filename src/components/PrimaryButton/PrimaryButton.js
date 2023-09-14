import React from 'react';

const PrimaryButton = ({children , classes}) => {
    return (
    <button className={`btn bg-gradient-to-r from-warning to-primary lg:btn-lg text-accent ${classes}`}>
            {children}
        </button>
    );
};

export default PrimaryButton;