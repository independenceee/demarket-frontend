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
import images from "@/assets/images";
import Link from "next/link";
const cx = classNames.bind(styles);
const slider = [
    {
        policyId: "",
        assetName: "",
        title: "Traditional Girl",
        description:
            "Traditional Girl wears time-honored couture, where each stitch and embellishment narrate a story of cultural pride and timeless fashion.",
        url: "https://ipfs.io/ipfs/QmSJ2rUwoFaz3rgVqeRR1x7UqcN4ZSQ4JFHuz1gG1GTx57",
    },
    {
        policyId: "",
        assetName: "",
        title: "Robot Girl",
        description:
            "Amidst the sweat and exertion, she exudes endorphin elegance, a portrait of the invigorating joy that comes with a physically active life.",
        url: "https://ipfs.io/ipfs/QmUuGirnzkGxc6sSXdGJLuBoBzFyiarvDqSC9CVkg6GEM5",
    },
    {
        policyId: "",
        assetName: "",
        title: "Style Girl",
        description:
            "With couture confidence, Style Girl wears her individuality like a badge, turning heads with every curated ensemble.",
        url: "https://ipfs.io/ipfs/QmXc8b37Q6eyN21AkfPJ3ZFr19EYNZfXrtLLEVMsvEfwgs",
    },

    {
        policyId: "",
        assetName: "",
        title: "Donut 4",
        description:
            "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://ipfs.io/ipfs/QmP5smfeXGucyvEs5QDbsvdKSbYm1KuhZdmDNEHXcrtvHS",
    },
    {
        policyId: "",
        assetName: "",
        title: "Donut 5",
        description:
            "Our Donut Collection Offers a Mouthwatering Array of Flavors, Toppings, and Shapes for Every Craving and Occasion.",
        url: "https://ipfs.io/ipfs/QmZw33dHzvmx9uz1rr5FLhugsRe4F3xqtef4ojpMcteNNT",
    },
];
type Props = {};
const Carousel = function ({}: Props) {
    const [background, setBackground] = useState<string>(
        "https://ipfs.io/ipfs/QmZw33dHzvmx9uz1rr5FLhugsRe4F3xqtef4ojpMcteNNT",
    );

    return (
        <div style={{ backgroundImage: `url(${background})` }} className={cx("wrapper")}>
            <div className={cx("carousel")}>
                <div data-aos="fade-left">
                    <div className={cx("carousel-content")}>
                        <span>Discover</span>
                        <h1>Make WEB3 Popular with Humans</h1>
                        <hr />
                        <p>
                            DEMARKET is a decentralized NFT exchange on the Cardano Blockchain platform from BLOCKALPHA.
                        </p>
                        <Link href="/marketplace" className={cx("slider-btn")}>
                            Enter NFT Marketplace
                        </Link>
                    </div>
                </div>

                <Swiper
                    data-aos="fade-right"
                    className={cx("myswiper")}
                    modules={[Pagination, EffectCoverflow, Autoplay]}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 3, slideShadows: true }}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                        1560: { slidesPerView: 3 },
                    }}
                    onSlideChange={(swiper) => {
                        setBackground(slider[swiper.realIndex].url);
                    }}
                >
                    {slider.map(function (data, index: number) {
                        if (data.url === background) {
                            return (
                                <SwiperSlide
                                    key={index}
                                    style={{ backgroundImage: `url(${data.url})` }}
                                    className={cx("myswiper-slider-active")}
                                >
                                    <div>
                                        <h2>{data.title}</h2>
                                        <p>{data.description}</p>
                                        <Link href={`${data.url}`} target="_blank" className={cx("slider-btn")}>
                                            Explore asset
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        }

                        return (
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
                        );
                    })}
                </Swiper>

                <img src={images.logo} alt="bg image" className={cx("bgdonut1")} />
                <img src={images.logo} alt="bg image" className={cx("bgdonut2")} />
            </div>
        </div>
    );
};

export default Carousel;
