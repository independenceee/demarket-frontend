"use client";

import React, { ReactNode, useState } from "react";
import ModalContext from "@/contexts/components/ModalContext";
import Modal from "@/components/Modal";

type Props = {
    children: ReactNode;
};

const ModalProvider = function ({ children }: Props) {
    const [openWalletShort, setOpenWalletShort] = useState<boolean>(false);

    return <ModalContext.Provider value={{ openWalletShort }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
