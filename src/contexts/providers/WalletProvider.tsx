"use client";

import React, { ReactNode, useState } from "react";
import WalletContext from "@/contexts/components/WalletContext";

type Props = {
    children: ReactNode;
};

const WalletProvider = function ({ children }: Props) {
    const [openWalletShort, setOpenWalletShort] = useState<boolean>(false);

    return <WalletContext.Provider value={{ openWalletShort }}>{children}</WalletContext.Provider>;
};

export default WalletProvider;
