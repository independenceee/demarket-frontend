"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import burnAssetService from "@/services/contracts/marketplace/burn-asset";
import sellAssetService from "@/services/contracts/marketplace/sell-asset-service";
import buyAssetService from "@/services/contracts/marketplace/buy-asset-service";
import listAssetsService from "@/services/contracts/marketplace/list-assets-service";
import mintAssetService from "@/services/contracts/marketplace/mint-asset-service";
import mintCollectionService from "@/services/contracts/marketplace/mint-collection-service";
import refundAssetService from "@/services/contracts/marketplace/refund-asset-service";
import findAssetService from "@/services/contracts/marketplace/find-asset-service";
import mintAssetPolicyIdService from "@/services/contracts/marketplace/mint-asset-policyid-service";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { NftItemType } from "@/types/GenericsType";
import LucidContext from "../components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const { networkPlatform, lucidNeworkPlatform, revalidate } =
        useContext<LucidContextType>(LucidContext);
    const [assetsFromSmartContract, setAssetsFromSmartContract] = useState<NftItemType[]>([]);
    const [loadingAssetsFromSmartContract, setLoadingAssetsFromSmartContract] =
        useState<boolean>(true);
    const fetchAssetsFromSmartContract = async function () {
        try {
            const assets: NftItemType[] = await listAssetsService({ lucid: lucidNeworkPlatform });
            if (assets) {
                const assetPromises = assets.reverse().map(async function (asset: NftItemType) {
                    const response: NftItemType = await fetchInformationAsset({
                        policyId: asset.policyId,
                        assetName: asset.assetName,
                    });
                    return { ...response, price: asset.price, royalties: asset.royalties };
                });

                const convertedAssets: NftItemType[] = await Promise.all(assetPromises);

                setAssetsFromSmartContract((previousAssets: NftItemType[]) => {
                    const updatedAssets: NftItemType[] = previousAssets.map(
                        (existingAsset: NftItemType) => {
                            const matchingAsset = convertedAssets.find(function (
                                newAsset: NftItemType,
                            ) {
                                return existingAsset.policyId === newAsset.policyId;
                            });

                            if (matchingAsset) {
                                return { ...existingAsset, ...matchingAsset };
                            }

                            return existingAsset;
                        },
                    );
                    const newAssets: NftItemType[] = convertedAssets.filter(
                        (newAsset: NftItemType) =>
                            !previousAssets.some(
                                (existingAsset: any) =>
                                    existingAsset.policyId === newAsset.policyId,
                            ),
                    );

                    return [...updatedAssets, ...newAssets];
                });
                setLoadingAssetsFromSmartContract(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(
        function () {
            fetchAssetsFromSmartContract();
        },
        [networkPlatform, lucidNeworkPlatform, revalidate],
    );
    return (
        <SmartContractContext.Provider
            value={{
                assetsFromSmartContract,
                setAssetsFromSmartContract,
                loadingAssetsFromSmartContract,
                buyAssetService,
                burnAssetService,
                findAssetService,
                mintAssetService,
                refundAssetService,
                sellAssetService,
                mintCollectionService,
                mintAssetPolicyIdService,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
