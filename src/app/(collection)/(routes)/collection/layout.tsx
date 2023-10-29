import React, { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collection - Demarket",
    description: "Collection - Demarket",
};
type Props = {
    children: ReactNode;
};

const CollectionLayout = function ({ children }: Props) {
    return <main>{children}</main>;
};

export default CollectionLayout;
