"use client";
import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Founder.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import Button from "@/components/Button";
import { search } from "@/services/searchService";
import Pagination from "@/components/Paginate/Paginate";
import Image from "next/image";
import images from "@/assets/images";
import Link from "next/link";
const cx = classNames.bind(styles);
const Founder = () => {
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
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 2,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 3,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 4,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 5,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 6,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 7,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 8,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
        },
        {
            id: 9,
            avatar: images.flintWallet,
            firstname: "Jong",
            lastname: "King kong",
            position: "FullStack Developer",
            email: "kingkong@gmail.com",
            github: "kingkong.github",
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
                    <Link href={"/admin/founder/create"}>
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
                                <th className={cx("col2")}>Avatar</th>
                                <th className={cx("col3")}>FirstName</th>
                                <th className={cx("col4")}>LastName</th>
                                <th className={cx("col5")}>Position</th>
                                <th className={cx("col6")}>Email</th>
                                <th className={cx("col7")}>GitHub</th>
                                <th className={cx("col8")}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsOnPage.map((data) => {
                                return (
                                    <tr className={cx("row")} key={data.id}>
                                        <th className={cx("col1")}>{data.id}</th>
                                        <th className={cx("col2")}>
                                            <Image src={data.avatar} alt="avatar" />
                                        </th>
                                        <th className={cx("col3")}>{data.firstname}</th>
                                        <th className={cx("col4")}>{data.lastname}</th>
                                        <th className={cx("col5")}>{data.position}</th>
                                        <th className={cx("col6")}>{data.email}</th>
                                        <th className={cx("col7")}>{data.github}</th>
                                        <th className={cx("col8")}>
                                            <span
                                                className={cx("deleteicon")}
                                                onClick={() => handlerEdit(data.id)}
                                            >
                                                <AiOutlineDelete />
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

export default Founder;
