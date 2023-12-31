"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const DemarketProvider = lazy(() => import("@/contexts/providers/DemarketProvider"));
const ModalProvider = lazy(() => import("@/contexts/providers/ModalProvider"));
const SmartContractProvider = lazy(() => import("@/contexts/providers/SmartContractProvider"));
const CartProvider = lazy(() => import("@/contexts/providers/CartProvider"));
const AccountProvider = lazy(() => import("@/contexts/providers/AccountProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <ModalProvider>
            <LucidProvider>
                <SmartContractProvider>
                    <DemarketProvider>
                        <AccountProvider>
                            <CartProvider>{children}</CartProvider>
                        </AccountProvider>
                    </DemarketProvider>
                </SmartContractProvider>
            </LucidProvider>
        </ModalProvider>
    );
};

export default ContextProvider;
