"use client";

import React, { lazy } from "react";
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/hooks";
import images from "@/assets/images";
import styles from "./Navbar.module.scss";
import { DownArrowIcon } from "@/components/Icons";
import Modal from "@/components/Modal";

const WalletItem = lazy(() => import("@/components/WalletItem"));

const cx = classNames.bind(styles);

type Props = {};

const Navbar = function ({}: Props) {
    const { isShowing, toggle } = useModal();
    return (
        <nav className={cx("navbar")}>
            <Link href={{ pathname: "/" }} className={cx("logo__wrapper")}>
                <Image className={cx("logo__wrapper--image")} src={images.logo} alt="Logo Image" />
            </Link>

            <button onClick={toggle} className={cx("button__wrapper")}>
                <span>CONNECT WALLET</span>
                <DownArrowIcon />
            </button>

            <Modal isShowing={isShowing} toggle={toggle}>
                <div className={cx("wrapper__nowallet")}>
                    <section className={cx("nowallet__content")}>
                        <p>
                            The selected wallet (Typhon) has not been installed. Do you want to visit Chrome Web Store
                            and install it now?
                        </p>
                    </section>
                    <div className={cx("nowallet__button")}>
                        <button className={cx("button__ok")}>CANCEL</button>
                        <button className={cx("button__cancel")}>OK</button>
                    </div>
                </div>
            </Modal>
        </nav>
    );
};

export default Navbar;
