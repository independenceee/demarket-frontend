"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon, CheckIcon } from "@/components/Icons";
import styles from "./NftItem.module.scss";
import images from "@/assets/images";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
type Props = {
    value: any;
    index: number;
};

function extractChars(inputStr: string) {
    var firstChars = inputStr.slice(0, 4);
    var lastChars = inputStr.slice(-6);
    return firstChars + "..." + lastChars;
}

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
                    <img
                        className={cx("image")}
                        src={`https://ipfs.io/ipfs/QmPgjREBxyeZXoSUPTr7ZfdcF9egM6DK55jRHkX6HuZQfD`}
                        alt=""
                    />
                </section>
                <section className={cx("content")}>
                    <h3 className={cx("content__title")}>The Dark world</h3>
                    <h3 className={cx("content__title")}>Art</h3>
                </section>
                <section className={cx("information")}>
                    <div className={cx("author")}>
                        <Image className={cx("avatar")} src={images.background} alt="" />
                        <h3 className={cx("name")}>Creator</h3>
                    </div>
                    <h3 className={cx("price")}>100 ADA</h3>
                </section>
                <section className={cx("policyId")}>
                    <h4 className={cx("policyId__name")}>PolicyID</h4>
                    <p className={cx("policyId__value")}>
                        {extractChars(
                            "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
                        )}
                    </p>
                    <CopyToClipboard
                        text={"977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07"}
                        onCopy={() => handleCopyToClipboard()}
                    >
                        {copied ? (
                            <div className={cx("icon__wrapper")}>
                                <CheckIcon width={"16px"} height={"16"} />
                            </div>
                        ) : (
                            <div className={cx("icon__wrapper")}>
                                <CopyIcon width={"16px"} height={"16"} />
                            </div>
                        )}
                    </CopyToClipboard>
                </section>
            </div>
        </div>
    );
};

export default NftItem;
