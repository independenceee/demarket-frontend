"use client";

import React, { ReactNode, useEffect } from "react";
import ModalContext from "@/contexts/components/ModalContext";
import { useModal } from "@/hooks";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    const { isShowing: isShowingNotificationConnectWallet, toggle: toggleNotificationConnectWallet } = useModal();
    const { isShowing: isShowingDownloadWallet, toggle: toggleDownloadWallet } = useModal();
    const { isShowing: isShowingSearch, toggle: toggleShowingSearch } = useModal();
    const { isShowing: isShowingCart, toggle: toggleShowingCart } = useModal();
    const { isShowing: isShowingWalletShort, toggle: toggleShowingWalletShort } = useModal();
    const { isShowing: isShowingWalletLong, toggle: toggleShowingWalletLong } = useModal();
    const { isShowing: isShowingInfomationAccount, toggle: toggleShowingInfomationAccount } = useModal();

    useEffect(() => {
        if (
            isShowingNotificationConnectWallet ||
            isShowingDownloadWallet ||
            isShowingSearch ||
            isShowingCart ||
            isShowingWalletShort ||
            isShowingWalletLong ||
            isShowingInfomationAccount
        ) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [
        isShowingNotificationConnectWallet,
        isShowingDownloadWallet,
        isShowingSearch,
        isShowingCart,
        isShowingWalletShort,
        isShowingWalletLong,
        isShowingInfomationAccount,
    ]);

    useEffect(() => {
        const handleScroll = function () {};

        window.addEventListener("scroll", handleScroll);

        return function () {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <ModalContext.Provider
            value={{
                isShowingNotificationConnectWallet,
                toggleNotificationConnectWallet,
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
