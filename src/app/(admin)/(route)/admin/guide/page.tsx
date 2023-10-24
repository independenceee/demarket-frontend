"use client";
import React, { useState } from "react";

import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Guide.module.scss";
import Button from "@/components/Button";
import Link from "next/link";
import images from "@/assets/images";
import { FiEdit } from "react-icons/fi";
import Pagination from "@/components/Paginate/Paginate";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
const cx = classNames.bind(styles);
const Guide = () => {
    function getFileNameFromPath(filePath: string) {
        const parts = filePath.split("/");
        const fileName = parts[parts.length - 1];
        return fileName;
    }

    const itemsPerPage = 5; // Số mục hiển thị trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const handlerEdit = (id: number) => {};
    const handlerDelete = (id: number) => {};
    const formatdate = (date: Date) => {
        const day = date.getDate(); // Lấy ngày (1-31)
        const month = date.getMonth() + 1; // Lấy tháng (0-11), cộng thêm 1 để bắt đầu từ 1
        const year = date.getFullYear(); // Lấy năm (4 chữ số)

        // Tạo chuỗi ngày/tháng/năm
        return `${day}/${month}/${year}`;
    };
    const data = [
        {
            id: 1,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 2,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 3,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 4,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 5,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 6,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 7,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 8,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 9,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 10,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 11,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
        {
            id: 12,
            avatar: "@/src/assets/images/wallets/gero.webp",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "@/src/assets/images/wallets/gero.webp",
        },
    ];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Lấy danh sách mục cho trang hiện tại
    const itemsOnPage = data.slice(startIndex, endIndex);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };
    return (
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <Link href={"/admin/guide/create"}>
                        {" "}
                        <Button> Add New</Button>
                    </Link>
                    <div className={cx("search")}>
                        <div className={cx("icon")}>
                            <span>
                                <BiSearch />
                            </span>
                            <span>|</span>
                        </div>
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className={cx("content")}>
                    <table>
                        <thead>
                            <tr className={cx("row")}>
                                <th className={cx("col1")}>ID</th>
                                <th className={cx("col2")}>Title</th>
                                <th className={cx("col3")}>Description</th>
                                <th className={cx("col4")}>Image</th>
                                <th className={cx("col5")}>video</th>
                                <th className={cx("col6")}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsOnPage.map((data) => {
                                let pathAvatar = getFileNameFromPath(data.avatar);
                                let pathVideo = getFileNameFromPath(data.video);
                                return (
                                    <tr className={cx("row")} key={data.id}>
                                        <th className={cx("col1")}>{data.id}</th>
                                        <th className={cx("col2")}>{data.title}</th>
                                        <th className={cx("col3")}>{data.description}</th>
                                        <th className={cx("col4")}>{pathAvatar}</th>
                                        <th className={cx("col5")}>{pathVideo}</th>
                                        <th className={cx("col6")}>
                                            <span
                                                className={cx("deleteicon")}
                                                onClick={() => handlerEdit(data.id)}
                                            >
                                                <AiOutlineDelete />
                                            </span>
                                            <span
                                                className={cx("eyeicon")}
                                                onClick={() => handlerEdit(data.id)}
                                            >
                                                <AiOutlineEye />
                                            </span>
                                            <span
                                                className={cx("editicon")}
                                                onClick={() => handlerDelete(data.id)}
                                            >
                                                <FiEdit />
                                            </span>
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={data.length}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Guide;
