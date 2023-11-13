"use client";

import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Marketplace.module.scss";
import { ArrowDropdownCircleIcon, SearchIcon, FillDashCircleFillIcon } from "@/components/Icons";
import Background from "@/components/Background";
import Title from "@/components/Title";
import NftContainer from "@/components/NftContainer";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import DemarketContext from "@/contexts/components/DemarketContext";
import { SmartContractType, DemarketContextType, Category } from "@/types";

const cx = classNames.bind(styles);
type Props = {};

const MarketplacePage = function ({}: Props) {
    const [openCategory, setOpenCategory] = useState<boolean>(false);
    const [openSortBy, setOpenSortBy] = useState<boolean>(false);
    const [openVerify, setOpenVerify] = useState<boolean>(false);
    const { categories } = useContext<DemarketContextType>(DemarketContext);

    const { listAssetsFromSmartContract, loadingAssetsFromSmartContract } =
        useContext<SmartContractType>(SmartContractContext);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />
                <Title main="HOME" slug="MARKETPLACE" />
                <section className={cx("content__wrapper")}>
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

                            <section className={cx("content__filter")} onClick={() => setOpenCategory(!openCategory)}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Category</h3>
                                    {!openCategory ? (
                                        <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                    ) : (
                                        <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                                    )}
                                </header>

                                <article className={cx("content__filter--option")}>
                                    {categories.map(function (category: Category, index: number) {
                                        return (
                                            <section key={index} className={cx("content__filter--group")}>
                                                <h4 className={cx("content__filter--name")}>{category.name}</h4>
                                                <input className={cx("content__filter--control")} type="checkbox" />
                                            </section>
                                        );
                                    })}
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
                    <div className={cx("content__right")} data-aos="fade-left" data-aos-duration="1000">
                        <NftContainer
                            data={listAssetsFromSmartContract}
                            itemsPerPage={12}
                            loading={loadingAssetsFromSmartContract}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MarketplacePage;
