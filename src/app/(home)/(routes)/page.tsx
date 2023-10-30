"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React, { useContext, useEffect } from "react";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "aos/dist/aos.css";
import Aos from "aos";
import Image from "next/image";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import images from "@/assets/images";
import styles from "./Home.module.scss";
import NftContainer from "@/components/NftContainer";
import TopCollection from "@/components/TopCollection";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types";
type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    const { metadataFromAddress, assetsFromAsset } =
        useContext<LucidContextType>(LucidContext);

    console.log(metadataFromAddress);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("backgound__wrapper")}>
                    <div
                        className={cx("background__content")}
                        data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                    >
                        <h3 className={cx("background__content-title")}>Demarket</h3>
                        <h3 className={cx("background__content-slug")}>
                            Examples For Creating Solid UX Design
                        </h3>
                        <p className={cx("background__content-description")}>
                            The title The Power of the Ballot: Contributing to Democracy
                            captures the essence of the crucial role voting plays in
                            empowering democratic systems. It highlights the significance
                            of individual voices and their impact through the act of
                            casting a ballot. The title combines the political aspect with
                            a profound understanding of the power of democracy,
                            emphasizing the influence citizens hold in shaping the course
                            of their nations through the act of voting.
                        </p>

                        <div className={cx("button__wrapper")}>
                            <button className={cx("button")}>Explore</button>
                            <button className={cx("button")}>Getting Started</button>
                        </div>
                    </div>
                    <div
                        className={cx("background__slider")}
                        data-aos="fade-left"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                    >
                        <Swiper
                            spaceBetween={1}
                            slidesPerView={3}
                            roundLengths={true}
                            initialSlide={2}
                            loopAdditionalSlides={30}
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                pauseOnMouseEnter: true,
                                reverseDirection: true,
                                disableOnInteraction: false,
                            }}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 200,
                                modifier: 3,
                            }}
                            pagination={{ el: ".swiper-pagination", clickable: true }}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                                hideOnClick: true,
                            }}
                            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
                            className={cx("background__slider-container")}
                        >
                            <SwiperSlide className={cx("background__slider-image")}>
                                <Image
                                    className={cx("image")}
                                    src={images.background}
                                    alt="slide_image"
                                />
                            </SwiperSlide>
                            <SwiperSlide className={cx("background__slider-image")}>
                                <Image
                                    className={cx("image")}
                                    src={images.eternlWallet}
                                    alt="slide_image"
                                />
                            </SwiperSlide>
                            <SwiperSlide className={cx("background__slider-image")}>
                                <Image
                                    className={cx("image")}
                                    src={images.flintWallet}
                                    alt="slide_image"
                                />
                            </SwiperSlide>

                            <div className="slider-controler">
                                {/* <div className="swiper-button-prev slider-arrow"></div>
                                <div className="swiper-button-next slider-arrow"></div> */}
                                {/* <div className="swiper-pagination"></div> */}
                            </div>
                        </Swiper>
                    </div>
                </section>
                <section className={cx("title__wrapper")} data-aos="zoom-in">
                    <span className={cx("title__main")}>Home</span>
                </section>
                {/*  */}
                <section className={cx("news__wrapper")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>New Items</h2>
                        <p className={cx("description")}>
                            Beginning of the app and website design process, we know it is
                            tempting to dive right into picking fonts.
                        </p>
                    </header>

                    <NftContainer data={[1]} />
                </section>
                <section className={cx("trending__wrapper")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>Trending Assets</h2>
                        <p className={cx("description")}>
                            Here are the top assets that are currently trending on our
                            exchange, which we evaluate based on the criteria of
                            uniqueness and rarity.
                        </p>
                    </header>

                    <div className={cx("trending__container")}>
                        <section className={cx("slider__wrapper")}>
                            <ul className={cx("slider__list-left")}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value, index) {
                                    return (
                                        <li key={index} className={cx("slider__item")}>
                                            <Image
                                                className={cx("slider__image")}
                                                src={images.background}
                                                alt=""
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                        <section className={cx("slider__wrapper")}>
                            <ul className={cx("slider__list-right")}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value, index) {
                                    return (
                                        <li key={index} className={cx("slider__item")}>
                                            <Image
                                                className={cx("slider__image")}
                                                src={images.background}
                                                alt=""
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    </div>
                </section>
                <section className={cx("selling")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>Selling Item</h2>
                        <p className={cx("description")}>
                            Beginning of the app and website design process, we know it is
                            tempting to dive right into picking fonts.
                        </p>
                    </header>
                    {/* <NftContainer data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} /> */}
                </section>
                <section className={cx("collection")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>TOP COLLECTIONS</h2>
                        <p className={cx("description")}>
                            Beginning of the app and website design process.
                        </p>
                    </header>
                    <div className={cx("content")}>
                        <TopCollection />
                    </div>
                </section>
                <section className={cx("statistics")}>
                    <Statistics />
                </section>
            </div>
        </main>
    );
};

export default Home;
