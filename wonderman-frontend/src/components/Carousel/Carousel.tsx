import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import axios from "axios";
import {headers, imgUrl} from "../../axios/commons";
import {Slide} from "../../models/Slide";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Spinner from "../Spinner/Spinner";

const Carousel = () => {
    const [wait, setWait] = useState(true);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        axios.get("/slides", {headers: headers()})
            .then(res => {
                setSlides(res.data);
                setWait(false);
            });
    }, []);

    return (
        <div>

            <Spinner show={wait} customStyle={false}/>

            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                className={wait ? "hide" : ""}
                pagination={{clickable: true}}
                navigation={true}
                loop={true}
                centeredSlides={true}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
            >

                {slides.map((slide: Slide) => {
                    return (

                        <SwiperSlide key={slide.id}>

                            <img src={imgUrl(slide.image)} alt={"Slide."}/>

                            <div className="rectangle">
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                            </div>
                        </SwiperSlide>

                    );
                })}

            </Swiper>
        </div>
    );
}

export default Carousel;