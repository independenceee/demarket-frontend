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
    const [isSaw, setIsSaw] = useState(0);
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
    const [currentId, setCurrentId] = useState(0);
    const data = [
        {
            id: 1,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 2,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 3,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 4,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 5,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 6,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 7,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 8,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 9,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 10,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 11,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
        {
            id: 12,
            avatar: "/assets/images/logo.jpg",
            title: "Guide 1",
            description:
                "We're impartial and independent, and every day we create distinctive, world-class programmes and develop...",
            video: "/assets/images/logo.jpg",
        },
    ];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Lấy danh sách mục cho trang hiện tại
    const itemsOnPage = data.slice(startIndex, endIndex);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };
    const handlerShow = (id: React.SetStateAction<number>) => {
        if (currentId != id) {
            setIsSaw(id);
            setCurrentId(id);
        } else {
            setIsSaw(0);
            setCurrentId(0);
        }
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
                                    <div
                                        className={cx("box_item", "box_displayItem")}
                                        key={data.id}
                                    >
                                        <tr className={cx("row")}>
                                            <th className={cx("col1")}>{data.id}</th>
                                            <th className={cx("col2")}>{data.title}</th>
                                            <th className={cx("col3")}>
                                                {data.description}
                                            </th>
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
                                                    onClick={() => handlerShow(data.id)}
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
                                        {isSaw === data.id && (
                                            <div className={cx("displayItem")}>
                                                <div
                                                    className={cx(
                                                        "box_image",
                                                        "box_displayItem",
                                                    )}
                                                >
                                                    <div className={cx("image")}>
                                                        <Image
                                                            src={data.avatar}
                                                            alt="Picture"
                                                            width={134}
                                                            height={125}
                                                        />
                                                    </div>
                                                    <span>Picture</span>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "box_video",
                                                        "box_displayItem",
                                                    )}
                                                >
                                                    <div className={cx("video")}>
                                                        <Image
                                                            src={data.video}
                                                            alt="Picture"
                                                            width={134}
                                                            height={125}
                                                        ></Image>
                                                    </div>
                                                    <span>Video</span>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "box_id",
                                                        "box_displayItem",
                                                    )}
                                                >
                                                    <span>ID</span>
                                                    <span>{data.id}</span>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "box_title",
                                                        "box_displayItem",
                                                    )}
                                                >
                                                    <span>Title</span>
                                                    <span>{data.title}</span>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "box_description",
                                                        "box_displayItem",
                                                    )}
                                                >
                                                    <span>Description</span>
                                                    <span>{data.description}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
