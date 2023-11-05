"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import { EyeIcon, UnHeartIcon } from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import DemarketContext from "@/contexts/components/DemarketContext";
import { DemarketContextType } from "@/types";
import convertString from "@/helpers/convertString";
import fetchMetadataFromPolicyIdAndAssetName from "@/utils/fetchMetadataFromPolicyIdAnsAssetName";
import Image from "next/image";
import images from "@/assets/images";
import CopyItem from "@/components/CopyItem";
import styles from "./Detail.module.scss";
import checkMediaType from "@/helpers/checkMediaType";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import convertHexToString from "@/helpers/convertHexToString";

const cx = classNames.bind(styles);
type Props = {};

const DetailPage = function ({}: Props) {
    const { unit }: any = useParams();
    const { listAssetsFromSmartContract } = useContext<DemarketContextType>(DemarketContext);
    const [policyId, setPolicyId] = useState<string>(unit.slice(0, 56));
    const [assetName, setAssetName] = useState<string>(unit.slice(56));
    const [toggleState, setToggleState] = useState<number>(1);
    const [asset, setAsset] = useState<any>();
    const toggleTab = function (index: number) {
        setToggleState(index);
    };

    const renderMetadataFromPolicyIdAndAssetName = async function () {
        try {
            const assetInfomation = await fetchMetadataFromPolicyIdAndAssetName({ policyId, assetName });
            setAsset(assetInfomation);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(function () {
        renderMetadataFromPolicyIdAndAssetName();
    }, []);

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
                            <section className={cx("detail__button")}>
                                <button className={cx("detail__button--left")}>100 ADA</button>
                                <button className={cx("detail__button--right")}>BUY</button>
                            </section>
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
                                        <h2>2</h2>
                                        <p>
                                            Slogan xuất hiện ở mọi nơi xung quanh ta, từ trên internet, quảng cáo cho
                                            đến các biển hiệu ngoài trời. Vậy như thế nào là một slogan hay? Vietnix sẽ
                                            gợi ý cho bạn hơn 50 câu slogan ý nghĩa phù hợp với lĩnh vực kinh doanh của
                                            bạn qua bài viết dưới đây
                                        </p>
                                    </div>
                                    <div className={toggleState == 2 ? cx("content") : cx("hidden__content")}>
                                        <SyntaxHighlighter
                                            className={cx("data__interview")}
                                            language="json"
                                            style={docco}
                                        >
                                            1
                                        </SyntaxHighlighter>
                                    </div>
                                    <div className={toggleState == 3 ? cx("content") : cx("hidden__content")}>
                                        <SyntaxHighlighter
                                            className={cx("data__interview")}
                                            language="json"
                                            style={docco}
                                        >
                                            1
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
