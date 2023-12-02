"use client";

import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./WalletItem.module.scss";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";
import { WalletItemType } from "@/types/GenericsType";

const cx = classNames.bind(styles);
type Props = {
    walletItem: WalletItemType;

    toggleWalletFull: () => void;
    toggleDownloadWallet: () => void;
};
const WalletItem = function ({
    walletItem,

    toggleWalletFull,
    toggleDownloadWallet,
}: Props) {
    const { connectWallet } = useContext<LucidContextType>(LucidContext);
    const handleConnectWallet = async function () {};

    return (
        <div className={cx("wrapper")} onClick={handleConnectWallet}>
            <div className={cx("container")}>
                <Image src={""} alt="" className={cx("image")} />
                <div className={cx("title")}>
                    {""} <span> WALLET</span>
                </div>
            </div>
        </div>
    );
};

export default WalletItem;
