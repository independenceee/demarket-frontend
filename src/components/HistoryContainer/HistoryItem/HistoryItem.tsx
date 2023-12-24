"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryItem.module.scss";

const cx = classNames.bind(styles);
type Props = {
    transaction: any;
};

const HistoryItem = function ({ transaction }: Props) {
    console.log(transaction);
    const [accountHistory, setAccountHistory] = useState<any>();

    useEffect(function () {}, [transaction]);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}></div>
        </div>
    );
};

export default HistoryItem;
