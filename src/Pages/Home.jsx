import React from 'react';
import Herosection from '../Components/Home/Herosection';
// import Reviews from '../Components/Home/Reviews';
import Intro from '../Components/Home/Intro';
import WhyJoin from '../Components/Home/WhyJoin';
import ClubSphereHowItWorks from '../Components/Home/ClubSphereHowItWorks';
import TrustedByCommunities from '../Components/Home/TrustedByCommunities';
import WhyChooseClubSphere from '../Components/Home/WhyChooseClubSphere';
import ExploreClubs from '../Components/Home/ExploreClubs';
import UpcomingEvents from '../Components/Home/UpcomingEvents';


const Home = () => {
    return (
        <div>
            <Herosection></Herosection>
             
            <Intro></Intro>
            <WhyJoin></WhyJoin>
            <ClubSphereHowItWorks></ClubSphereHowItWorks>

            <TrustedByCommunities></TrustedByCommunities>

            <WhyChooseClubSphere></WhyChooseClubSphere>

            <ExploreClubs></ExploreClubs>

            <UpcomingEvents></UpcomingEvents>

        </div>
    );
};

export default Home;