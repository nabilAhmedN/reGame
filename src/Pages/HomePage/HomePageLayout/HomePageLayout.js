import React from 'react';

import useTitle from '../../../Hook/useTitle';
import CategorySection from '../CategorySection/CategorySection';
import MainBanner from '../MainBanner/MainBanner';
import HomeVideoBanner from '../VideoBanner/HomeVideoBanner';
import AdvertiseSection from '../AdvertiseSection/AdvertiseSection';

const HomePageLayout = () => {
    useTitle("ReGame Home")
    return (
        <div className='container mx-auto'>
            <MainBanner></MainBanner>
            <HomeVideoBanner></HomeVideoBanner>
            <CategorySection></CategorySection>
            <AdvertiseSection/>
        </div>
    );
};

export default HomePageLayout;