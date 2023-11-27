"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const DemarketProvider = lazy(() => import("@/contexts/providers/DemarketProvider"));
const WalletProvider = lazy(() => import("@/contexts/providers/WalletProvider"));
const SmartContractProvider = lazy(() => import("@/contexts/providers/SmartContractProvider"));
const CartProvider = lazy(() => import("@/contexts/providers/CartProvider"));
const AccountProvider = lazy(() => import("@/contexts/providers/AccountProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <SmartContractProvider>
                <DemarketProvider>
                    <AccountProvider>
                        <CartProvider>
                            <WalletProvider>{children}</WalletProvider>
                        </CartProvider>
                    </AccountProvider>
                </DemarketProvider>
            </SmartContractProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
