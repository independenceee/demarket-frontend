"use client";
import React, { Children, ReactNode } from "react";
import SidebarHead from "./components/SidebarHead/SidebarHead";
import SidebarLeft from "./components/SibarLeft/SidebarLeft";
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
import { TitleProvider } from "./contexts/TitleContext";
const cx = classNames.bind(styles);
type Prop = {
    children: ReactNode;
};
const AdminLayout = function ({ children }: Prop) {
    return (
        <div
            className={cx("container")}
            style={{ display: "flex", justifyContent: "space-between" }}
        >
            <TitleProvider>
                <SidebarLeft />
                <main className={cx("content")}>
                    <SidebarHead />
                    {children}
                </main>
            </TitleProvider>
        </div>
    );
};
export default AdminLayout;
