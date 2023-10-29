import React, { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Guide - Demarket",
    description: "Guide - Demarket",
};
type Props = {
    children: ReactNode;
};

const GuideLayout = function ({ children }: Props) {
    return <main>{children}</main>;
};

export default GuideLayout;
