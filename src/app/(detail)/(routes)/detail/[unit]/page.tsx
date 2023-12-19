"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import classNames from "classnames/bind";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { EyeIcon, UnHeartIcon } from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
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
import { SmartContractType } from "@/types/SmartContextType";
import { LucidContextType } from "@/types/LucidContextType";
import SubTitle from "@/components/SubTitle";
import { post } from "@/utils/httpRequest";

const cx = classNames.bind(styles);
type Props = {};

const tabItems = [
    { id: 1, name: "History" },
    { id: 2, name: "Metadata" },
    { id: 3, name: "UTXOs" },
];

const DetailPage = function ({}: Props) {
    const { unit }: any = useParams();
    const [policyId] = useState<string>(unit.slice(0, 56));
    const [assetName] = useState<string>(unit.slice(56));

    const { assetsFromSmartContract, loadingAssetsFromSmartContract, findAsset, sellAsset, buyAsset, refundAsset } =
        useContext<SmartContractType>(SmartContractContext);
    const { lucidWallet, walletItem } = useContext<LucidContextType>(LucidContext);

    const [toggleTabState, setToggleTabState] = useState<number>(1);
    const [asset, setAsset] = useState<any>();
    const [price, setPrice] = useState<string>("");
    const toggleTab = function (index: number) {
        setToggleTabState(index);
    };

    const [assetMetadata, setAssetMetadata] = useState<any>(null!);

    const handleInputPrice = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPrice(event.target.value);
    };

    useEffect(
        function () {
            const fetchMetadataFromPolicyIdAndAssetName = async function () {
                const metadata = await post("/blockfrost/assets/information", {
                    policyId: policyId,
                    assetName: assetName,
                });
                setAssetMetadata(metadata.onchain_metadata);
            };

            fetchMetadataFromPolicyIdAndAssetName();
        },
        [policyId, assetName],
    );

    console.log(assetMetadata);
    useEffect(function () {
        const fetchInformationFromPolicyIdAndAssetName = async function () {
            try {
                const informationAsset = await fetchInformationAsset({ policyId, assetName });
                const informationContract = await findAsset({ policyId, assetName });

                setAsset({ ...informationAsset, ...informationContract });
            } catch (error) {
                console.log(error);
            }
        };
        fetchInformationFromPolicyIdAndAssetName();
    }, []);

    const handleBuyNft = async function () {
        try {
            if (lucidWallet) {
                await buyAsset({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    lucid: lucidWallet,
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
            if (lucidWallet) {
                await sellAsset({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    author: asset.authorAddress,
                    lucid: lucidWallet,
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
            if (lucidWallet) {
                await refundAsset({
                    assetName: asset.assetName,
                    policyId: asset.policyId,
                    lucid: lucidWallet,
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
                    <main className={cx("content__wrapper")}>
                        <section className={cx("content__left")}>1</section>

                        <section className={cx("content__right")}>
                            <section className={cx("content__content")}>2</section>
                            <section className={cx("content__price")}>3</section>
                            <section className={cx("content__infomation")}>
                                <div className={cx("tabs")}>
                                    {tabItems.map(function ({ id, name }, index) {
                                        return (
                                            <button
                                                key={index}
                                                className={
                                                    toggleTabState === id ? cx("tab__item--active") : cx("tab__item")
                                                }
                                                onClick={() => toggleTab(id)}
                                            >
                                                {name}
                                            </button>
                                        );
                                    })}
                                </div>
                                {toggleTabState === 1 && (
                                    <div className={cx("tab__content")}>
                                        <h2>History</h2>
                                        <div>
                                            {Object.keys(assetMetadata).map((key) => (
                                                <div key={key}>
                                                    <strong>{key}:</strong> {assetMetadata[key]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {toggleTabState === 2 && (
                                    <div className={cx("tab__content")}>
                                        <h2>Metadata</h2>
                                        <div className={cx("metadata__wrapper")}>
                                            {Object.keys(assetMetadata).map((key) => (
                                                <div className={cx("metadata__container")} key={key}>
                                                    <div className={cx("metadata__key")}>{key}</div>{" "}
                                                    <div className={cx("metadata__value")}>{assetMetadata[key]}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {toggleTabState === 3 && (
                                    <div className={cx("tab__content")}>
                                        <h2>UTXOs</h2>
                                        <div>
                                            {Object.keys(assetMetadata).map((key) => (
                                                <div key={key}>
                                                    <strong>{key}:</strong> {assetMetadata[key]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        </section>
                    </main>
                ) : (
                    <main className={cx("content__wrapper--skeleton")}>
                        <section className={cx("content__left--skeleton")}>
                            <Skeleton className={cx("skeleton__item--skeleton")} />
                        </section>

                        <section className={cx("content__right--skeleton")}>
                            <section className={cx("content__content--skeleton")}>
                                <Skeleton className={cx("skeleton__item--skeleton")} />
                            </section>
                            <section className={cx("content__price--skeleton")}>
                                <Skeleton className={cx("skeleton__item--skeleton")} />
                            </section>
                            <section className={cx("content__infomation--skeleton")}>
                                <Skeleton className={cx("skeleton__item--skeleton")} />
                            </section>
                        </section>
                    </main>
                )}

                <section className={cx("other__wrapper")}>
                    <SubTitle title="More Items" />
                    <NftContainer nfts={assetsFromSmartContract} loading={loadingAssetsFromSmartContract} />
                </section>
            </div>
        </main>
    );
};

export default DetailPage;
