"use client";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import Button from "@/components/Button";
import Pagination from "@/components/Paginate/Paginate";
import Link from "next/link";
const cx = classNames.bind(styles);
const Category = () => {
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
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 2,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 3,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 4,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 5,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 6,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 7,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 8,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
        },
        {
            id: 9,
            name: "Gift",
            descript:
                "We're impartial and independent, and every day we create distinctive, wold-class programmes and develbmvbop",
            createTime: Date.now(),
            updateTime: Date.now(),
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
                    <Link href={"/admin/category/create"}>
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
                                <th className={cx("col2")}>Name</th>
                                <th className={cx("col3")}>Description</th>
                                <th className={cx("col4")}>CreateTime</th>
                                <th className={cx("col5")}>UpdateTime</th>
                                <th className={cx("col6")}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsOnPage.map((data) => {
                                const createtime = formatdate(new Date(data.createTime));
                                const updatetime = formatdate(new Date(data.updateTime));
                                return (
                                    <tr className={cx("row")} key={data.id}>
                                        <th className={cx("col1")}>{data.id}</th>
                                        <th className={cx("col2")}>{data.name}</th>
                                        <th className={cx("col3")}>{data.descript}</th>
                                        <th className={cx("col4")}>{createtime}</th>
                                        <th className={cx("col5")}>{updatetime}</th>
                                        <th className={cx("col6")}>
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

export default Category;
