import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import images from "@/assets/images";
import { VerifiedIcon } from "../Icons";
import styles from "./AccountItemSilder.module.scss";

const cx = classNames.bind(styles);

type Props = {
    avatar: string;
};

const AccountItemSilder = function ({ avatar }: Props) {
    return (
        <Link href={{ pathname: "" }} className={cx("wrapper")}>
            <section className={cx("avatar__wrapper")}>
                <div className={cx("avatar__container")}>
                    <Image className={cx("avatar__image")} src={avatar ? avatar : images.user} alt="Avatar" />
                </div>
            </section>
            <section className={cx("content__wrapper")}>
                <div className={cx("content__main")}>
                    <h2 className={cx("content__main--name")}> Khanh</h2>
                    <VerifiedIcon className={cx("content__main--icon")} />
                </div>
                <div className={cx("content__information")}>
                    21 Works <span>•</span> 35 Loves
                </div>
            </section>
        </Link>
    );
};

export default AccountItemSilder;
