"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./NftItem.module.scss";
import images from "@/assets/images";
import covertString from "@/helpers/convertString";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import checkMediaType from "@/helpers/checkMediaType";
import { toast } from "react-toastify";
import convertHexToString from "@/helpers/convertHexToString";
import CopyItem from "../CopyItem";

const cx = classNames.bind(styles);
type Props = {
    value: any;
    index: number;
};

const NftItem = function ({ value, index }: Props) {
    const [copied, setCopied] = useState<boolean>(false);
    const handleCopyToClipboard = function () {
        setCopied(true);
        toast.success("Copy to clipboard!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(function () {
            setCopied(false);
        }, 1000);
    };

    return (
        <div
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
                    {value.price && <h3 className={cx("price")}>{Number(value.price) / 1000000} ADA</h3>}
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
