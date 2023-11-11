"use client";

import React, { useContext } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./WalletItem.module.scss";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types";

const cx = classNames.bind(styles);
type Props = {
    image: any;
    name: string;
    downloadApi?: any;
    api: () => Promise<void>;
    checkApi: () => Promise<boolean>;
    toggleWalletFull: () => void;
    toggleDownloadWallet: () => void;
    setWalletName: React.Dispatch<React.SetStateAction<string>>;
    setWalletDownload: React.Dispatch<React.SetStateAction<string>>;
};
const WalletItem = function ({
    name,
    image,
    checkApi,
    downloadApi,
    api,
    toggleWalletFull,
    toggleDownloadWallet,
    setWalletName,
    setWalletDownload,
}: Props) {
    const { connectWallet } = useContext<LucidContextType>(LucidContext);
    const handleConnectWallet = async function () {
        try {
            if (!(await checkApi())) {
                setWalletName(name);
                setWalletDownload(downloadApi);
                toggleWalletFull();
                toggleDownloadWallet();
                return;
            }

            connectWallet({ api, image, name, checkApi });
            toggleWalletFull();
        } catch (error) {}
    };

    return (
        <div className={cx("wrapper")} onClick={handleConnectWallet}>
            <div className={cx("container")}>
                <Image src={image} alt="" className={cx("image")} />
                <div className={cx("title")}>
                    {name} <span> WALLET</span>
                </div>
            </div>
        </div>
    );
};

export default WalletItem;
