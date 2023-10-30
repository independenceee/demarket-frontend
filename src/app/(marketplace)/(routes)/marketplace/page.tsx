"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Marketplace.module.scss";
import NftContainer from "@/components/NftContainer";
import { ArrowDropdownCircleIcon, SearchIcon } from "@/components/Icons";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import images from "@/assets/images";
import NftItem from "@/components/NftItem";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types";

const cx = classNames.bind(styles);
type Props = {};

const MarketplacePage = function ({}: Props) {
    const { buyAssetService, burnNft, sellAssetService, lucid } =
        useContext<LucidContextType>(LucidContext);
    const handleBuyNft = async function () {
        try {
            if (lucid) {
                const txHash = await buyAssetService({
                    lucid: lucid,
                    policyId: "1839a168026b184f697353ada4bb891ebd81e272522364444eff0801",
                    assetName: "4d657368546f6b656e",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSellNft = async function () {
        try {
            if (lucid) {
                const txHash = await sellAssetService({
                    policyId: "1839a168026b184f697353ada4bb891ebd81e272522364444eff0801",
                    assetName: "4d657368546f6b656e",
                    author: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
                    lucid: lucid,
                    price: BigInt(100000),
                    royalties: BigInt(100000),
                    seller: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBurnNft = async function () {
        try {
            if (lucid) {
                const txHash = await buyAssetService({
                    policyId: "a93f1620fc8bcdb4121cb6d589f6e178d77b747e21aeb1020cffb479",
                    lucid: lucid,
                    assetName: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx("wrapper")}>
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
                                <NftItem value={[]} index={1} />
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
                <section className={cx("title__wrapper")}>
                    <span className={cx("title__main")}>Home</span>
                    <span className={cx("title__middle")}></span>
                    <span className={cx("title__slug")}>Marketplace</span>
                </section>
                <section className={cx("content__wrapper")}>
                    <div className={cx("content__left")}>
                        <section className={cx("content__search")}>
                            <header className={cx("content__search--header")}>
                                Search
                            </header>
                            <article className={cx("content__search--control")}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className={cx("content__search--input")}
                                />
                                <button className={cx("content__search--btn")}>
                                    <SearchIcon className={cx("content__search--icon")} />
                                </button>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Category</h3>
                                <ArrowDropdownCircleIcon
                                    className={cx("content__filter--icon")}
                                />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Sort buy</h3>
                                <ArrowDropdownCircleIcon
                                    className={cx("content__filter--icon")}
                                />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        Default
                                    </h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>New</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        Trending
                                    </h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        Increment
                                    </h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        Decrement
                                    </h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Verify</h3>
                                <ArrowDropdownCircleIcon
                                    className={cx("content__filter--icon")}
                                />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>Yes</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>No</h4>
                                    <input
                                        className={cx("content__filter--control")}
                                        type="checkbox"
                                    />
                                </section>
                            </article>
                        </section>
                    </div>
                    <div className={cx("content__right")}>
                        <NftContainer
                            data={[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13]}
                            itemsPerPage={12}
                        />
                    </div>
                </section>
            </div>

            <button onClick={handleBuyNft}>Buy</button>
            <button onClick={handleSellNft}>Sell</button>
            <button onClick={handleBurnNft}>Burn</button>
        </div>
    );
};

export default MarketplacePage;
