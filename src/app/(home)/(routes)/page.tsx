"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import Statistics from "@/components/Statistics";
import styles from "./Home.module.scss";
import NftContainer from "@/components/NftContainer";
import { SmartContractType } from "@/types/SmartContextType";
import Background from "@/components/Background";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import AccountItemSilder from "@/components/AccountContainer/AccountItemSilder";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import DemarketContext from "@/contexts/components/DemarketContext";
import NftItemSlider from "@/components/NftContainer/NftItemSlider/NftItemSlider";
import configs from "@/configs";
import { DemarketContextType } from "@/types/DemarketContextType";
type Props = {};

const cx = classNames.bind(styles);

const Home = function ({}: Props) {
    const { assetsFromSmartContract, loadingAssetsFromSmartContract } =
        useContext<SmartContractType>(SmartContractContext);

    const { accounts } = useContext<DemarketContextType>(DemarketContext);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Background />
                <Title main={configs.titles.home.main} />

                <section className={cx("news__wrapper")}>
                    <SubTitle
                        title={configs.subTitles.home.newItems.title}
                        description={configs.subTitles.home.newItems.description}
                    />

                    <article className={cx("news_container")}>
                        <NftContainer nfts={assetsFromSmartContract} loading={loadingAssetsFromSmartContract} />
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
                                {assetsFromSmartContract.map(function (value: any, index: number) {
                                    return <NftItemSlider value={value} key={index} index={index} />;
                                })}
                            </div>
                        </section>
                        <section className={cx("slider__wrapper")}>
                            <div className={cx("slider__list-right")}>
                                {assetsFromSmartContract.map(function (value: any, index: number) {
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
                        <NftContainer loading={loadingAssetsFromSmartContract} nfts={assetsFromSmartContract} />
                    </article>
                </section>
                <section className={cx("account__wrapper")}>
                    <SubTitle title="Top Account" description="Beginning of the app and website design process." />
                    <article className={cx("account__container")}>
                        <section className={cx("account__list--left")}>
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder account={account} key={index} index={index} />;
                            })}
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder account={account} key={index} index={index} />;
                            })}
                        </section>
                        <section className={cx("account__list--right")}>
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder account={account} key={index} index={index} />;
                            })}
                            {accounts.map(function (account, index) {
                                return <AccountItemSilder account={account} key={index} index={index} />;
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
