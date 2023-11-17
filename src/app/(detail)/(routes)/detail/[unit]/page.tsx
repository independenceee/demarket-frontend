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

    return (
        <main className={cx("wrapper")} data-aos="fade-down">
            <div className={cx("container")}>
                <section></section>
                <section className={cx("other__wrapper")}>
                    <header className={cx("other__header")}>More Item</header>
                    <NftContainer data={listAssetsFromSmartContract} />
                </section>
            </div>
        </main>
    );
};

export default DetailPage;
