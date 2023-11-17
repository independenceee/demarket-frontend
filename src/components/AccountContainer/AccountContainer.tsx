"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import classNames from "classnames/bind";
import styles from "./AccountContainer.module.scss";
import AccountItem from "@/components/AccountContainer/AccountItem";
import { Account } from "@/types";
import { count } from "console";

const cx = classNames.bind(styles);

type Props = {
    itemsPerPage?: number;
    data: Account[];
};

const AccountContainer = function ({ itemsPerPage = 8, data }: Props) {
    const [currentItems, setCurrentItems] = useState<any>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemOffset, setItemOffset] = useState<number>(0);

    useEffect(
        function () {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(data.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(data.length / itemsPerPage));
        },
        [itemOffset, itemsPerPage, data],
    );

    const handlePageClick = function (event: any) {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    const handleChangePage = function (event: any, value: number) {
        setPageCount(value);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {currentItems.map(function (value: any, index: number) {
                    return <AccountItem key={index} value={value} index={index} />;
                })}
            </div>

            <Stack spacing={2}>
                <Pagination count={10} shape="rounded" page={pageCount} onChange={handleChangePage} />
            </Stack>
        </div>
    );
};

export default AccountContainer;
