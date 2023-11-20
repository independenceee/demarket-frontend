"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Guide.module.scss";
import ReactPlayer from "react-player";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import { AddIcon } from "@/components/Icons";

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
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>How to connect your wallet to the DEMARKET platform?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>How can I create an NFT?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>How does smart contract work on DEMARKET?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>A complete guide to sell your NFTs?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                        </section>
                        <section className={cx("guide__inner")}>
                            <header className={cx("guide__header")}>
                                <h3 className={cx("title")}>A complete guide to buy your NFTs?</h3>
                                <span className={cx("icon")}>
                                    <AddIcon />
                                </span>
                            </header>
                        </section>
                    </aside>
                </section>
            </div>
        </main>
    );
};

export default GuidePage;
