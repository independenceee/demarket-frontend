"use client";

import React, { ReactNode, useState, useEffect } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";
import sellAssetService from "@/services/sellAssetService";
import buyAssetService from "@/services/buyAssetService";
import listAssetsService from "@/services/listAssetsService";
import mintAssetService from "@/services/mintAssetService";
import refundAssetService from "@/services/refundAssetService";

type Props = {
    children: ReactNode;
};

const DemarketProvider = function ({ children }: Props) {
    const [assetsFromSmartContract, setAssetsFromSmartContract] = useState<any>([]);
    const fetchAssetsFromSmartContract = async function () {
        try {
            setAssetsFromSmartContract(await listAssetsService());
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(function () {
        fetchAssetsFromSmartContract();
    }, []);

    console.log(assetsFromSmartContract);
    return (
        <DemarketContext.Provider value={{ sellAssetService, buyAssetService, mintAssetService, refundAssetService }}>
            {children}
        </DemarketContext.Provider>
    );
};

export default DemarketProvider;
