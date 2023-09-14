import React from 'react';
import useTitle from '../../../Hook/useTitle';
import loadingCat from '../../../assets/images/loadCat1.gif'

const DashboardPanel = () => {
    useTitle("Dashboard")
    
    return (
        <div className='flex flex-col justify-center my-32 text-center'>
            <div className='flex justify-center content-center'>
                <img className='w-36' src={loadingCat} alt=''/>
            </div>
            <h2 className='text-3xl md:text-6xl '>Welcome in Dashboard</h2>
        </div>
    );
};

export default DashboardPanel;