"use client";

import React, { useState, useEffect, ReactNode } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";
import { GuideItemType, FounderItemType, CategoryItemType, AccountItemType } from "@/types/GenericsType";
import { get, post } from "@/utils/httpRequest";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    const addNft = async function ({ policyId, assetName }: { policyId: string; assetName: string }) {
        try {
            await post("/nft", { policyId: policyId, assetName: assetName });
        } catch (error) {
            console.log(error);
        }
    };

    const [categories, setCategories] = useState<CategoryItemType[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

    const fetchCategories = async function () {
        try {
            setCategories(await get("/category"));
            setLoadingCategories(false);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(function () {
        fetchCategories();
    }, []);

    const [guides, setGuides] = useState<GuideItemType[]>([]);
    const [loadingGuides, setLoadingGuides] = useState<boolean>(true);

    const fetchGuides = async function () {
        try {
            setGuides(await get("/guides"));
            setLoadingGuides(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(function () {
        fetchGuides();
    }, []);

    const [founders, setFounders] = useState<FounderItemType[]>([]);
    const [loadingFounders, setLoadingFounders] = useState<boolean>(true);

    const fetchFounders = async function () {
        try {
            setFounders(await get("/founder"));
            setLoadingFounders(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(function () {
        fetchFounders();
    }, []);

    const [accounts, setAccounts] = useState<AccountItemType[]>([]);
    const [currentPageAccounts, setCurrentPageAccounts] = useState<number>(1);
    const [totalPagesAccounts, setTotalPagesAccounts] = useState<number>(1);
    const [loadingAccounts, setLoadingAccounts] = useState<boolean>(true);
    const fetchAccounts = async function () {
        try {
            const { accounts, totalPage } = await get("/account", {
                params: { page: currentPageAccounts, pageSize: 12 },
            });
            setAccounts(accounts);
            setTotalPagesAccounts(totalPage);
            setLoadingAccounts(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(
        function () {
            fetchAccounts();
        },
        [currentPageAccounts],
    );

    return (
        <DemarketContext.Provider
            value={{
                categories,
                loadingCategories,

                founders,
                loadingFounders,

                guides,
                loadingGuides,

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
