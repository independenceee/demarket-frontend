"use client";

import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./HistoryItem.module.scss";
import images from "@/assets/images";
import { HistoryItemType } from "@/types/GenericsType";
import convertDatetimeBlocktime from "@/helpers/convertDatetimeBlocktime";

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
                        <div className={cx("key")}>Sell by: </div>
                        <div className={cx("value")}>{history.address}</div>
                    </div>
                    <div className={cx("infomation__content")}>
                        <div className={cx("key")}>Price: </div>
                        <div className={cx("value")}>{history.price / 1000000}</div>
                    </div>
                    <div className={cx("infomation__content")}>
                        <div className={cx("key")}>Datetime: </div>
                        <div className={cx("value")}>
                            {convertDatetimeBlocktime(Number(history.dateTime))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HistoryItem;
