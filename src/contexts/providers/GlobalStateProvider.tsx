"use client";

import React, { useState, ReactNode } from "react";
import GlobalStateContext from "@/contexts/components/GlobalStateContext";

type Props = {
    children: ReactNode;
};

const GlobalStateProvider = function ({ children }: Props) {
    const [revalidateSmartContract, setRevalidateSmartContract] = useState<boolean>(true);
    const [revalidateAccount, setRevalidateAccount] = useState<boolean>(true);
    return (
        <GlobalStateContext.Provider
            value={{
                revalidateAccount,
                setRevalidateAccount,
                revalidateSmartContract,
                setRevalidateSmartContract,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;
