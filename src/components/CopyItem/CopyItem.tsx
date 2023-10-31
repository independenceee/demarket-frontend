"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./CopyItem.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { CheckIcon, CopyIcon } from "@/components/Icons";
const cx = classNames.bind(styles);
type Props = {
    value: string;
};

const CopyItem = function ({ value }: Props) {
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
        <CopyToClipboard text={value} onCopy={() => handleCopyToClipboard()}>
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
    );
};

export default CopyItem;
