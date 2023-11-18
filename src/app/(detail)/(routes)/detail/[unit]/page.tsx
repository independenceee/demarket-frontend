"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import classNames from "classnames/bind";
import { EyeIcon, UnHeartIcon } from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import { LucidContextType, SmartContractType } from "@/types";
import convertString from "@/helpers/convertString";
import Image from "next/image";
import images from "@/assets/images";
import CopyItem from "@/components/CopyItem";
import styles from "./Detail.module.scss";
import checkMediaType from "@/helpers/checkMediaType";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import convertHexToString from "@/helpers/convertHexToString";
import LucidContext from "@/contexts/components/LucidContext";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import fetchInformationAsset from "@/utils/fetchInformationAsset";

const cx = classNames.bind(styles);
type Props = {};

const DetailPage = function ({}: Props) {
    const { unit }: any = useParams();
    const { listAssetsFromSmartContract, findAssetService } = useContext<SmartContractType>(SmartContractContext);
    const [policyId, setPolicyId] = useState<string>(unit.slice(0, 56));
    const [assetName, setAssetName] = useState<string>(unit.slice(56));
    const [toggleState, setToggleState] = useState<number>(1);
    const [asset, setAsset] = useState<any>();
    const [price, setPrice] = useState<string>("");
    const toggleTab = function (index: number) {
        setToggleState(index);
    };

    const handleInputPrice = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPrice(event.target.value);
    };

    const fetchInformationFromPolicyIdAndAssetName = async function () {
        try {
            const informationAsset = await fetchInformationAsset({ policyId, assetName });
            const informationContract = await findAssetService({ policyId, assetName });
            console.log(informationContract);
            setAsset({ ...informationAsset, ...informationContract });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(asset);

    useEffect(function () {
        fetchInformationFromPolicyIdAndAssetName();
    }, []);

    const { lucid, walletAddress } = useContext<LucidContextType>(LucidContext);
    const { sellAssetService, buyAssetService, refundAssetService } =
        useContext<SmartContractType>(SmartContractContext);

    const handleBuyNft = async function () {
        try {
            if (lucid) {
                await buyAssetService({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    lucid: lucid,
                    royaltiesAddress: asset.authorAddress,
                    sellerAddress: asset.sellerAddress,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSellNft = async function () {
        try {
            if (lucid) {
                await sellAssetService({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    author: asset.authorAddress,
                    lucid: lucid,
                    price: BigInt(Number(price) * 1000000),
                    royalties: BigInt(Number(price) * 10000),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefundNft = async function () {
        try {
            if (lucid) {
                await refundAssetService({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    lucid: lucid,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                {asset ? (
                    <section className={cx("detail__wrapper")}>
                        <div className={cx("detail__left")}>
                            <div className={cx("image__wrapper")}>
                                <img
                                    className={cx("image")}
                                    src={String(convertIpfsAddressToUrl(asset.image))}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className={cx("detail__right")}>
                            <section className={cx("detail__information")}>
                                <h3 className={cx("assetName")}>
                                    {String(convertHexToString(asset.assetName))} ({asset.assetName})
                                </h3>

                                <div className={cx("information")}>
                                    <h3 className={cx("mediaType")}>Media type: {asset.mediaType}</h3>
                                    <h3 className={cx("mediaType")}>
                                        Fingerprint:{" "}
                                        {convertString({
                                            inputString: asset.fingerprint,
                                            numberOfFirstChar: 15,
                                            numberOfLastChar: -15,
                                        })}
                                        <CopyItem value="" />
                                    </h3>
                                    <h3 className={cx("mediaType")}>
                                        PolicyId:{" "}
                                        {convertString({
                                            inputString: asset.policyId,
                                            numberOfFirstChar: 15,
                                            numberOfLastChar: -15,
                                        })}
                                        <CopyItem value="" />
                                    </h3>
                                </div>

                                <aside className={cx("address__wrapper")}>
                                    <section className={cx("address__container")}>
                                        <header className={cx("address__header")}>Owner: </header>
                                        <aside className={cx("address__content")}>
                                            <section className={cx("address__image")}>
                                                <Image className={cx("image")} src={images.user} alt="" />
                                            </section>
                                            <section className={cx("address__information")}>
                                                <div className={cx("name")}>
                                                    {convertString({
                                                        inputString: asset.stakekeySellerAddress,
                                                        numberOfFirstChar: 8,
                                                        numberOfLastChar: -8,
                                                    })}
                                                </div>
                                                <div className={cx("address")}>
                                                    {convertString({
                                                        inputString: asset.sellerAddress,
                                                        numberOfFirstChar: 8,
                                                        numberOfLastChar: -8,
                                                    })}
                                                    <CopyItem value="" />
                                                </div>
                                            </section>
                                        </aside>
                                    </section>
                                    <section className={cx("address__container")}>
                                        <header className={cx("address__header")}>Author: </header>
                                        <aside className={cx("address__content")}>
                                            <section className={cx("address__image")}>
                                                <Image className={cx("image")} src={images.user} alt="" />
                                            </section>
                                            <section className={cx("address__information")}>
                                                <div className={cx("name")}>
                                                    {convertString({
                                                        inputString: asset.stakekeySellerAddress,
                                                        numberOfFirstChar: 8,
                                                        numberOfLastChar: -8,
                                                    })}
                                                </div>
                                                <div className={cx("address")}>
                                                    {convertString({
                                                        inputString: asset.sellerAddress,
                                                        numberOfFirstChar: 8,
                                                        numberOfLastChar: -8,
                                                    })}
                                                    <CopyItem value="" />
                                                </div>
                                            </section>
                                        </aside>
                                    </section>
                                </aside>
                            </section>
                            <section className={cx("detail__control")}>
                                <header className={cx("control__header")}>Enter the price: </header>
                                <aside className={cx("control__container")}>
                                    <input type="text" className={cx("control__input")} />
                                    <button className={cx("control__button")}>Selling</button>
                                </aside>
                            </section>
                            <section className={cx("detail__option")}>
                                <div className={cx("tab__box")}>
                                    <button
                                        className={toggleState == 1 ? cx("active__tab--button") : cx("tab__button")}
                                        onClick={() => toggleTab(1)}
                                    >
                                        History
                                    </button>
                                    <button
                                        className={toggleState == 2 ? cx("active__tab--button") : cx("tab__button")}
                                        onClick={() => toggleTab(2)}
                                    >
                                        Metadata
                                    </button>
                                    <button
                                        className={toggleState == 3 ? cx("active__tab--button") : cx("tab__button")}
                                        onClick={() => toggleTab(3)}
                                    >
                                        Utxos
                                    </button>
                                </div>
                                <div className={cx("content__box")}>
                                    <div className={toggleState == 1 ? cx("content") : cx("hidden__content")}></div>
                                    <div className={toggleState == 2 ? cx("content") : cx("hidden__content")}></div>
                                    <div className={toggleState == 3 ? cx("content") : cx("hidden__content")}></div>
                                </div>
                            </section>
                        </div>
                    </section>
                ) : null}
                <section className={cx("other__wrapper")}>
                    <header className={cx("other__header")}>More Item</header>
                    <NftContainer data={listAssetsFromSmartContract} />
                </section>
            </div>
        </main>
    );
};

export default DetailPage;
