import React from 'react';
import Banner from '../../Banner/Banner';
import Categorization from '../Categorization/Categorization';
import Process from '../Process/Process';
import AdItems from './AdItems/AdItems';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Categorization/>
            <AdItems/>
            <Process/>
        </div>
    );
};

export default Home;