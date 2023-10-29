import React, { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About - Demarket",
    description: "About - Demarket",
};
type Props = {
    children: ReactNode;
};

const AboutLayout = function ({ children }: Props) {
    return <main>{children}</main>;
};

export default AboutLayout;
