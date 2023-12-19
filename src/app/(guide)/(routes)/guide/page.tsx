"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./Guide.module.scss";
import ReactPlayer from "react-player";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import { AddIcon } from "@/components/Icons";
import {
    buyGuides,
    createGuides,
    guideConnectWallet,
    guideGetStarteds,
    sellGuides,
    smartContractGuides,
} from "@/data/guides";
import GuideItem from "@/components/GuideItem";
type Props = {};

const cx = classNames.bind(styles);

const GuidePage = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")} data-aos="fade-down">
                <section className={cx("background__wrapper")}>
                    <div className={cx("background__container")} data-aos="fade-down">
                        <h2 className={cx("background__title")}>Guide Center</h2>
                        <p className={cx("background__description")}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae
                            quo ad iste ipsum officiis deleniti asperiores sit.
                        </p>
                    </div>
                </section>
                <Title main="HOME" slug="GUIDE" />
                <SubTitle
                    title="How can I help You?"
                    description="You dont Know how to use feature of pladform. Let me give you some Manual document."
                />
                <section className={cx("guide__wrapper")}>
                    <aside className={cx("guide__container")}>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>How to get started in DEMARKET?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                            <aside className={cx("guide__content")}>
                                <section className="guide__video">
                                    <ReactPlayer
                                        controls
                                        width={"100%"}
                                        url={"https://www.youtube.com/watch?v=9qJmCOXk028"}
                                    />
                                </section>
                                <h2>
                                    DEMARKET is developed based on Cardano, an ecosystem with a series of outstanding
                                    advantages compared to other Blockchain platforms, helping users to be assured of
                                    security, personal information will never be compromised. violations, costs incurred
                                    are less expensive,…
                                </h2>
                                <div>
                                    {guideGetStarteds.map(function (
                                        { id, description, title, description2, bonus },
                                        index,
                                    ) {
                                        return (
                                            <GuideItem
                                                key={index}
                                                id={id}
                                                title={title}
                                                description={description}
                                                description2={description2}
                                                bonus={bonus}
                                            />
                                        );
                                    })}
                                </div>
                            </aside>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>How to connect your wallet to the DEMARKET platform?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                            <aside className={cx("guide__content")}>
                                <section className="guide__video">
                                    <ReactPlayer
                                        controls
                                        width={"100%"}
                                        url={"https://www.youtube.com/watch?v=9qJmCOXk028"}
                                    />
                                </section>
                                <h2>
                                    To buy, mint or manage NFTs on DEMARKET, you&apos;ll first need to connect your
                                    wallet. You can do so in just a few easy steps!
                                </h2>
                                <div>
                                    {guideConnectWallet.map(function (
                                        { id, description, title, description2, bonus },
                                        index,
                                    ) {
                                        return (
                                            <GuideItem
                                                key={index}
                                                id={id}
                                                title={title}
                                                description={description}
                                                description2={description2}
                                                bonus={bonus}
                                            />
                                        );
                                    })}
                                </div>
                            </aside>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>How can I create an NFT?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                            <aside className={cx("guide__content")}>
                                <section className="guide__video">
                                    <ReactPlayer
                                        controls
                                        width={"100%"}
                                        url={"https://www.youtube.com/watch?v=9qJmCOXk028"}
                                    />
                                </section>
                                <h2>
                                    Minting an NFT on DEMARKET is a straightforward process. Follow these detailed steps
                                    to create and list your NFT on the platform:
                                </h2>

                                <div>
                                    {createGuides.map(function (
                                        { id, description, title, description2, bonus },
                                        index,
                                    ) {
                                        return (
                                            <GuideItem
                                                key={index}
                                                id={id}
                                                title={title}
                                                description={description}
                                                description2={description2}
                                                bonus={bonus}
                                            />
                                        );
                                    })}
                                </div>
                            </aside>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>How does smart contract work on DEMARKET?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                            <aside className={cx("guide__content")}>
                                <section className="guide__video">
                                    <ReactPlayer width={"100%"} url={"https://www.youtube.com/watch?v=9qJmCOXk028"} />
                                </section>
                                <h2>
                                    Smart contracts are executed on blockchain, which means that the terms are stored in
                                    a distributed database and cannot be changed. Transactions are also processed on the
                                    blockchain, which automates payments and counterparties.
                                </h2>

                                <div>
                                    {smartContractGuides.map(function ({ id, title, description, bonus }: any, index) {
                                        return (
                                            <GuideItem
                                                key={index}
                                                id={id}
                                                title={title}
                                                description={description}
                                                bonus={bonus}
                                            />
                                        );
                                    })}
                                </div>
                            </aside>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>A complete guide to sell your NFTs?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                            <aside className={cx("guide__content")}>
                                <section className="guide__video">
                                    <ReactPlayer width={"100%"} url={"https://www.youtube.com/watch?v=9qJmCOXk028"} />
                                </section>
                                <h2>Selling an NFT on Demarket</h2>
                                <div>
                                    {sellGuides.map(function ({ id, title, description, bonus }: any, index) {
                                        return (
                                            <GuideItem
                                                key={index}
                                                id={id}
                                                title={title}
                                                description={description}
                                                bonus={bonus}
                                            />
                                        );
                                    })}
                                </div>
                            </aside>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>A complete guide to buy your NFTs?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                            <aside className={cx("guide__content")}>
                                <section className="guide__video">
                                    <ReactPlayer
                                        controls
                                        width={"100%"}
                                        url={"https://www.youtube.com/watch?v=9qJmCOXk028"}
                                    />
                                </section>
                                <h2>Buying an NFT on Demarket</h2>
                                <div>
                                    {buyGuides.map(function ({ id, title, description }, index) {
                                        return (
                                            <GuideItem key={index} id={id} title={title} description={description} />
                                        );
                                    })}
                                </div>
                            </aside>
                        </section>
                    </aside>
                </section>
            </div>
        </main>
    );
};

export default GuidePage;
