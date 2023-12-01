"use client";

import React, { ReactNode, useState, useEffect, useContext } from "react";
import CartContext from "@/contexts/components/CartContext";
import AccountContext from "@/contexts/components/AccountContext";
import { AccountContextType } from "@/types/AccountContextType";
import { toast } from "react-toastify";
import { NftItemType } from "@/types/GenericsType";
import { get } from "@/utils/httpRequest";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    const { account } = useContext<AccountContextType>(AccountContext);

    const [cartItem, setCartItem] = useState({
        itemsList: [],
        totalPrice: 0,
        totalQuantity: 0,
        changed: true,
    });

    useEffect(() => {
        const fetchAssetsCartFromAccount = async function () {
            try {
                if (account) {
                    const data = await get("/nft/nft_cart", { walletAddress: account.walletAddress, page: 1 });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAssetsCartFromAccount();
    }, [account]);

    const addToCart = async function (newItem: any) {
        setCartItem((prev: any) => {
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

    const removeFromCart = async function ({ id, policyId, assetName }: NftItemType) {
        setCartItem((prev) => {
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
        setCartItem((prev) => {
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
        <CartContext.Provider value={{ cartItem, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default DemarketProvider;
