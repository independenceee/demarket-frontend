"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryContainer.module.scss";
import { post } from "@/utils/httpRequest";
import { contractAddress } from "@/libs";
import HistoryItem from "./HistoryItem";

type Props = {
    policyId: string;
    assetsName: string;
};

const cx = classNames.bind(styles);
const HistoryContainer = function ({ policyId, assetsName }: Props) {
    const [currentPageTransactions, setCurrentPageTransactions] = useState<number>(1);
    const [totalPagesTransactions, setTotalPagesTransactions] = useState<number>(1);
    const [loadingTransactions, setLoadingTransactions] = useState<boolean>(false);
    const [histories, setHistories] = useState<Array<any>>();

    useEffect(
        function () {
            const fetchTransactions = async function () {
                try {
                    setLoadingTransactions(true);
                    const transactionHashs = await post(`/blockfrost/transaction/asset?page=${currentPageTransactions}&pageSize=${8}&type=all`, {
                        policyId: policyId,
                        assetName: assetsName,
                    });

                    const transactionDetails = await Promise.all(
                        transactionHashs.map(async function (transactionHash: any, index: number) {
                            const transactionUtxos = await post(`/blockfrost/transaction/utxos`, { transactionHash: transactionHash.tx_hash });
                            return { ...transactionUtxos, dateTime: transactionHash.block_time };
                        }),
                    );

                    const results = [];
                    for (const transaction of transactionDetails) {
                        for (const input of transaction.inputs) {
                            if (input.address === contractAddress) {
                                results.push({
                                    address: transaction.outputs[0].address,
                                    price: transaction.outputs[0].amount[0].quantity,
                                    hash: transaction.hash,
                                    dateTime: transaction.dateTime,
                                    status: "Buy",
                                });
                            }
                        }
                    }

                    setHistories(results);
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

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {histories?.map(function (history, index) {
                    return <HistoryItem history={history} key={index} />;
                })}
            </div>
        </div>
    );
};

export default HistoryContainer;
