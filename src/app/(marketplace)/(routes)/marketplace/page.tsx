"use client";

import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import Background from "@/components/Background";
import Title from "@/components/Title";
import NftContainer from "@/components/NftContainer";
import Search from "@/components/Search/Search";
import Category from "@/components/Category";
import Verify from "@/components/Verify";
import SortBy from "@/components/SortBy";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { NftItemType } from "@/types/GenericsType";
import { SmartContractType } from "@/types/SmartContextType";
import styles from "./Marketplace.module.scss";
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
    const [sortBy, setSortBy] = useState<string>("default");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [verify, setVerify] = useState<string>("");
    const [assetsFilter, setAssetsFilter] = useState<NftItemType[]>([]);

    const handleChangeFilter = function (event: ChangeEvent<HTMLInputElement>) {
        setSortBy(event.target.value);
    };

    useEffect(
        function () {
            let assetsFilterTemp: NftItemType[] = [...assetsFromSmartContract];
            if (searchValue) {
                assetsFilterTemp = assetsFilter.filter(function (asset, index) {
                    return asset.policyId.toString().toLowerCase().includes(searchValue.toLocaleLowerCase());
                });
            }

            if (sortBy) {
                assetsFilterTemp = assetsFilterTemp.sort(function (previous: NftItemType, next: NftItemType): any {
                    switch (sortBy) {
                        case "default":
                            return Number(next?.createdAt || 0) - Number(previous?.createdAt || 0);
                        case "news":
                            return Number(next?.createdAt || 0) - Number(previous?.createdAt || 0);
                        case "increment":
                            return Number(next?.price || 0) - Number(previous?.price || 0);
                        case "decrement":
                            return Number(previous?.price || 0) - Number(next?.price || 0);
                        case "trending":
                            return Number(next?.createdAt || 0) - Number(previous?.createdAt || 0);
                        default:
                            return 0;
                    }
                });
            }

            if (verify) {
            }

            setAssetsFilter(assetsFilterTemp);
        },
        [searchValue, sortBy, assetsFromSmartContract],
    );

    return (
        <div className={cx("wrapper")} data-aos="fade-down">
            <title>Marketplace - Demarket</title>
            <div className={cx("container")}>
                <Background />
                <Title main="HOME" slug="MARKETPLACE" />
                <section className={cx("content__wrapper")}>
                    <div className={cx("content__left--wrapper")}>
                        <div className={cx("content__left--container")} data-aos="fade-right" data-aos-duration="1000">
                            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                            <Category setSelectedCategory={setSelectedCategory} />
                            <SortBy setSortBy={setSortBy} />
                            <Verify setVerify={setVerify} />
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
