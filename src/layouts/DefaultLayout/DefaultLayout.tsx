import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
type Props = {
    children: ReactNode;
};

const DefaultLayout = function ({ children }: Props) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default DefaultLayout;
