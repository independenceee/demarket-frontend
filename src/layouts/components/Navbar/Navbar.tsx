"use client";

import React, { lazy, useState } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/hooks";
import images from "@/assets/images";
import styles from "./Navbar.module.scss";
import Search from "@/layouts/components/Search";
import { BarIcon, CloseIcon, DownArrowIcon, SearchIcon } from "@/components/Icons";
import Modal from "@/components/Modal";
import wallets from "@/constants/wallets";
import { WalletItemType } from "@/types/GenericsType";

const WalletItem = lazy(() => import("@/components/WalletContainer/WalletItemLong"));

const cx = classNames.bind(styles);

type Props = {};

const Navbar = function ({}: Props) {
    const { isShowing: isShowingWalletFull, toggle: toggleWalletFull } = useModal();
    const { isShowing: isShowingDownloadWallet, toggle: toggleDownloadWallet } = useModal();
    const [walletName, setWalletName] = useState<string>("");
    const [walletDownload, setWalletDownload] = useState<string>("");

    return (
        <nav className={cx("navbar")}>
            <Link href={{ pathname: "/" }} className={cx("logo__wrapper")}>
                <Image className={cx("logo__wrapper--image")} src={images.logo} alt="Logo Image" />
            </Link>

            <button onClick={toggleWalletFull} className={cx("button__wrapper")}>
                <span>CONNECT WALLET</span>
                <DownArrowIcon />
            </button>

            {/* connect wallet short begin */}
            {/* connect wallet short end */}

            {/* connect wallet full begin */}
            <Modal isShowing={isShowingWalletFull} toggle={toggleWalletFull}>
                <div className={cx("wallet-wrapper")}>
                    <header className={cx("wallet-header")}>
                        <h2 className={cx("wallet-title")}>Select wallet to connect</h2>
                        <div className={cx("wallet-close")} onClick={toggleWalletFull}>
                            <CloseIcon />
                        </div>
                    </header>
                    <section className={cx("wallet-list")}>
                        {wallets.map(function (walletItem: WalletItemType, index) {
                            return (
                                <WalletItem
                                    key={index}
                                    walletItem={walletItem}
                                    toggleWalletFull={toggleWalletFull}
                                    toggleDownloadWallet={toggleDownloadWallet}
                                />
                            );
                        })}
                    </section>
                </div>
            </Modal>
            {/* connect wallet full end */}

            {/* download wallet begin */}
            <Modal isShowing={isShowingDownloadWallet} toggle={toggleDownloadWallet}>
                <div className={cx("wrapper__nowallet")}>
                    <section className={cx("nowallet__content")}>
                        <p>
                            The selected wallet ({walletName}) has not been installed. Do you want to visit Chrome Web
                            Store and install it now?
                        </p>
                    </section>
                    <div className={cx("nowallet__button")}>
                        <button className={cx("button__ok")} onClick={toggleDownloadWallet}>
                            CANCEL
                        </button>
                        <a
                            target="_blank"
                            href={walletDownload}
                            className={cx("button__cancel")}
                            rel="noopener noreferrer"
                        >
                            OK
                        </a>
                    </div>
                </div>
            </Modal>
            {/* download wallet end*/}
        </nav>
    );
};

export default Navbar;
