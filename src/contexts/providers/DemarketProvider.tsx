"use client";

import React, { ReactNode, useState, useEffect } from "react";
import DemarketContext from "@/contexts/components/DemarketContext";
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

const DemarketProvider = function ({ children }: Props) {
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
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(function () {
        fetchAssetsFromSmartContract();
    }, []);

    console.log(listAssetsFromSmartContract);
    return (
        <DemarketContext.Provider
            value={{
                sellAssetService,
                buyAssetService,
                mintAssetService,
                refundAssetService,
                burnAssetService,
                findAssetService,
                listAssetsFromSmartContract,
            }}
        >
            {children}
        </DemarketContext.Provider>
    );
};

export default DemarketProvider;
