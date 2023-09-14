import React from 'react';
import ClockLoader from "react-spinners/ClockLoader";

const SpinnerPrimary = () => {

    return (
        <div className='flex justify-center content-center min-h-screen items-center'>
            <ClockLoader color="#f59e0b"></ClockLoader>
        </div>
    );
};

export default SpinnerPrimary;