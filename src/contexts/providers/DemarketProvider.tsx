"use client";

import React, { ReactNode } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    return <DemarketContext.Provider value={{}}>{children}</DemarketContext.Provider>;
};

export default DemarketProvider;
