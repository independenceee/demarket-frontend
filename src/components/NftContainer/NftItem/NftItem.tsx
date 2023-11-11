"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import CountUp from "react-countup";
import styles from "./NftItem.module.scss";
import images from "@/assets/images";
import covertString from "@/helpers/convertString";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import checkMediaType from "@/helpers/checkMediaType";
import convertHexToString from "@/helpers/convertHexToString";
import CopyItem from "@/components/CopyItem";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType, SmartContractType } from "@/types";
import SmartContractContext from "@/contexts/components/SmartContractContext";

const cx = classNames.bind(styles);
type Props = {
    value: any;
    index: number;
};

const NftItem = function ({ value, index }: Props) {
    const router = useRouter();
    const { connectWallet, lucid } = useContext<LucidContextType>(LucidContext);
    const { sellAssetService, buyAssetService } = useContext<SmartContractType>(SmartContractContext);

    const handleBuyNft = async function () {
        try {
            connectWallet(null!);
            if (lucid) {
                await buyAssetService({
                    assetName: value.assetName,
                    policyId: value.policyId,
                    lucid: lucid,
                    royaltiesAddress: value.authorAddress,
                    sellerAddress: value.sellerAddress,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSellNft = async function () {
        try {
            connectWallet(null!);
            if (lucid) {
                await sellAssetService({
                    assetName: value.assetName,
                    policyId: value.policyId,
                    author: value.authorAddress,
                    lucid: lucid,
                    price: BigInt(10000000),
                    royalties: BigInt(1000 / 10),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            onClick={() => router.push(`/detail/${value.policyId + value.assetName}`)}
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <div className={cx("container")}>
                <section className={cx("image__wrapper")}>
                    {checkMediaType(value.mediaType, "image") && (
                        <img className={cx("image")} src={String(convertIpfsAddressToUrl(value.image))} alt="" />
                    )}
                    {checkMediaType(value.mediaType, "video") && (
                        <video autoPlay muted loop className={cx("image")}>
                            <source src={String(convertIpfsAddressToUrl(value.image))} type="video/mp4" />
                        </video>
                    )}

                    {checkMediaType(value.mediaType, "application") && (
                        <iframe className={cx("image")} src={String(convertIpfsAddressToUrl(value.image))}></iframe>
                    )}

                    {checkMediaType(value.mediaType, "audio") && (
                        <audio controls>
                            <source src={String(convertIpfsAddressToUrl(value.image))} type="audio/mpeg" />
                        </audio>
                    )}
                </section>
                <section className={cx("content")}>
                    <h3 className={cx("content__title")}>{convertHexToString(value.assetName) || images.background}</h3>
                    <h3 className={cx("content__title")}>{value.mediaType.split("/").pop()}</h3>
                </section>
                <section className={cx("information")}>
                    <div className={cx("author")}>
                        <Image className={cx("avatar")} src={images.user} alt="" />
                        <h3 className={cx("name")}>Creator</h3>
                    </div>
                    {value.price && (
                        <h3 className={cx("price")}>
                            <CountUp start={0} end={Number(value.price) / 1000000 || 0} duration={2} delay={0} /> ADA
                        </h3>
                    )}
                </section>
                <section className={cx("policyId")}>
                    <h4 className={cx("policyId__name")}>PolicyID</h4>
                    <p className={cx("policyId__value")}>{covertString({ inputString: String(value.policyId) })}</p>
                    <CopyItem value={value.policyId} />
                </section>
            </div>
        </div>
    );
};

export default NftItem;
