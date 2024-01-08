"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames/bind";
import styles from "./HistoryContainer.module.scss";
import { post } from "@/utils/httpRequest";
import { Pagination, Stack } from "@mui/material";
import HistoryItem from "@/components/HistoryContainer/HistoryItem";
import { contractAddress } from "@/libs";

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

    // https://demarket-backend.vercel.app/api/v1/blockfrost/transaction/detail
    // https://demarket-backend.vercel.app/api/v1/blockfrost/transaction/utxos

    useEffect(
        function () {
            const fetchTransactions = async function () {
                try {
                    setLoadingTransactions(true);
                    const transactionHashs = await post(`/blockfrost/transaction/asset?page=${currentPageTransactions}&pageSize=${8}&type=all`, {
                        policyId: policyId,
                        assetName: assetsName,
                    });

                    // console.log(transactionHashs);

                    const transactionDetails = transactionHashs.map(async function (transactionHash: any, index: number) {
                        const transactionDetail = await post(`/blockfrost/transaction/detail`, { transactionHash: transactionHash.tx_hash });
                        console.log("transactionDetail", transactionDetail);
                        // console.log(transactionDetail);
                        const transactionUtxo = await post(`/blockfrost/transaction/utxos`, { transactionHash: transactionHash.tx_hash });
                        const transactionUtxoOutputs = transactionUtxo.outputs.filter(function (output: any) {
                            if (output.address === contractAddress) {
                                console.log(output);
                            }
                            return output.address === contractAddress;
                        });
                        // console.log(transactionUtxoOutputs);

                        // console.log(transactionUtxo);
                        // const transactionUtxoInputs = transactionUtxo.inputs.filter(function (input: any) {
                        //     return input.address === contractAddress;
                        // });
                        // console.log(transactionUtxoInputs);
                        return;
                    });

                    console.log(transactionDetails);

                    /**
                     * transactionHash
                     * blockTime
                     * address
                     * price
                     * fee
                     */

                    // setTotalPagesTransactions(allTransaction.totalPage);
                    // setTransactions(allTransaction.paginatedData);
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
            <div className={cx("container")}>{/* <HistoryItem /> */}</div>
        </div>
    );
};

export default HistoryContainer;
