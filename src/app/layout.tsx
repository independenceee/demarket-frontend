import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import Aos from "@/components/Aos";
import { ToastContainer } from "react-toastify";
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
                </ContextProvider>
                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </body>
        </html>
    );
};

export default RootLayout;
