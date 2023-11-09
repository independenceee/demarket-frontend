"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Marketplace.module.scss";
import { ArrowDropdownCircleIcon, SearchIcon } from "@/components/Icons";
import Background from "@/components/Background";

const cx = classNames.bind(styles);
type Props = {};

const MarketplacePage = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {/* Background begin */}
                <Background />
                {/* Background end */}

                <section className={cx("title__wrapper")}>
                    <span className={cx("title__main")}>Home</span>
                    <span className={cx("title__middle")}></span>
                    <span className={cx("title__slug")}>Marketplace</span>
                </section>
                <section className={cx("content__wrapper")}>
                    <div className={cx("content__left")}>
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
                    <div className={cx("content__right")}>
                        {/* <NftContainer data={listAssetsFromSmartContract} itemsPerPage={12} /> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MarketplacePage;
