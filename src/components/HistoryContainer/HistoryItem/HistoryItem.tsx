"use client";

import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./HistoryItem.module.scss";
import images from "@/assets/images";
import { HistoryItemType } from "@/types/GenericsType";

const cx = classNames.bind(styles);
type Props = {
    history: HistoryItemType;
};

const HistoryItem = function ({ history }: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("avatar__wrapper")}>
                    <Image className={cx("avatar__image")} src={images.user} alt="" />
                </section>
                <section className={cx("infomation__wrapper")}>
                    <div className={cx("infomation__content")}>
                        <span>Sell by: </span>add
                    </div>
                    <div className={cx("infomation__content")}>
                        <span>Price: </span>12ada
                    </div>
                    <div className={cx("infomation__content")}>
                        <span>Datetime: </span> 17/11/2003
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HistoryItem;
