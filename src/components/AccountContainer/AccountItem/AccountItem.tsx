"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import Image from "next/image";
import images from "@/assets/images";

const cx = classNames.bind(styles);

type Props = {
    data: any[];
    index: number;
};

const AccountItem = function ({ data, index }: Props) {
    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
        >
            <div className={cx("container")}>
                <header className={cx("header")}>
                    <div className={cx("background__wrapper")}>
                        <Image
                            className={cx("background__image")}
                            src={images.background}
                            alt="Backgound Image"
                        />
                    </div>
                    <div className={cx("avatar__wrapper")}>
                        <Image
                            className={cx("avatar__image")}
                            src={images.user}
                            alt="User Image"
                        />
                    </div>
                </header>
                <section className={cx("content")}>
                    <div className={cx("content__left")}>
                        <h3 className={cx("content__left--name")}>Join Wick</h3>
                        <p className={cx("content__left--amount")}>100 NFT</p>
                    </div>
                    <div className={cx("content_right")}>
                        <button className={cx("content_right--button")}>Follow</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AccountItem;
