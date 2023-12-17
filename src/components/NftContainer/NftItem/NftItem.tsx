"use client";
import React, { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { contractAddress } from "@/libs";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "@/contexts/components/CartContext";
import { LucidContextType } from "@/types/LucidContextType";
import { SmartContractType } from "@/types/SmartContextType";
import { CartContextType } from "@/types/CartContextType";

const cx = classNames.bind(styles);
type Props = {
    value: any;
    index: number;
};

const NftItem = function ({ value, index }: Props) {
    const { id } = useParams();
    const router = useRouter();

    const { walletItem, lucidWallet } = useContext<LucidContextType>(LucidContext);
    const { buyAsset, refundAsset } = useContext<SmartContractType>(SmartContractContext);
    const { addToCart } = useContext<CartContextType>(CartContext);

    const handleBuyNft = async function () {
        try {
            if (lucidWallet) {
                await buyAsset({
                    assetName: value.assetName,
                    policyId: value.policyId,
                    lucid: lucidWallet,
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
            if (lucidWallet) {
                router.push(`/detail/${value.policyId + value.assetName}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefundNft = async function () {
        try {
            if (lucidWallet) {
                await refundAsset({
                    assetName: value.assetName,
                    lucid: lucidWallet,
                    policyId: value.policyId,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = async function () {
        try {
            await addToCart(value);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <div className={cx("container")} onClick={() => router.push(`/detail/${value.policyId + value.assetName}`)}>
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
                    <h3 className={cx("content__title")}>{value.mediaType ? value.mediaType.split("/").pop() : ""}</h3>
                </section>
                <section className={cx("information")}>
                    <div className={cx("author")}>
                        <Image className={cx("avatar")} src={images.user} alt="" />
                        {value.price && <h3 className={cx("name")}>{value.sellerAddress}</h3>}
                        {!value.price && <h3 className={cx("name")}>{value.currentAddress}</h3>}
                    </div>
                    {value.price && (
                        <h3 className={cx("price")}>
                            <CountUp start={0} end={Number(value.price) / 1000000 || 0} duration={2} delay={0} /> ADA
                        </h3>
                    )}
                </section>
                <section className={cx("policyId")}>
                    <h4 className={cx("policyId__name")}>PolicyID</h4>
                    <p className={cx("policyId__value")}>
                        <span className={cx("policyId__convert")}>{value.policyId}</span>{" "}
                        <span>{value.policyId.slice(-5)}</span>
                    </p>
                    <CopyItem value={value.policyId} />
                </section>
            </div>

            {value.sellerAddress === walletItem.walletAddress && value.currentAddress === contractAddress && (
                <div className={cx("option__wrapper")}>
                    <div onClick={handleRefundNft} className={cx("option__title")}>
                        Refund Now
                    </div>
                    <div className={cx("option__icon")} onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                </div>
            )}
            {value.sellerAddress !== walletItem.walletAddress && value.price && (
                <div className={cx("option__wrapper")}>
                    <div onClick={handleBuyNft} className={cx("option__title")}>
                        Buy Now
                    </div>
                    <div className={cx("option__icon")} onClick={handleAddToCart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                </div>
            )}
            {!value.price && walletItem.walletAddress === id && (
                <div className={cx("option__wrapper")}>
                    <div onClick={handleSellNft} className={cx("option__title")}>
                        Selling Now
                    </div>
                </div>
            )}
        </div>
    );
};

export default NftItem;
