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
                            <div className={cx("detail__image")}>
                                {checkMediaType(String(asset.mediaType), "image") && (
                                    <img
                                        className={cx("detail__image--image")}
                                        src={String(convertIpfsAddressToUrl(asset.image))}
                                        alt=""
                                    />
                                )}
                                {checkMediaType(String(asset.mediaType), "video") && (
                                    <video autoPlay muted loop className={cx("detail__image--image")}>
                                        <source src={String(convertIpfsAddressToUrl(asset.image))} type="video/mp4" />
                                    </video>
                                )}

                                {checkMediaType(String(asset.mediaType), "application") && (
                                    <iframe
                                        className={cx("detail__image--image")}
                                        src={String(convertIpfsAddressToUrl(asset.image))}
                                    ></iframe>
                                )}

                                {checkMediaType(String(asset.mediaType), "audio") && (
                                    <audio controls>
                                        <source src={String(convertIpfsAddressToUrl(asset.image))} type="audio/mpeg" />
                                    </audio>
                                )}
                                <div className={cx("detail__image--left")}>
                                    <EyeIcon />
                                </div>
                                <div className={cx("detail__image--right")}>
                                    <UnHeartIcon />
                                </div>
                            </div>
                        </div>
                        <div className={cx("detail__right")}>
                            <section className={cx("detail__content")}>
                                <h2 className={cx("asset__name")}>{convertHexToString(asset.assetName)}</h2>
                                <div className={cx("description")}>
                                    <span>Type:</span> {asset.mediaType.split("/").pop()}
                                </div>
                                <div className={cx("description")}>
                                    <span>PolicyId:</span>
                                    {convertString({
                                        inputString: String(asset.policyId),
                                        numberOfFirstChar: 20,
                                        numberOfLastChar: -10,
                                    })}
                                    <CopyItem value={asset.policyId} />
                                </div>
                                <div className={cx("description")}>
                                    <span>Fingerprint:</span>
                                    {convertString({
                                        inputString: String(asset.fingerprint),
                                        numberOfFirstChar: 20,
                                        numberOfLastChar: -10,
                                    })}
                                </div>
                                <div className={cx("people__wrapper")}>
                                    <section className={cx("peple__container")}>
                                        <header className={cx("people__header")}>Owner</header>
                                        <div className={cx("people__content")}>
                                            <div className={cx("people__avatar")}>
                                                <Image
                                                    className={cx("people__avatar--image")}
                                                    src={images.user}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={cx("people__information")}>
                                                <h3 className={cx("people__name")}>
                                                    {convertString({
                                                        inputString: String(asset.stakekeySellerAddress),
                                                        numberOfFirstChar: 9,
                                                        numberOfLastChar: -6,
                                                    })}
                                                </h3>
                                                <div className={cx("people__address")}>
                                                    <p>
                                                        {convertString({
                                                            inputString: String(asset.sellerAddress),
                                                            numberOfFirstChar: 9,
                                                            numberOfLastChar: -6,
                                                        })}
                                                    </p>
                                                    <CopyItem value={asset.sellerAddress} />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className={cx("peple__container")}>
                                        <header className={cx("people__header")}>Author</header>
                                        <div className={cx("people__content")}>
                                            <div className={cx("people__avatar")}>
                                                <Image
                                                    className={cx("people__avatar--image")}
                                                    src={images.user}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={cx("people__information")}>
                                                <h3 className={cx("people__name")}>
                                                    {convertString({
                                                        inputString: String(asset.stakekeyAuthorAddress),
                                                        numberOfFirstChar: 9,
                                                        numberOfLastChar: -6,
                                                    })}
                                                </h3>
                                                <div className={cx("people__address")}>
                                                    <p>
                                                        {convertString({
                                                            inputString: String(asset.authorAddress),
                                                            numberOfFirstChar: 9,
                                                            numberOfLastChar: -6,
                                                        })}
                                                    </p>
                                                    <CopyItem value={asset.sellerAddress} />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </section>
                            {asset.price && asset.sellerAddress !== walletAddress && (
                                <section className={cx("detail__button")}>
                                    <button className={cx("detail__button--left")}>
                                        {Number(asset.price) / 1000000} ADA
                                    </button>
                                    <button onClick={handleBuyNft} className={cx("detail__button--right")}>
                                        BUY
                                    </button>
                                </section>
                            )}

                            {asset.price && asset.sellerAddress === walletAddress && (
                                <section className={cx("detail__button")}>
                                    <button className={cx("detail__button--left")}>
                                        {Number(asset.price) / 1000000} ADA
                                    </button>
                                    <button onClick={handleRefundNft} className={cx("detail__button--right")}>
                                        Refund
                                    </button>
                                </section>
                            )}

                            {asset.currentAddress === walletAddress && !asset.price ? (
                                <section className={cx("detail__button")}>
                                    <input
                                        type="text"
                                        placeholder="Enter the price"
                                        onChange={handleInputPrice}
                                        className={cx("detail__button--left")}
                                    />
                                    <button onClick={handleSellNft} className={cx("detail__button--right")}>
                                        SELL
                                    </button>
                                </section>
                            ) : null}
                            <section className={cx("detail__transaction")}>
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
                                    ></button>
                                    <button
                                        className={toggleState == 3 ? cx("active__tab--button") : cx("tab__button")}
                                        onClick={() => toggleTab(3)}
                                    >
                                        Utxos
                                    </button>
                                    <div className={cx("tab__line")}></div>
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
