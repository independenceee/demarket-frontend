import images from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";

const cx = classNames.bind(styles);

type Props = {};

const ConnectWallet = function ({}: Props) {
    const { connectWallet, lucidWallet, disconnectWallet, walletItem, setWalletItem } = useContext<LucidContextType>(LucidContext);

    
    return (

            <section className={cx("button__container")}>
                <Link href="#" onClick={HandleOpenConnectWallet} className={cx("connect__button")}>
                    Connect Wallet
                </Link>
                {openConnectWallet && (
                    <div className={cx("wallet__item--short")}>
                        {wallets.map(function (wallet: WalletItemType, index: number) {
                            const handleConnectWallet = async function () {
                                try {
                                    if (!(await wallet.walletCheckApi())) {
                                        setWalletItem(function (walletPrevious: WalletItemType) {
                                            return {
                                                ...walletPrevious,
                                                walletDownloadApi: wallet.walletDownloadApi,
                                                walletName: wallet.walletName,
                                            };
                                        });
                                        toggleDownloadWallet();
                                        return;
                                    }

                                    connectWallet({
                                        walletApi: wallet.walletApi,
                                        walletCheckApi: wallet.walletCheckApi,
                                        walletName: wallet.walletName,
                                        walletImage: wallet.walletImage,
                                    });
                                } catch (error) {
                                    console.log(error);
                                }
                            };
                            return (
                                <div onClick={handleConnectWallet} key={index} className={cx("wallet__items")}>
                                    <div className={cx("wallet__item")}>
                                        <Image className={cx("wallet__item--image")} src={wallet.walletImage} alt="" />
                                        <span className={cx("wallet__item--name")}>{wallet.walletName}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        ) : (
            <section className={cx("connect__success")}>
                <div className={cx("button__image--container")}>
                    <Image className={"button__image--image"} src={walletItem.walletImage} alt="" />
                </div>
                <div className={cx("button__balance")}>{walletItem.walletBalance} ADA</div>
            </section>
        )}
    );
};

export default ConnectWallet;
