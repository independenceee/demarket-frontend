"use client";

import React, { ReactNode, useEffect, useState } from "react";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import burnAssetService from "@/services/contracts/burnAssetService";
import sellAssetService from "@/services/contracts/sellAssetService";
import buyAssetService from "@/services/contracts/buyAssetService";
import listAssetsService from "@/services/contracts/listAssetsService";
import mintAssetService from "@/services/contracts/mintAssetService";
import refundAssetService from "@/services/contracts/refundAssetService";
import findAssetService from "@/services/contracts/findAssetService";
import fetchAuthorAddressAndSellerAddress from "@/utils/fetchAuthorAddressAndSellerAddress";
import { post } from "@/utils/httpRequest";

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
                const data = await post("/blockfrost/assets/information", {
                    policyId: asset.policyId,
                    assetName: asset.assetName,
                });

                const { authorAddress, sellerAddress } = await fetchAuthorAddressAndSellerAddress({
                    policyId: asset.policyId,
                    assetName: asset.assetName,
                });
                convertAsset.push({
                    authorAddress,
                    sellerAddress,
                    policyId: asset.policyId,
                    assetName: asset.assetName,
                    ...data.onchain_metadata,
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
