"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import classNames from "classnames/bind";
import { EyeIcon, UnHeartIcon } from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import { LucidContextType, SmartContractType } from "@/types";
import convertString from "@/helpers/convertString";
import fetchMetadataFromPolicyIdAndAssetName from "@/utils/fetchMetadataFromPolicyIdAnsAssetName";
import Image from "next/image";
import images from "@/assets/images";
import CopyItem from "@/components/CopyItem";
import styles from "./Detail.module.scss";
import checkMediaType from "@/helpers/checkMediaType";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import convertHexToString from "@/helpers/convertHexToString";
import LucidContext from "@/contexts/components/LucidContext";
import SmartContractContext from "@/contexts/components/SmartContractContext";

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

    const renderMetadataFromPolicyIdAndAssetName = async function () {
        try {
            const assetInfomation = await fetchMetadataFromPolicyIdAndAssetName({ policyId, assetName });

            const checkSelling = await findAssetService({ policyId, assetName });
            setAsset({ ...assetInfomation, ...checkSelling });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(function () {
        renderMetadataFromPolicyIdAndAssetName();
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

    const metadata = `{
        {
            "hash": "733c16802b3d84c065a875166233cbb6a76ca0a85e59f0b2bcea8b70e26d5539",
            "inputs": [
                {
                    "address": "addr_test1qrxpzfwdwtq9dzu2swe2hlmn9dptmz7dmv8cfs64va29xa03y2thexqurrtyve545ssjqmeywq40wanpqgyl654h57pqqz9eyd",
                    "amount": [
                        {
                            "unit": "lovelace",
                            "quantity": "2984897366"
                        }
                    ],
                    "tx_hash": "ec2115fec88468c57915b07e8616fa5f81c660a7d7eac6f249e402d98263f567",
                    "output_index": 1,
                    "data_hash": null,
                    "inline_datum": null,
                    "reference_script_hash": null,
                    "collateral": false,
                    "reference": false
                }
            ],
            "outputs": [
                {
                    "address": "addr_test1qrxpzfwdwtq9dzu2swe2hlmn9dptmz7dmv8cfs64va29xa03y2thexqurrtyve545ssjqmeywq40wanpqgyl654h57pqqz9eyd",
                    "amount": [
                        {
                            "unit": "lovelace",
                            "quantity": "1163700"
                        },
                        {
                            "unit": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444461696c7920436f696e",
                            "quantity": "1"
                        }
                    ],
                    "output_index": 0,
                    "data_hash": null,
                    "inline_datum": null,
                    "collateral": false,
                    "reference_script_hash": null
                },
                {
                    "address": "addr_test1qrxpzfwdwtq9dzu2swe2hlmn9dptmz7dmv8cfs64va29xa03y2thexqurrtyve545ssjqmeywq40wanpqgyl654h57pqqz9eyd",
                    "amount": [
                        {
                            "unit": "lovelace",
                            "quantity": "2983549641"
                        }
                    ],
                    "output_index": 1,
                    "data_hash": null,
                    "inline_datum": null,
                    "collateral": false,
                    "reference_script_hash": null
                }
            ]
        }
    }`;

    console.log(asset);
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                {asset ? (
                    <section className={cx("detail__wrapper")}>
                        <div className={cx("detail__left")}>
                            <div className={cx("detail__image")}>
                                {checkMediaType(String(asset.metadata.mediaType), "image") && (
                                    <img
                                        className={cx("detail__image--image")}
                                        src={String(convertIpfsAddressToUrl(asset.metadata.image))}
                                        alt=""
                                    />
                                )}
                                {checkMediaType(String(asset.metadata.mediaType), "video") && (
                                    <video autoPlay muted loop className={cx("detail__image--image")}>
                                        <source
                                            src={String(convertIpfsAddressToUrl(asset.metadata.image))}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}

                                {checkMediaType(String(asset.metadata.mediaType), "application") && (
                                    <iframe
                                        className={cx("detail__image--image")}
                                        src={String(convertIpfsAddressToUrl(asset.metadata.image))}
                                    ></iframe>
                                )}

                                {checkMediaType(String(asset.metadata.mediaType), "audio") && (
                                    <audio controls>
                                        <source
                                            src={String(convertIpfsAddressToUrl(asset.metadata.image))}
                                            type="audio/mpeg"
                                        />
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
                                    <span>Type:</span> {asset.metadata.mediaType.split("/").pop()}
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
                                    >
                                        Metadata
                                    </button>
                                    <button
                                        className={toggleState == 3 ? cx("active__tab--button") : cx("tab__button")}
                                        onClick={() => toggleTab(3)}
                                    >
                                        Utxos
                                    </button>
                                    <div className={cx("tab__line")}></div>
                                </div>
                                <div className={cx("content__box")}>
                                    <div className={toggleState == 1 ? cx("content") : cx("hidden__content")}>
                                        <SyntaxHighlighter
                                            className={cx("data__interview")}
                                            language="json"
                                            style={docco}
                                        >
                                            {metadata}
                                        </SyntaxHighlighter>
                                    </div>
                                    <div className={toggleState == 2 ? cx("content") : cx("hidden__content")}>
                                        <SyntaxHighlighter
                                            className={cx("data__interview")}
                                            language="json"
                                            style={docco}
                                        >
                                            {JSON.stringify(asset.metadata, null, 2)}
                                        </SyntaxHighlighter>
                                    </div>
                                    <div className={toggleState == 3 ? cx("content") : cx("hidden__content")}>
                                        <SyntaxHighlighter
                                            className={cx("data__interview")}
                                            language="json"
                                            style={docco}
                                        >
                                            {`[
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444d79626f6f6b",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44416e696d65",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4441694c615472696575506875",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444b68756e67206c6f6e67",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44456368",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44446f67",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af445431",
        "quantity": "8"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44447265737365642063617477616c6b",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4450696b61636875206d75736963",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444f757477656172207061727479",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444f75746572776561723036",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444e69636520417274776f726b",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44417274776f726b2032",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44436c696d61746520467269656e646c79",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44437265617469766520417274776f726b",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44426967205269766572",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44546563686e6963616c205175657374696f6e73",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4444657363656e64616e7473204f66205468652053756e",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444d794356504850",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af446c6f676f486f6d65",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4444656d6f204e4654",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444e46542064656d6f",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af444461696c7920436f696e",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44416c6c6573",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4452756770756c6c",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44426c6f636b66726f73742049636f6e",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af4453746172",
        "quantity": "1"
    },
    {
        "asset": "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af446c6f676f",
        "quantity": "1"
    }
]`}
                                        </SyntaxHighlighter>
                                    </div>
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
