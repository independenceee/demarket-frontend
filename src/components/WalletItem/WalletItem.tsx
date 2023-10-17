"use client";
import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./WalletItem.module.scss";
import { LucidContext } from "@/contexts/LucidContext";
import { LucidContextType } from "@/types";

const cx = classNames.bind(styles);
type Props = {
    image: any;
    name: string;
    walletDownload: any;
    connect: () => void;
    checkExistWallet: any;
    toggle: () => void;
};
const WalletItem = function ({
    image,
    name,
    walletDownload,
    checkExistWallet,
    connect,
    toggle,
}: Props) {
    const { connectWallet } = useContext<LucidContextType>(LucidContext);
    const handleConnectWallet = async function () {
        try {
            if (checkExistWallet) {
                toggle();
                await connectWallet(connect);
            } else {
            }
        } catch (error) {}
    };

    return (
        <div className={cx("wrapper")} onClick={handleConnectWallet}>
            <Image src={image} alt="" className={cx("image")} />
            <div className={cx("title")}>
                {name} <span> WALLET</span>
            </div>
        </div>
    );
};

export default WalletItem;
