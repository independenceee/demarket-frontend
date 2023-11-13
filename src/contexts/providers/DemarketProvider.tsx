"use client";

import React, { useState, useEffect, ReactNode } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";
import { Category, Founder } from "@/types";
import { get } from "@/utils/httpRequest";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
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

    // founder
    const [founders, setFounders] = useState<Founder[]>([]);
    const [loadingFounders, setLoadingFounders] = useState<boolean>(false);

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

    return (
        <DemarketContext.Provider value={{ categories, loadingCategories, founders, loadingFounders }}>
            {children}
        </DemarketContext.Provider>
    );
};

export default DemarketProvider;
