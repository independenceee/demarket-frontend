"use client";

import React, { ReactNode, useState, useEffect } from "react";
import CartContext from "@/contexts/components/CartContext";
import { toast } from "react-toastify";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    const [cartState, setCartState] = useState({
        itemsList: [],
        totalPrice: 0,
        totalQuantity: 0,
        changed: false,
    });

    const fetchCartFromAccount = async function () {};
    useEffect(function() {

    }, [])

    const addToCart = async function (newItem: any) {
        setCartState((prev: any) => {
            const existingItem = prev.itemsList.find(
                (item: any) => item.assetName === newItem.assetName && item.policyId === newItem.policyId,
            );

            if (existingItem) {
                toast.warn("Asset already exits to cart", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return { ...prev, changed: false };
            } else {
                toast.success("Add to cart asset successfully", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return {
                    ...prev,
                    itemsList: [...prev.itemsList, newItem],
                    totalQuantity: prev.totalQuantity + 1,
                    totalPrice: prev.totalPrice + Number(newItem.price) / 1000000,
                    changed: true,
                };
            }
        });
    };

    const removeFromCart = async function ({
        id,
        policyId,
        assetName,
    }: {
        id: string;
        policyId: string;
        assetName: string;
    }) {
        setCartState((prev) => {
            const updatedItemsList: any = prev.itemsList.filter(
                (item: any) => item.id !== id || (item.policyId !== policyId && item.assetName !== assetName),
            );
            const updatedTotalPrice = updatedItemsList.reduce(function (total: number, item: any) {
                return total + Number(item.price);
            }, 0);

            return {
                ...prev,
                itemsList: updatedItemsList,
                totalPrice: updatedTotalPrice,
                totalQuantity: updatedItemsList.length,
                changed: true,
            };
        });
    };

    const clearCart = async function () {
        setCartState((prev) => {
            return {
                ...prev,
                itemsList: [],
                totalPrice: 0,
                totalQuantity: 0,
                changed: true,
            };
        });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default DemarketProvider;
