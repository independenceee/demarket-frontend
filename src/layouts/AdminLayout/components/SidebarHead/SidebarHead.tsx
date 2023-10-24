"use client";
import React from "react";
import Image from "next/image";
import styles from "./SidebarHead.module.scss";
import images from "@/assets/images";
import { useTitle } from "../../contexts/TitleContext";
import { IoMdNotificationsOutline } from "react-icons/io";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const SidebarHead = () => {
    const { title } = useTitle();
    const sideData = {
        name: "Admin name",
        image: images.eternlWallet,
        numberNotify: 8,
    };

    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <div className={cx("left")}>
                    <h1>{title}</h1>
                </div>
                <div className={cx("right")}>
                    <div className={cx("notification")}>
                        <IoMdNotificationsOutline />
                        <span>{sideData.numberNotify}</span>
                    </div>
                    <div className={cx("user")}>
                        <div className={cx("avatar")}>
                            <Image src={sideData.image} alt="avatar" />
                        </div>
                        <div className={cx("title")}>
                            <span>{sideData.name}</span>
                            <span>Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarHead;
