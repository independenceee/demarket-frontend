"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryContainer.module.scss";
import { post } from "@/utils/httpRequest";
import { Pagination, Stack } from "@mui/material";
import HistoryItem from "@/components/HistoryContainer/HistoryItem";

type Props = {
    policyId: string;
    assetsName: string;
};

const cx = classNames.bind(styles);
const HistoryContainer = function ({ policyId, assetsName }: Props) {
    const [currentPageTransactions, setCurrentPageTransactions] = useState<number>(1);
    const [totalPagesTransactions, setTotalPagesTransactions] = useState<number>(1);
    const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Array<any>>();

    useEffect(
        function () {
            const fetchTransactions = async function () {
                try {
                    setLoadingTransactions(true);
                    const { allTransaction } = await post(`/blockfrost/transaction/asset?page=${currentPageTransactions}&pageSize=${8}`, {
                        policyId: policyId,
                        assetName: assetsName,
                    });

                    setTotalPagesTransactions(allTransaction.totalPage);
                    setTransactions(allTransaction.paginatedData);
                    setLoadingTransactions(false);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchTransactions();
        },
        [policyId, assetsName, currentPageTransactions],
    );

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPageTransactions(page);
    };

    console.log(transactions);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>{/* <HistoryItem /> */}</div>
        </div>
    );
};

export default HistoryContainer;
