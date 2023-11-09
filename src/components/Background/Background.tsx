"use client";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import classNames from "classnames/bind";
import styles from "./Background.module.scss";
const cx = classNames.bind(styles);
const slider = [
    {
        title: "Donut 1",
        description:
            "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
        title: "Donut 2",
        description:
            "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
        title: "Donut 3",
        description:
            "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.unsplash.com/photo-1646615077267-97c6088b74d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=415&q=80",
    },

    {
        title: "Donut 4",
        description:
            "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.unsplash.com/photo-1631397833242-fc6213046352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
    {
        title: "Donut 5",
        description:
            "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://images.unsplash.com/photo-1533137138-ba67dc90d752?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
];
type Props = {};
const Carousel = function ({}: Props) {
    const [background, setBackground] = useState<string>(
        "https://images.unsplash.com/photo-1533137138-ba67dc90d752?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    );

    return (
        <div style={{ backgroundImage: `url(${background})` }} className={cx("wrapper")}>
            <div className={cx("carousel")}>
                <div data-aos="fade-left">
                    <div className={cx("carousel-content")}>
                        <span>discover</span>
                        <h1>Sweet Donut Heaven</h1>
                        <hr />
                        <p>
                            Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every
                            Craving and Occasion.
                        </p>
                        <a href="#" className={cx("slider-btn")}>
                            download app
                        </a>
                    </div>
                </div>

                <Swiper
                    data-aos="fade-right"
                    className={cx("myswiper")}
                    modules={[Pagination, EffectCoverflow, Autoplay]}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 3,
                        slideShadows: true,
                    }}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 1,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        1560: {
                            slidesPerView: 3,
                        },
                    }}
                    onSlideChange={(swiper) => {
                        setBackground(slider[swiper.realIndex].url);
                    }}
                >
                    {slider.map((data, index: number) => (
                        <SwiperSlide
                            key={index}
                            style={{ backgroundImage: `url(${data.url})` }}
                            className={cx("myswiper-slider")}
                        >
                            <div>
                                <h2>{data.title}</h2>
                                <p>{data.description}</p>
                                <a href={`${data.url}`} target="_blank" className={cx("slider-btn")}>
                                    explore
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <img src={require("../../assets/images/logo.jpg")} alt="bg image" className={cx("bgdonut1")} />
                <img src={require("../../assets/images/logo.jpg")} alt="bg image" className={cx("bgdonut2")} />
            </div>
        </div>
    );
};

export default Carousel;
