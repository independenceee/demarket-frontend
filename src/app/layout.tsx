import "./globals.scss";

import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { DefaultLayout } from "@/layouts";
import ContextProvider from "@/contexts";

import { AdminLayout } from "@/layouts/AdminLayout";
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
                    {/* <AdminLayout>{children}</AdminLayout> */}
                </ContextProvider>
            </body>
        </html>
    );
};

export default RootLayout;
