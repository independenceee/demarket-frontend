"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./AccountContainer.module.scss";
import AccountItem from "@/components/AccountContainer/AccountItem";
import { Account } from "@/types";

const cx = classNames.bind(styles);

type Props = {
    totalPagesAccounts: number;
    currentPageAccounts: number;
    loadingAccounts: boolean;
    accounts: Account[];
    setCurrentPageAccounts: React.Dispatch<React.SetStateAction<number>>;
};

const AccountContainer = function ({
    currentPageAccounts,
    accounts,
    loadingAccounts,
    totalPagesAccounts,
    setCurrentPageAccounts,
}: Props) {
    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPageAccounts(page);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {accounts.map(function (account: any, index: number) {
                    return <AccountItem key={index} account={account} index={index} />;
                })}
            </div>

            <Stack spacing={2}>
                <Pagination
                    count={totalPagesAccounts}
                    page={currentPageAccounts}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};

export default AccountContainer;
