"use client";

import React, { useState, useEffect, ReactNode } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";
import { FounderItemType, CategoryItemType, AccountItemType } from "@/types/GenericsType";
import { get, post } from "@/utils/httpRequest";
import { useParams } from "next/navigation";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    const { id: walletAddressParams } = useParams();

    const addNft = async function ({
        policyId,
        assetName,
    }: {
        policyId: string;
        assetName: string;
    }) {
        try {
            await post("/nft", { policyId: policyId, assetName: assetName });
        } catch (error) {
            console.log(error);
        }
    };

    const [categories, setCategories] = useState<CategoryItemType[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    useEffect(function () {
        const fetchCategories = async function () {
            setLoadingCategories(true);
            try {
                setCategories(await get("/category"));
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const [founders, setFounders] = useState<FounderItemType[]>([]);
    const [loadingFounders, setLoadingFounders] = useState<boolean>(false);
    useEffect(() => {
        const fetchFounders = async function () {
            try {
                setLoadingFounders(true);
                const { founders } = await get("/founders");
                setFounders(founders);
                setLoadingFounders(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFounders();
    }, []);

    const [accounts, setAccounts] = useState<AccountItemType[]>([]);
    const [currentPageAccounts, setCurrentPageAccounts] = useState<number>(1);
    const [totalPagesAccounts, setTotalPagesAccounts] = useState<number>(1);
    const [loadingAccounts, setLoadingAccounts] = useState<boolean>(false);

    useEffect(() => {
        const fetchAccounts = async function () {
            try {
                setLoadingAccounts(true);
                const { accounts, totalPage } = await get("/account", {
                    params: {
                        page: currentPageAccounts,
                        pageSize: 12,
                        walletAddress: walletAddressParams,
                    },
                });
                setAccounts(accounts);
                setTotalPagesAccounts(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAccounts(false);
            }
        };
        fetchAccounts();
    }, [currentPageAccounts, walletAddressParams]);

    // const [otherAccounts, setOtherAccounts] = useState<AccountItemType[]>([]);
    // const [currentPageOtherAccounts, setcurrentPageOtherAccounts] = useState<number>(1);
    // const [totalPagesOtherAccounts, setTotalPagesOtherAccounts] = useState<number>(1);
    // const [loadingOtherAccounts, setLoadingOtherAccounts] = useState<boolean>(true);

    // useEffect(
    //     function () {
    //         if (walletAddressParams) {
    //             const fetchOtherAccounts = async function () {
    //                 try {
    //                     const { accounts, totalPage } = await get("/account", {
    //                         params: { page: currentPageOtherAccounts, pageSize: 12 },
    //                     });
    //                     setOtherAccounts(accounts);
    //                     setTotalPagesAccounts(totalPage);
    //                     setLoadingAccounts(false);
    //                 } catch (error) {
    //                     console.log(error);
    //                 }
    //             };
    //             fetchOtherAccounts();
    //         }
    //     },
    //     [walletAddressParams, currentPageOtherAccounts],
    // );

    return (
        <DemarketContext.Provider
            value={{
                categories,
                loadingCategories,

                founders,
                loadingFounders,

                accounts,
                loadingAccounts,
                currentPageAccounts,
                setCurrentPageAccounts,
                totalPagesAccounts,

                addNft,
            }}
        >
            {children}
        </DemarketContext.Provider>
    );
};

export default DemarketProvider;
