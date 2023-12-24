import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import images from "@/assets/images";
import { VerifiedIcon } from "../../Icons";
import styles from "./AccountItemSilder.module.scss";
import { AccountItemType } from "@/types/GenericsType";

const cx = classNames.bind(styles);

type Props = {
    index: number;
    account: AccountItemType;
};

const AccountItemSilder = function ({ account, index }: Props) {
    return (
        <Link
            href={{ pathname: `account/${account.walletAddress}` }}
            data-aos="zoom-in-up"
            data-aos-delay={`${100 * (index + 4)}`}
            data-aos-duration={`${1000 * (index + 4)}`}
            className={cx("wrapper")}
        >
            <section className={cx("avatar__wrapper")}>
                <div className={cx("avatar__container")}>
                    <Image
                        className={cx("avatar__image")}
                        src={account.avatar ? account.avatar : images.user}
                        alt="Avatar"
                    />
                </div>
            </section>
            <section className={cx("content__wrapper")}>
                <div className={cx("content__main")}>
                    <h2 className={cx("content__main--name")}> {account.userName}</h2>
                    <VerifiedIcon className={cx("content__main--icon")} />
                </div>
                <div className={cx("content__information")}>
                    0 Order <span>•</span> 0 Product
                </div>
            </section>
        </Link>
    );
};

export default AccountItemSilder;
