"use client";

import React, { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./AccountContainer.module.scss";
import AccountItem from "@/components/AccountContainer/AccountItem";
import { Account } from "@/types";

const cx = classNames.bind(styles);

type Props = {
    itemsPerPage?: number;
    data: Account[];
};

const AccountContainer = function ({ itemsPerPage = 8, data }: Props) {
    const [currentItems, setCurrentItems] = useState<any>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const newOffset = (value - 1) * itemsPerPage;
        setItemOffset(newOffset);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {currentItems.map(function (value: any, index: number) {
                    return <AccountItem key={index} value={value} index={index} />;
                })}
            </div>

            <Stack spacing={2}>
                <Pagination
                    count={pageCount}
                    shape="rounded"
                    page={Math.ceil(itemOffset / itemsPerPage) + 1}
                    onChange={handlePageChange}
                />
            </Stack>
        </div>
    );
};

export default AccountContainer;
