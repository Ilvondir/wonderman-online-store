import React from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import Carousel from "../../components/Carousel/Carousel";

const Home = () => {
    return (
        <Wrapper>
            <div className="home-page">
                <Carousel/>

            </div>
        </Wrapper>
    );
};

export default Home;