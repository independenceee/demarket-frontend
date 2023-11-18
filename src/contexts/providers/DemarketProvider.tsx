"use client";

import React, { useState, useEffect, ReactNode } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";
import { Account, Category, Founder, Guide } from "@/types";
import { get, post } from "@/utils/httpRequest";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    // nft

    const addNft = async function ({ policyId, assetName }: { policyId: string; assetName: string }) {
        try {
            await post("/nft", { policyId: policyId, assetName: assetName });
        } catch (error) {
            console.log(error);
        }
    };

    // category
    const [categories, setCategories] = useState<Category[]>([]);
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

    // guides

    const [guides, setGuides] = useState<Guide[]>([]);
    const [loadingGuides, setLoadingGuides] = useState<boolean>(true);

    const fetchGuides = async function () {
        try {
            setGuides(await get("/guide"));
            setLoadingGuides(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(function () {
        fetchGuides();
    }, []);

    // founder
    const [founders, setFounders] = useState<Founder[]>([]);
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

    // account
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loadingAccounts, setLoadingAccounts] = useState<boolean>(true);
    const fetchAccounts = async function () {
        try {
            setAccounts(await get("/account"));
            setLoadingAccounts(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(function () {
        fetchAccounts();
    }, []);

    return (
        <DemarketContext.Provider
            value={{
                categories,
                loadingCategories,
                founders,
                loadingFounders,
                accounts,
                loadingAccounts,
                guides,
                loadingGuides,
                addNft,
            }}
        >
            {children}
        </DemarketContext.Provider>
    );
};

export default DemarketProvider;
