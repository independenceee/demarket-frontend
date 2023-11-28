"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import Image from "next/image";
import images from "@/assets/images";
import { AccountItemType } from "@/types/GenericsType";

const cx = classNames.bind(styles);

type Props = {
    account: AccountItemType;
    index: number;
};

const AccountItem = function ({ account, index }: Props) {
    const router = useRouter();

    return (
        <div
            className={cx("wrapper")}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
            onClick={() => router.push(`/account/${account.address}`)}
        >
            <div className={cx("container")}>
                <header className={cx("header")}>
                    <div className={cx("background__wrapper")}>
                        <Image
                            className={cx("background__image")}
                            src={account.cover || images.noImage}
                            alt="Backgound Image"
                        />
                    </div>
                    <div className={cx("avatar__wrapper")}>
                        <Image className={cx("avatar__image")} src={account.avatar || images.user} alt="User Image" />
                    </div>
                </header>
                <section className={cx("content")}>
                    <div className={cx("content__left")}>
                        <h3 className={cx("content__left--name")}>{account.name}</h3>
                        <p className={cx("content__left--amount")}>{account.rating}</p>
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
