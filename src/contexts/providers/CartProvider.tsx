"use client";

import React, { ReactNode, useState } from "react";
import CartContext from "@/contexts/components/CartContext";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    const [cartState, setCartState] = useState({
        itemsList: [],
        totalPrice: 0,
        totalQuantity: 0,
        showCart: false,
        changed: false,
    });

    const replaceData = function (data: any) {
        setCartState((prev) => ({
            ...prev,
            totalQuantity: data.totalQuantity,
            itemsList: data.itemsList,
        }));
    };

    const addToCart = async function (newItem: any) {
        setCartState((prev: any) => {
            const existingItem = prev.itemsList.find((item: any) => item.id === newItem.id);

            if (existingItem) {
                return { ...prev, changed: false };
            } else {
                return {
                    ...prev,
                    itemsList: [
                        ...prev.itemsList,
                        {
                            id: newItem.id,
                            price: newItem.price,
                            name: newItem.name,
                        },
                    ],
                    totalQuantity: prev.totalQuantity + 1,
                    changed: true,
                };
            }
        });
    };

    const removeFromCart = async function (idToRemove: any) {
        setCartState((prev) => {
            const updatedItemsList = prev.itemsList.filter((item: any) => item.id !== idToRemove);

            return {
                ...prev,
                itemsList: updatedItemsList,
                totalQuantity: updatedItemsList.length,
                changed: true,
            };
        });
    };

    return <CartContext.Provider value={{ cartState }}>{children}</CartContext.Provider>;
};

export default DemarketProvider;
