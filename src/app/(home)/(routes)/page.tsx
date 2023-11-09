"use client";

import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import images from "@/assets/images";
import styles from "./Home.module.scss";
import NftContainer from "@/components/NftContainer";
import AccountItemSilder from "@/components/AccountItemSilder";
import DemarketContext from "@/contexts/components/DemarketContext";
import { DemarketContextType } from "@/types";
import Background from "@/components/Background";

type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    const { listAssetsFromSmartContract } = useContext<DemarketContextType>(DemarketContext);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                {/* background begin */}
                <Background />
                {/* background end */}
                <section className={cx("title__wrapper")} data-aos="zoom-in">
                    <span className={cx("title__main")}>Home</span>
                </section>
                <section className={cx("news__wrapper")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>New Items</h2>
                        <p className={cx("description")}>
                            Beginning of the app and website design process, we know it is tempting to dive right into
                            picking fonts.
                        </p>
                    </header>

                    <article className={cx("news_container")}>
                        <NftContainer data={listAssetsFromSmartContract} />

                        {/* <Pagination /> */}
                    </article>
                </section>
                <section className={cx("trending__wrapper")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>Trending Assets</h2>
                        <p className={cx("description")}>
                            Here are the top assets that are currently trending on our exchange, which we evaluate based
                            on the criteria of uniqueness and rarity.
                        </p>
                    </header>

                    <div className={cx("trending__container")}>
                        <section className={cx("slider__wrapper")}>
                            <ul className={cx("slider__list-left")}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value, index) {
                                    return (
                                        <li key={index} className={cx("slider__item")}>
                                            <Image className={cx("slider__image")} src={images.background} alt="" />
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
                                            <Image className={cx("slider__image")} src={images.background} alt="" />
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    </div>
                </section>
                <section className={cx("news__wrapper")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>SELLING ITEMS</h2>
                        <p className={cx("description")}>
                            Beginning of the app and website design process, we know it is tempting to dive right into
                            picking fonts.
                        </p>
                    </header>

                    <article className={cx("news_container")}>
                        <NftContainer data={listAssetsFromSmartContract} />
                    </article>
                </section>
                <section className={cx("account__wrapper")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>Top Account</h2>
                        <p className={cx("description")}>Beginning of the app and website design process.</p>
                    </header>
                    <article className={cx("account__container")}>
                        <section className={cx("account__list--left")}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(function (account, index) {
                                return <AccountItemSilder avatar="" key={index} />;
                            })}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(function (account, index) {
                                return <AccountItemSilder avatar="" key={index} />;
                            })}
                        </section>
                        <section className={cx("account__list--right")}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(function (account, index) {
                                return <AccountItemSilder avatar="" key={index} />;
                            })}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(function (account, index) {
                                return <AccountItemSilder avatar="" key={index} />;
                            })}
                        </section>
                    </article>
                </section>
                <section className={cx("statistics")}>
                    <Statistics />
                </section>
            </div>
        </main>
    );
};

export default Home;
