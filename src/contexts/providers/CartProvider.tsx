"use client";

import React, { ReactNode, useState } from "react";
import CartContext from "@/contexts/components/CartContext";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    const [itemsList, setItemsList] = useState<Array<any>>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);

    return (
        <CartContext.Provider
            value={{
                itemsList,
                totalQuantity,
                changed,
                showCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default DemarketProvider;
