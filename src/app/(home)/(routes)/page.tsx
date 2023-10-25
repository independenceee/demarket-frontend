import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import styles from "./Home.module.scss";
import images from "@/assets/images";
type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("backgound")}></section>
                {/*  */}
                <section className={cx("news__wrapper")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>New Items</h2>
                        <p className={cx("description")}>
                            Beginning of the app and website design process, we know it’s
                            tempting to dive right into picking fonts.
                        </p>
                    </header>

                    <div className={cx("news__container")}>
                        
                    </div>
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
                            Beginning of the app and website design process, we know it’s
                            tempting to dive right into picking fonts.
                        </p>
                    </header>
                </section>
                <section className={cx("statistics")}>
                    <Statistics />
                </section>
            </div>
        </main>
    );
};

export default Home;
