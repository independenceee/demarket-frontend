"use client";

import React, { useState, useEffect, ReactNode } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";
import { Category } from "@/types";
import { get } from "@/utils/httpRequest";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    // category
    const [categories, setCategories] = useState<Category[]>([]);
    const fetchCategories = async function () {
        try {
            setCategories(await get("/category"));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(function () {
        fetchCategories();
    }, []);

    return <DemarketContext.Provider value={{ categories }}>{children}</DemarketContext.Provider>;
};

export default DemarketProvider;
