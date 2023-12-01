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
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";
import { publicRouters } from "@/routes";
import Logo from "@/components/Logo";
import ConnectWallet from "./ConnectWallet/ConnectWallet";

const cx = classNames.bind(styles);
type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<React.SetStateAction<string>>;
};

const Header = function ({ selectedRouter, setSelectedRouter }: Props) {
    const router = useRouter();

    const { cartItem } = useContext<CartContextType>(CartContext);
    const { account } = useContext<AccountContextType>(AccountContext);

    const { isShowing: isShowingDownloadWallet, toggle: toggleDownloadWallet } = useModal();
    const { isShowing: isShowingSearch, toggle: toggleShowingSearch } = useModal();
    const { isShowing: isShowingCart, toggle: toggleShowingCart } = useModal();

    const [openConnectWallet, setOpenConnectWallet] = useState<boolean>(false);

    const HandleOpenConnectWallet = function () {
        setOpenConnectWallet(!openConnectWallet);
    };

    return (
        <header className={cx("wrapper")}>
            <div className={cx("container")}>
                <Logo />
                <nav className={cx("navbar")}>
                    {publicRouters.map(function (publicRouter, index: number) {
                        return (
                            <HeaderOption
                                key={index}
                                text={publicRouter.name}
                                redirect={publicRouter.redirect}
                                isActive={Boolean(selectedRouter === publicRouter.name)}
                                setSelected={setSelectedRouter}
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
                            <span>{cartItem.totalQuantity}</span>
                        </div>
                        {account && (
                            <div className={cx("account__wrapper")} onClick={() => router.push(`/account/${walletItem.walletAddress}`)}>
                                <Image className={cx("account__image")} src={images.user} alt="" />
                            </div>
                        )}
                    </section>

                    <ConnectWallet />
                </div>
            </div>
            {/* download wallet begin */}
            <Modal isShowing={isShowingDownloadWallet} toggle={toggleDownloadWallet}>
                <div className={cx("wrapper__nowallet")}>
                    <section className={cx("nowallet__content")}>
                        <p>The selected wallet ( {walletItem.walletName} ) has not been installed. Do you want to visit Chrome Web Store and install it now?</p>
                    </section>
                    <div className={cx("nowallet__button")}>
                        <button className={cx("button__ok")} onClick={toggleDownloadWallet}>
                            CANCEL
                        </button>
                        <a target="_blank" href={walletItem.walletDownloadApi} className={cx("button__cancel")} rel="noopener noreferrer">
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
