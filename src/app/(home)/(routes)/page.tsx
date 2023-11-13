"use client";

import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import images from "@/assets/images";
import styles from "./Home.module.scss";
import NftContainer from "@/components/NftContainer";
import AccountItemSilder from "@/components/AccountItemSilder";
import { SmartContractType } from "@/types";
import Background from "@/components/Background";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import SmartContractContext from "@/contexts/components/SmartContractContext";

type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    const { listAssetsFromSmartContract, loadingAssetsFromSmartContract } =
        useContext<SmartContractType>(SmartContractContext);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />
                <Title main="HOME" />

                <section className={cx("news__wrapper")}>
                    <SubTitle
                        title="New Items"
                        description="Beginning of the app and website design process, we know it is tempting to dive right into
                            picking fonts."
                    />

                    <article className={cx("news_container")}>
                        <NftContainer data={listAssetsFromSmartContract} loading={loadingAssetsFromSmartContract} />
                    </article>
                </section>
                <section className={cx("trending__wrapper")}>
                    <SubTitle
                        title="Trending Assets"
                        description="Here are the top assets that are currently trending on our exchange, which we evaluate based
                            on the criteria of uniqueness and rarity."
                    />

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
                    <SubTitle
                        title="Selling Items"
                        description="Beginning of the app and website design process, we know it is tempting to dive right into
                        picking fonts."
                    />

                    <article className={cx("news_container")}>
                        <NftContainer data={listAssetsFromSmartContract} />
                    </article>
                </section>
                <section className={cx("account__wrapper")}>
                    <SubTitle title="Top Account" description="Beginning of the app and website design process." />
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
