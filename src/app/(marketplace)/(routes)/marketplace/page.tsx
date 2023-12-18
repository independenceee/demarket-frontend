"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Marketplace.module.scss";
import { ArrowDropdownCircleIcon, FillDashCircleFillIcon } from "@/components/Icons";
import Background from "@/components/Background";
import Title from "@/components/Title";
import NftContainer from "@/components/NftContainer";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { SmartContractType } from "@/types/SmartContextType";
import { NftItemType } from "@/types/GenericsType";
import Search from "@/components/Search/Search";
import Category from "@/components/Category";

const cx = classNames.bind(styles);
type Props = {};

const MarketplacePage = function ({}: Props) {
    const { assetsFromSmartContract, loadingAssetsFromSmartContract } =
        useContext<SmartContractType>(SmartContractContext);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    useEffect(function () {
        const handleScroll = function () {
            setShowFilter(window.screenY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return function () {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [searchValue, setSearchValue] = useState<string>("");
    const [sortFilter, setSortFilter] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [assetsFilter, setAssetsFilter] = useState<NftItemType[]>([]);

    const handleChangeFilter = function (event: ChangeEvent<HTMLInputElement>) {
        setSortFilter(event.target.value);
    };

    useEffect(
        function () {
            let assetsFilterTemp: NftItemType[] = [...assetsFromSmartContract];
            if (searchValue) {
                assetsFilterTemp = assetsFilter.filter(function (asset, index) {
                    return asset.policyId.toString().toLowerCase().includes(searchValue.toLocaleLowerCase());
                });
            }

            if (sortFilter) {
                assetsFilterTemp = assetsFilter.sort(function (previous: NftItemType, next: NftItemType): any {
                    switch (sortFilter) {
                        // case "news":
                        //     return new Date(next.createdAt).getTime() - new Date(previous.createdAt).getTime();
                        case "news":
                            return Number(next?.price || 0) - Number(previous?.price || 0);
                        default:
                            return;
                    }
                });
            }

            setAssetsFilter(assetsFilterTemp);
        },
        [searchValue, sortFilter, assetsFromSmartContract],
    );

    return (
        <div className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                <Background />
                <Title main="HOME" slug="MARKETPLACE" />
                <section className={cx("content__wrapper")}>
                    <div className={cx("content__left--wrapper")}>
                        <div className={cx("content__left-container")} data-aos="fade-right" data-aos-duration="1000">
                            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                            <Category setSelectedCategory={setSelectedCategory} />
                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Sort buy</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <form className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Default</h4>
                                        <input
                                            name="filter"
                                            value={"default"}
                                            className={cx("content__filter--control")}
                                            onChange={handleChangeFilter}
                                            type="radio"
                                        />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>New</h4>
                                        <input
                                            name="filter"
                                            value={"news"}
                                            className={cx("content__filter--control")}
                                            onChange={handleChangeFilter}
                                            type="radio"
                                        />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Trending</h4>
                                        <input
                                            name="filter"
                                            value={"trending"}
                                            className={cx("content__filter--control")}
                                            onChange={handleChangeFilter}
                                            type="radio"
                                        />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Increment</h4>
                                        <input
                                            name="filter"
                                            value={"increment"}
                                            className={cx("content__filter--control")}
                                            onChange={handleChangeFilter}
                                            type="radio"
                                        />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Decrement</h4>
                                        <input
                                            name="filter"
                                            value={"decrement"}
                                            className={cx("content__filter--control")}
                                            onChange={handleChangeFilter}
                                            type="radio"
                                        />
                                    </section>
                                </form>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Verify</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>Yes</h4>
                                        <input
                                            value={"verify"}
                                            className={cx("content__filter--control")}
                                            onChange={handleChangeFilter}
                                            type="radio"
                                        />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>No</h4>
                                        <input
                                            value={"noVerify"}
                                            className={cx("content__filter--control")}
                                            onChange={handleChangeFilter}
                                            type="radio"
                                        />
                                    </section>
                                </article>
                            </section>
                        </div>
                    </div>
                    <div className={cx("content__right")} data-aos="fade-left" data-aos-duration="1000">
                        <NftContainer nfts={assetsFilter} itemsPerPage={12} loading={loadingAssetsFromSmartContract} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MarketplacePage;
