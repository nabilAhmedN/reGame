import React, { useContext } from 'react';
import useTitle from '../../../Hook/useTitle';
import ClockLoader from "react-spinners/ClockLoader";

const DashboardPanel = () => {
    useTitle("Dashboard")
    
    return (
        <div className='flex flex-col justify-center my-auto text-center'>
            <div className='flex justify-center content-center'>
                <ClockLoader color="#f59e0b"></ClockLoader>
            </div>
            <h2 className='text-3xl md:text-6xl pt-6 my-3'>Welcome in Dashboard</h2>
        </div>
    );
};

export default DashboardPanel;