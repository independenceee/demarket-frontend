import "./globals.scss";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import Aos from "@/components/Aos";
import { DefaultLayout } from "@/layouts";
import ContextProvider from "@/contexts";

export const metadata: Metadata = {
    title: "Home - Demarket",
    description: "Home - Demarket",
};
type Props = {
    children: ReactNode;
};

const RootLayout = function ({ children }: Props) {
    return (
        <html lang="en">
            <Aos />
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
