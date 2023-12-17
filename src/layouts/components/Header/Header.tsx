"use client";

import React, { useContext, useState } from "react";
import classNames from "classnames/bind";
import NavbarItem from "@/layouts/components/Header/HeaderOption";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Search from "@/layouts/components/Search";
import { CartContextType } from "@/types/CartContextType";
import CartContext from "@/contexts/components/CartContext";
import Cart from "@/components/Cart";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";
import { publicRouters } from "@/routes";
import Logo from "@/components/Logo";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import Avatar from "@/components/Avatar";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import { FaBars } from "react-icons/fa";
import Button from "@/components/Button";
const cx = classNames.bind(styles);
type Props = {
    selectedRouter: string;
    setSelectedRouter: React.Dispatch<React.SetStateAction<string>>;
};

const Header = function ({ selectedRouter, setSelectedRouter }: Props) {
    const { cartItem } = useContext<CartContextType>(CartContext);
    const { account } = useContext<AccountContextType>(AccountContext);
    const { toggleShowingSearch, toggleShowingCart } = useContext<ModalContextType>(ModalContext);

    return (
        <header className={cx("wrapper")}>
            <div className={cx("container")}>
                <Logo />
                <nav className={cx("navbar")}>
                    {publicRouters.map(function (publicRouter, index: number) {
                        return (
                            <NavbarItem
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
                    <div className={cx("button__other")}>
                        <div className={cx("icon__container")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={toggleShowingSearch} />
                        </div>
                        <div className={cx("icon__container")}>
                            <FontAwesomeIcon icon={faCartShopping} onClick={toggleShowingCart} />
                            <span>{cartItem.totalQuantity}</span>
                        </div>
                        <Avatar />
                    </div>

                    <ConnectWallet />

                    <Button>
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
