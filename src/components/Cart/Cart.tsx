"use client";

import React, { useContext } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CartContextType } from "@/types";
import CartContext from "@/contexts/components/CartContext";
import CartItem from "@/components/Cart/CartItem";

const cx = classNames.bind(styles);
type Props = {};
const Cart = function ({}: Props) {
    const { cartState } = useContext<CartContextType>(CartContext);
    return (
        <main className={cx("wrapper")} data-aos="fade-left">
            <header className={cx("header")}>
                <section className={cx("header__title")}>
                    <div className={cx("title__left")}>
                        <span>Your cart</span>
                    </div>
                    <div className={cx("title__right")}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </section>
                <section className={cx("header__description")}>
                    <span>{cartState.totalQuantity} items</span>
                    <span>Clear all</span>
                </section>
            </header>
            <div className={cx("container")}>
                {cartState.itemsList.map(function (cartItem, index) {
                    return <CartItem key={index} />;
                })}
            </div>
            <footer className={cx("total__price")}>
                <span>Total price</span>
                <span>{cartState.totalPrice} ADA</span>
            </footer>
            <button className={cx("button")}>Complete purchase</button>
        </main>
    );
};

export default Cart;
