"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";

type Props = {
    children: ReactNode;
};

const Layout = function ({ children }: Props) {
    const pathName = usePathname();
    const [selectedRouter, setSelectedRouter] = useState<string>("");

    useEffect(function () {
        const router = pathName.split("/").join("").toUpperCase();
        setSelectedRouter(router || "HOME");
    }, []);

    return (
        <main>
            <Header selectedRouter={selectedRouter} setSelectedRouter={setSelectedRouter} />
            {children}
            <Footer />
        </main>
    );
};

export default Layout;
