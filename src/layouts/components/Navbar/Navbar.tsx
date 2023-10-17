"use client";

import React, { lazy } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import images from "@/assets/images";
import { useModal } from "@/hooks";
import { CloseIcon } from "@/components/Icons";
import wallets from "@/constants/wallets";
import styles from "./Navbar.module.scss";

const WalletItem = lazy(() => import("@/components/WalletItem"));

const cx = classNames.bind(styles);

type Props = {};

const Navbar = function ({}: Props) {
    const { toggle, isShowing } = useModal();
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {/* logo-begin */}
                <div className={cx("logo-container")}>
                    <Image className={cx("logo")} src={images.logo} alt="" />
                </div>
                {/* logo-end */}
                {/* connect wallet begin */}
                <Button onClick={toggle}>
                    Connect Wallet
                </Button>
                <Modal isShowing={isShowing} toggle={toggle}>
                    <div className={cx("wallet-wrapper")}>
                        <header className={cx("wallet-header")}>
                            <h2 className={cx("wallet-title")}>
                                Select wallet to connect
                            </h2>
                            <div className={cx("wallet-close")} onClick={toggle}>
                                <CloseIcon />
                            </div>
                        </header>
                        <section className={cx("wallet-list")}>
                            {wallets.map(function (
                                {
                                    name,
                                    image,
                                    connect,
                                    checkExistWallet,
                                    walletDownload,
                                },
                                index,
                            ) {
                                return (
                                    <WalletItem
                                        name={name}
                                        image={image}
                                        key={index}
                                        connect={connect}
                                        checkExistWallet={checkExistWallet}
                                        walletDownload={walletDownload}
                                        toggle={toggle}
                                    />
                                );
                            })}
                        </section>
                    </div>
                </Modal>
                {/* connect wallet end */}
            </div>
        </div>
    );
};

export default Navbar;
