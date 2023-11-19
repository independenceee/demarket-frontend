"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import styles from "./Home.module.scss";
import NftContainer from "@/components/NftContainer";
import { SmartContractType, DemarketContextType } from "@/types";
import Background from "@/components/Background";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import AccountItemSilder from "@/components/AccountContainer/AccountItemSilder";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import DemarketContext from "@/contexts/components/DemarketContext";

import NftItemSlider from "@/components/NftContainer/NftItemSlider/NftItemSlider";

type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    const { listAssetsFromSmartContract, loadingAssetsFromSmartContract } =
        useContext<SmartContractType>(SmartContractContext);

    const { accounts } = useContext<DemarketContextType>(DemarketContext);
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
                            <div className={cx("slider__list-left")}>
                                {listAssetsFromSmartContract.map(function (value: any, index: number) {
                                    return <NftItemSlider value={value} key={index} index={index} />;
                                })}
                            </div>
                        </section>
                        <section className={cx("slider__wrapper")}>
                            <div className={cx("slider__list-right")}>
                                {listAssetsFromSmartContract.map(function (value: any, index: number) {
                                    return <NftItemSlider value={value} key={index} index={index} />;
                                })}
                            </div>
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
                        <NftContainer loading={loadingAssetsFromSmartContract} data={listAssetsFromSmartContract} />
                    </article>
                </section>
                <section className={cx("account__wrapper")}>
                    <SubTitle title="Top Account" description="Beginning of the app and website design process." />
                    <article className={cx("account__container")}>
                        <section className={cx("account__list--left")}>
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder avatar="" name={account.name!} key={index} index={index} />;
                            })}
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder avatar="" name={account.name!} key={index} index={index} />;
                            })}
                        </section>
                        <section className={cx("account__list--right")}>
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder avatar="" name={account.name!} key={index} index={index} />;
                            })}
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder avatar="" name={account.name!} key={index} index={index} />;
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
