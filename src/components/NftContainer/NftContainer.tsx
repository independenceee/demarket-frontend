"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import styles from "./NftContainer.module.scss";
import NftItem from "./NftItem";
import NftItemSkeleton from "./NftItem/NftItemSkeleton";
import { Pagination, Stack } from "@mui/material";

const cx = classNames.bind(styles);
type Props = {
    data: Array<any>;
    itemsPerPage?: number;
    loading?: boolean;
};

const NftContainer = function ({ data, itemsPerPage = 8, loading }: Props) {
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
                {loading
                    ? new Array(itemsPerPage).fill(null).map(function (value: any, index: number) {
                          return <NftItemSkeleton key={index} index={index} />;
                      })
                    : currentItems.map(function (value: ChangeEvent<unknown>, index: number) {
                          return <NftItem key={index} value={value} index={index} />;
                      })}
            </div>
            {!loading && (
                <Stack spacing={2}>
                    <Pagination
                        count={pageCount}
                        shape="rounded"
                        page={Math.ceil(itemOffset / itemsPerPage) + 1}
                        onChange={handlePageChange}
                    />
                </Stack>
            )}
        </div>
    );
};
export default NftContainer;
