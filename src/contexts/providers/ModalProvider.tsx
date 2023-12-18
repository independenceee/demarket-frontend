"use client";

import React, { ReactNode } from "react";
import ModalContext from "@/contexts/components/ModalContext";
import { useModal } from "@/hooks";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    const { isShowing: isShowingDownloadWallet, toggle: toggleDownloadWallet } = useModal();
    const { isShowing: isShowingSearch, toggle: toggleShowingSearch } = useModal();
    const { isShowing: isShowingCart, toggle: toggleShowingCart } = useModal();
    const { isShowing: isShowingWalletShort, toggle: toggleShowingWalletShort } = useModal();
    const { isShowing: isShowingWalletLong, toggle: toggleShowingWalletLong } = useModal();
    const { isShowing: isShowingInfomationAccount, toggle: toggleShowingInfomationAccount } = useModal();

    return (
        <ModalContext.Provider
            value={{
                isShowingDownloadWallet,
                toggleDownloadWallet,
                isShowingSearch,
                toggleShowingSearch,
                isShowingCart,
                toggleShowingCart,
                isShowingWalletShort,
                toggleShowingWalletShort,
                isShowingWalletLong,
                toggleShowingWalletLong,
                isShowingInfomationAccount,
                toggleShowingInfomationAccount,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
