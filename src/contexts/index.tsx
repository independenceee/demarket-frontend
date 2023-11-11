"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const DemarketProvider = lazy(() => import("@/contexts/providers/DemarketProvider"));
const WalletProvider = lazy(() => import("@/contexts/providers/WalletProvider"));
const SmartContractProvider = lazy(() => import("@/contexts/providers/SmartContractProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <SmartContractProvider>
                <DemarketProvider>
                    <WalletProvider>{children}</WalletProvider>
                </DemarketProvider>
            </SmartContractProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
