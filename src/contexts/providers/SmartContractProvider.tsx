"use client";

import React, { ReactNode, useEffect, useState } from "react";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import burnAssetService from "@/services/contracts/burnAsset";
import sellAssetService from "@/services/contracts/sellAsset";
import buyAssetService from "@/services/contracts/buyAsset";
import listAssetsService from "@/services/contracts/listAssets";
import mintAssetService from "@/services/contracts/mintAsset";
import refundAssetService from "@/services/contracts/refundAsset";
import findAssetService from "@/services/contracts/findAsset";
import fetchInformationAsset from "@/utils/fetchInformationAsset";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [loadingAssetsFromSmartContract, setLoadingAssetsFromSmartContract] = useState<boolean>(true);
    const [listAssetsFromSmartContract, setListAssetsFromSmartContract] = useState<any>([]);
    const fetchAssetsFromSmartContract = async function () {
        try {
            const assets: any = await listAssetsService();
            const convertAsset: any = [];

            assets.forEach(async function (asset: any, index: number) {
                const response = await fetchInformationAsset({ policyId: asset.policyId, assetName: asset.assetName });
                convertAsset.push({
                    ...response,
                    price: asset.price,
                    royalties: asset.royalties,
                });

                setListAssetsFromSmartContract(convertAsset);
                setLoadingAssetsFromSmartContract(false);
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(function () {
        fetchAssetsFromSmartContract();
    }, []);

    return (
        <SmartContractContext.Provider
            value={{
                listAssetsFromSmartContract,
                loadingAssetsFromSmartContract,
                burnAssetService,
                buyAssetService,
                findAssetService,
                mintAssetService,
                refundAssetService,
                sellAssetService,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
