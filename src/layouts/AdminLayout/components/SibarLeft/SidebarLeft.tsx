"use client";
import React, { ComponentType, useState } from "react";
import classNames from "classnames/bind";
import styles from "./SidebarLeft.module.scss";
import images from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { useTitle } from "../../contexts/TitleContext"; // Import useTitle
import { BiCategory, BiUser, BiBook, BiLogOut } from "react-icons/bi";

const cx = classNames.bind(styles);

type PropItem = {
    title: string;
    link: string;
    icon: React.ComponentType;
};
const Item = ({
    title,
    link,
    icon: Icon,
    isActive,
    onClick,
}: PropItem & { isActive: boolean; onClick: () => void }) => {
    return (
        <Link
            className={cx("item", `${isActive ? "active" : ""}`)}
            href={link}
            onClick={onClick}
        >
            <div className={cx("icon")}>
                <Icon />
            </div>
            <span>{title}</span>
        </Link>
    );
};

const SidebarLeft = () => {
    const { setTitle } = useTitle();

    const menuitem = [
        { id: 1, title: "Category", icon: BiCategory, link: "/admin/category" },
        { id: 2, title: "Founder", icon: BiUser, link: "/admin/founder" },
        { id: 3, title: "Guide", icon: BiBook, link: "/admin/guide" },
    ];

    const [activeMenu, setActiveMenu] = useState(1);

    const handleMenuClick = (id: React.SetStateAction<number>, title: string) => {
        setActiveMenu(id);
        setTitle(title);
    };

    return (
        <div className={cx("container")}>
            <div className={cx("logo")}>
                <Image src={images.logoblur} alt="Logo" />
            </div>
            <div className={cx("menu")}>
                <div className={cx("menuTop")}>
                    <span>Menu</span>
                    {menuitem.map((item) => (
                        <Item
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            link={item.link}
                            isActive={activeMenu === item.id}
                            onClick={() => handleMenuClick(item.id, item.title)}
                        />
                    ))}
                </div>
                <div className={cx("menubottom")}>
                    <Item
                        key={4}
                        icon={BiLogOut}
                        title="Log Out"
                        link="/"
                        isActive={activeMenu === 4}
                        onClick={() => handleMenuClick(4, "Log Out")}
                    />
                </div>
            </div>
        </div>
    );
};

export default SidebarLeft;
