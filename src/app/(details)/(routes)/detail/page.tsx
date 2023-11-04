"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { post } from "@/utils/httpRequest";
import { EyeIcon, EyeVisibleIcon, UnHeartIcon } from "@/components/Icons";
import NftContainer from "@/components/NftContainer";

const cx = classNames.bind(styles);
type Props = {};

const DetailPage = function ({}: Props) {
    const [toggleState, setToggleState] = useState<number>(1);

    const toggleTab = function (index: number) {
        setToggleState(index);
    };

    const [asset, setAsset] = useState();
    const [currentAddress, setCurrentAddress] = useState();
    const [initialAddress, setInitialAddress] = useState();
    const [transactionUtxo, setTransactionUtxo] = useState();

    const fetchAssetFromPolicyIdAndAssetName = async function () {
        try {
            const assetInformation = await post("/blockfrost/assets/information", {
                policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
                assetName: "Daily Coin",
            });
            setAsset(assetInformation);

            const currentAddress = await post("/koios/assets/nft-address", {
                policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
                assetName: "Daily Coin",
            });
            setCurrentAddress(currentAddress[0].payment_address);

            const transactionInitialAddress = await post("/blockfrost/transaction/asset", {
                policyId: "cb2e7bf1fef88c0f8d679a2bd6cf9167f175e106063d6a16e457af44",
                assetName: "Daily Coin",
            });

            console.log(transactionInitialAddress);

            const initialAddress = await post("/blockfrost/transaction/utxos", {
                transactionHash: transactionInitialAddress[0].tx_hash,
            });
            setTransactionUtxo(initialAddress);
            setInitialAddress(initialAddress.inputs[0].address);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(asset);
    useEffect(function () {
        fetchAssetFromPolicyIdAndAssetName();
    }, []);

    if (asset) {
        return (
            <main className={cx("wrapper")}>
                <div className={cx("container")}>
                    <section className={cx("detail__wrapper")}>
                        <div className={cx("detail__left")}>
                            <div className={cx("detail__image")}>
                                <img
                                    className={cx("detail__image--image")}
                                    src="https://ipfs.io/ipfs/QmPgjREBxyeZXoSUPTr7ZfdcF9egM6DK55jRHkX6HuZQfD"
                                    alt=""
                                />
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
                                <h2 className={cx("asset__name")}></h2>
                                <div className={cx("description")}>
                                    <span>Type:</span> png
                                </div>
                                <div className={cx("description")}>
                                    <span>PolicyId:</span>
                                </div>
                                <div className={cx("description")}>
                                    <span>Fingerprint:</span>
                                </div>
                                <div className={cx("people__wrapper")}>
                                    <section className={cx("peple__container")}>
                                        <header className={cx("people__header")}>Owner</header>
                                        <div>{}</div>
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
                                            {`${JSON.stringify(asset, null, 2)}`}
                                        </SyntaxHighlighter>
                                    </div>
                                    <div className={toggleState == 3 ? cx("content") : cx("hidden__content")}>
                                        <SyntaxHighlighter
                                            className={cx("data__interview")}
                                            language="json"
                                            style={docco}
                                        >
                                            {`${JSON.stringify(transactionUtxo, null, 2)}`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section className={cx("other__wrapper")}>
                        <header className={cx("other__header")}>More Item</header>
                        <NftContainer data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                    </section>
                </div>
            </main>
        );
    }
};

export default DetailPage;
