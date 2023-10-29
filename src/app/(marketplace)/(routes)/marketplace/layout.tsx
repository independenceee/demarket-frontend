import React, { ReactNode } from "react";
import type { Metadata } from "next";
import LucidProvider from "@/contexts/providers/LucidProvider";

export const metadata: Metadata = {
    title: "Marketpace - Demarket",
    description: "Marketpace - Demarket",
};
type Props = {
    children: ReactNode;
};

const MarketpaceLayout = function ({ children }: Props) {
    return <main>{children}</main>;
};

export default MarketpaceLayout;
