"use client";

import React, { ReactNode, lazy } from "react";

const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const DemarketProvider = lazy(() => import("@/contexts/providers/DemarketProvider"));
const WalletProvider = lazy(() => import("@/contexts/providers/WalletProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <LucidProvider>
            <DemarketProvider>
                <WalletProvider>{children}</WalletProvider>
            </DemarketProvider>
        </LucidProvider>
    );
};

export default ContextProvider;
