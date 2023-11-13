"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import styles from "./NftContainer.module.scss";
import NftItem from "./NftItem";
import NftItemSkeleton from "./NftItem/NftItemSkeleton";

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
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {loading
                    ? new Array(itemsPerPage).fill(null).map(function (value: any, index: number) {
                          return <NftItemSkeleton key={index} index={index} />;
                      })
                    : currentItems.map(function (value: any, index: number) {
                          return <NftItem key={index} value={value} index={index} />;
                      })}
            </div>
            <ReactPaginate
                pageRangeDisplayed={3}
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                onPageChange={handlePageClick}
                containerClassName={cx("pagination")}
                pageLinkClassName={cx("page__num")}
                previousLinkClassName={cx("page__num")}
                nextLinkClassName={cx("page__num")}
                activeLinkClassName={cx("active")}
            />
        </div>
    );
};
export default NftContainer;
