"use client";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import styles from "./AccountContainer.module.scss";
import AccountItem from "@/components/AccountItem";

const cx = classNames.bind(styles);

type Props = {
    itemsPerPage?: number;
    data: any;
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
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {currentItems.map(function (value: any, index: number) {
                    return <AccountItem key={index} data={data} index={index} />;
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
                containerClassName={"pagination"}
                pageLinkClassName={"page-num"}
                previousLinkClassName={"page-num"}
                nextLinkClassName={"page-num"}
                activeLinkClassName={"active"}
            />
        </div>
    );
};

export default AccountContainer;
