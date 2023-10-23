import "./globals.scss";

import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { DefaultLayout } from "@/layouts";
import ContextProvider from "@/contexts";

export const metadata: Metadata = {
    title: "Demarket",
    description: "Demarket",
};

type Props = {
    children: ReactNode;
};

const RootLayout = function ({ children }: Props) {
    return (
        <html lang="en">
            <body>
                <ContextProvider>
                    <DefaultLayout>{children}</DefaultLayout>
                </ContextProvider>
            </body>
        </html>
    );
};

export default RootLayout;
