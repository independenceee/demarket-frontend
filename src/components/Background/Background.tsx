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
        policyId: "8a5ba3c58a8aafd562f4330a5a87ef84b8bd73dfa7d3da87ea52d66e",
        assetName: "436f6c6f72204769726c",
        title: "Color Girl",
        description:
            "Every curve on Color Girl's body is a flow of positive energy, bringing vibrancy and motivation to the observer.",
        url: "https://ipfs.io/ipfs/QmZw33dHzvmx9uz1rr5FLhugsRe4F3xqtef4ojpMcteNNT",
    },
    {
        policyId: "37f2f90bf92c42b1f1c244581d13b29d66e7a329803e9b727099d8fb",
        assetName: "526f626f74204769726c",
        title: "Robot Girl",
        description:
            "In every movement, there's a sense of mechanical grace, an otherworldly ballet performed with precision.",
        url: "https://ipfs.io/ipfs/QmP5smfeXGucyvEs5QDbsvdKSbYm1KuhZdmDNEHXcrtvHS",
    },
    {
        policyId: "55a241019f91cfa8344760c6309e55a666904e03fcfaec7d8d3dead7",
        assetName: "5374796c65204769726c",
        title: "Style Girl",
        description:
            "With couture confidence, Style Girl wears her individuality like a badge, turning heads with every curated ensemble.",
        url: "https://ipfs.io/ipfs/QmPoZDmtznuzFLhEnMfiNeRGoGXnGQ4XWWyzjpr5sdzv4d",
    },

    {
        policyId: "76ace6d07fe89d100bb9b125dd23b984a59ca38c1ff2f8ba96f004ec",
        assetName: "53706f7274204769726c",
        title: "Sport Girl",
        description:
            "Amidst the sweat and exertion, she exudes endorphin elegance, a portrait of the invigorating joy that comes with a physically active life.",
        url: "https://ipfs.io/ipfs/QmSjdrfbozvaL5FX3qr3pmZbrPdRdkb2G3rpw4KbgBdXt4",
    },
    {
        policyId: "202f25645f5ae1a64dcdd4f952218dcfd93d829f66527bf248fca806",
        assetName: "547261646974696f6e616c204769726c",
        title: "Traditional Girl",
        description:
            " Traditional Girl wears time-honored couture, where each stitch and embellishment narrate a story of cultural pride and timeless fashion.",
        url: "https://ipfs.io/ipfs/QmU8cdX4AWSAiAg5hagnBhyZ3vibM2QYmtJFgCSPCHFHW1",
    },
];
type Props = {};
const Carousel = function ({}: Props) {
    const [background, setBackground] = useState<string>(
        "https://ipfs.io/ipfs/QmU8cdX4AWSAiAg5hagnBhyZ3vibM2QYmtJFgCSPCHFHW1",
    );

    return (
        <div style={{ backgroundImage: `url(${background})` }} className={cx("wrapper")}>
            <div className={cx("carousel")} data-aos="fade-left">
                <div>
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
                                        <Link
                                            href={`/detail/${data.policyId + data.assetName}`}
                                            className={cx("slider-btn")}
                                        >
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
                                    <Link
                                        href={`/detail/${data.policyId + data.assetName}`}
                                        className={cx("slider-btn")}
                                    >
                                        explore
                                    </Link>
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
