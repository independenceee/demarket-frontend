"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./CartItem.module.scss";
import { TrashIcon } from "@/components/Icons";
import convertHexToString from "@/helpers/convertHexToString";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import covertString from "@/helpers/convertString";
import CartContext from "@/contexts/components/CartContext";
import { CartContextType } from "@/types/CartContextType";

const cx = classNames.bind(styles);

type Props = {
    cartItem: any;
};

const CartItem = function ({ cartItem }: Props) {
    const router = useRouter();
    const { removeFromCart } = useContext<CartContextType>(CartContext);

    const handleRemoveFromCart = async function () {
        await removeFromCart({ policyId: cartItem.policyId, assetName: cartItem.assetName, id: cartItem.id });
    };
    return (
        <div className={cx("wrapper")} onClick={() => router.push(`/detail/${cartItem.policyId + cartItem.assetName}`)}>
            <div className={cx("inner")}>
                <div className={cx("image__wrapper")}>
                    <img className={cx("image")} src={String(convertIpfsAddressToUrl(cartItem.image))} alt="" />
                </div>
                <div className={cx("information__wrapper")}>
                    <div className={cx("name")}>{String(convertHexToString(cartItem.assetName))}</div>
                    <div className={cx("policyId")}>{String(covertString({ inputString: cartItem.policyId }))}</div>
                    <div className={cx("policyId")}>Selling</div>
                </div>
            </div>
            <div className={cx("price")}>{Number(cartItem.price) / 1000000} ADA</div>
            <div className={cx("trash")} onClick={handleRemoveFromCart}>
                <TrashIcon />
            </div>
        </div>
    );
};

export default CartItem;
