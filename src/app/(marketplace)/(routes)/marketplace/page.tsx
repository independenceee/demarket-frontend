"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./Marketplace.module.scss";
import { ArrowDropdownCircleIcon, SearchIcon } from "@/components/Icons";
import Background from "@/components/Background";
import Title from "@/components/Title";
import NftContainer from "@/components/NftContainer";

const cx = classNames.bind(styles);
type Props = {};

const MarketplacePage = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {/* Background begin */}
                <Background />
                {/* Background end */}

                {/* title-begin */}
                <Title main="HOME" slug="MARKETPLACE" />
                {/* title-end */}
                <section className={cx("content__wrapper")}>
                    {/* left-begin */}
                    <div className={cx("content__left--wrapper")}>
                        <div className={cx("content__left-container")} data-aos="fade-right" data-aos-duration="1000">
                            <section className={cx("content__search")}>
                                <header className={cx("content__search--header")}>Search</header>
                                <article className={cx("content__search--control")}>
                                    <input type="text" placeholder="Search" className={cx("content__search--input")} />
                                    <button className={cx("content__search--btn")}>
                                        <SearchIcon className={cx("content__search--icon")} />
                                    </button>
                                </article>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Category</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                </article>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Sort buy</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Default</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>New</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Trending</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Increment</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Decrement</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                </article>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Verify</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Yes</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>No</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                </article>
                            </section>
                        </div>
                    </div>
                    {/* left-end */}
                    <div className={cx("content__right")} data-aos="fade-left" data-aos-duration="1000">
                        <NftContainer data={[1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 0]} itemsPerPage={12} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MarketplacePage;
