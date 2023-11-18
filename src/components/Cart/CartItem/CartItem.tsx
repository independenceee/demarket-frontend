import React from "react";
import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";
import images from "@/assets/images";
import Image from "next/image";

const cx = classNames.bind(styles);

type Props = {};
const CartItem = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("image__wrapper")}>
                    <Image className={cx("image")} src={images.background} alt="" />
                </div>
                <div className={cx("information__wrapper")}>
                    <div>policyId</div>
                    <div>assetName</div>
                    <div>Seller address</div>
                </div>
            </div>
            <div className={cx("price")}>100 ADA</div>
        </div>
    );
};

export default CartItem;
