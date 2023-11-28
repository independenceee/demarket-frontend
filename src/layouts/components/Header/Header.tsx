"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import images from "@/assets/images";
import HeaderOption from "@/layouts/components/Header/HeaderOption";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/hooks";
import Modal from "@/components/Modal";
import Search from "@/layouts/components/Search";
import { CartContextType } from "@/types/CartContextType";
import LucidContext from "@/contexts/components/LucidContext";
import CartContext from "@/contexts/components/CartContext";
import Cart from "@/components/Cart";
import wallets from "@/constants/wallets";
import { LucidContextType } from "@/types/LucidContextType";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";
import { WalletItemType } from "@/types/GenericsType";
import configs from "@/configs";

const cx = classNames.bind(styles);
type Props = {};

const Header = function ({}: Props) {
    const router = useRouter();
    const { account } = useContext<AccountContextType>(AccountContext);
    const { cartState } = useContext<CartContextType>(CartContext);

    const { isShowing: isShowingDownloadWallet, toggle: toggleDownloadWallet } = useModal();
    const { isShowing: isShowingSearch, toggle: toggleShowingSearch } = useModal();
    const { isShowing: isShowingCart, toggle: toggleShowingCart } = useModal();

    const { connectWallet, lucidWallet, disconnectWallet, walletItem } = useContext<LucidContextType>(LucidContext);

    const [selected, setSelected] = useState<string>("HOME");
    const [openConnectWallet, setOpenConnectWallet] = useState<boolean>(false);

    const [walletName, setWalletName] = useState<string>("");
    const [walletDownload, setWalletDownload] = useState<string | any>("");

    const HandleOpenConnectWallet = function () {
        setOpenConnectWallet(!openConnectWallet);
    };

    return (
        <header className={cx("wrapper")}>
            <div className={cx("container")}>
                <Link href={"/"} className={cx("logo__wrapper")}>
                    <Image src={images.logo} alt="" className={cx("logo__image")} />
                </Link>
                <nav className={cx("navbar")}>
                    {configs.headerOptions.map(function (headerOption, index: number) {
                        return (
                            <HeaderOption
                                key={index}
                                text={headerOption.text}
                                redirect={headerOption.redirect}
                                isActive={Boolean(selected === headerOption.text)}
                                setSelected={setSelected}
                            />
                        );
                    })}
                </nav>
                <div className={cx("button__wrapper")}>
                    <section className={cx("button__other")}>
                        <div className={cx("icon__container")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleShowingSearch} />
                        </div>
                        <div className={cx("icon__container")}>
                            <FontAwesomeIcon icon={faCartShopping} onClick={toggleShowingCart} />
                            <span>{cartState.totalQuantity}</span>
                        </div>
                        {account && (
                            <div
                                className={cx("account__wrapper")}
                                onClick={() => router.push(`/account/${walletItem.walletAddress}`)}
                            >
                                <Image className={cx("account__image")} src={images.user} alt="" />
                            </div>
                        )}
                    </section>

                    {!lucidWallet ? (
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
                                                    setWalletDownload(walletDownload);
                                                    toggleDownloadWallet();
                                                    return;
                                                }

                                                connectWallet({
                                                    walletApi: wallet.walletApi,
                                                    walletCheckApi: walletItem.walletCheckApi,
                                                    walletName: walletItem.walletName,
                                                    walletImage: walletItem.walletImage,
                                                });
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        };
                                        return (
                                            <div
                                                onClick={handleConnectWallet}
                                                key={index}
                                                className={cx("wallet__items")}
                                            >
                                                <div className={cx("wallet__item")}>
                                                    <Image
                                                        className={cx("wallet__item--image")}
                                                        src={wallet.walletImage}
                                                        alt=""
                                                    />
                                                    <span className={cx("wallet__item--name")}>
                                                        {wallet.walletName}
                                                    </span>
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
                </div>
            </div>
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

            {/* modal showing search start */}
            <Modal isShowing={isShowingSearch} toggle={toggleShowingSearch}>
                <Search />
            </Modal>
            {/* modal showing search end */}

            {/* modal showing cart begin */}
            <Modal isShowing={isShowingCart} toggle={toggleShowingCart}>
                <Cart />
            </Modal>
            {/* modal showing cart end */}
        </header>
    );
};

export default Header;
