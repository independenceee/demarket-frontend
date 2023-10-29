import React, { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mint - Demarket",
    description: "Mint - Demarket",
};
type Props = {
    children: ReactNode;
};

const MintLayout = function ({ children }: Props) {
    return <main>{children}</main>;
};

export default MintLayout;
