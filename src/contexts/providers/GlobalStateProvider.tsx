"use client";

import React, { useState, ReactNode } from "react";
import GlobalStateContext from "@/contexts/components/GlobalStateContext";
import { RevalidateType } from "@/types/GenericsType";

type Props = {
    children: ReactNode;
};

const GlobalStateProvider = function ({ children }: Props) {
    const [revalidate, setRevalidate] = useState<RevalidateType>({ follow: false, account: false });
    return (
        <GlobalStateContext.Provider value={{ revalidate, setRevalidate }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;
