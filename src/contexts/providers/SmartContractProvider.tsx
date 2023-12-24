"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import burnAsset from "@/services/contracts/burnAsset";
import sellAsset from "@/services/contracts/sellAsset";
import buyAsset from "@/services/contracts/buyAsset";
import listAssets from "@/services/contracts/listAssets";
import mintAsset from "@/services/contracts/mintAsset";
import refundAsset from "@/services/contracts/refundAsset";
import findAsset from "@/services/contracts/findAsset";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { NftItemType } from "@/types/GenericsType";
import LucidContext from "../components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const { networkPlatform, lucidNeworkPlatform, revalidate } = useContext<LucidContextType>(LucidContext);
    const [assetsFromSmartContract, setAssetsFromSmartContract] = useState<NftItemType[]>([]);
    const [loadingAssetsFromSmartContract, setLoadingAssetsFromSmartContract] = useState<boolean>(true);
    const fetchAssetsFromSmartContract = async function () {
        try {
            const assets: NftItemType[] = await listAssets({ lucid: lucidNeworkPlatform });
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
                    const updatedAssets: NftItemType[] = previousAssets.map((existingAsset: NftItemType) => {
                        const matchingAsset = convertedAssets.find(function (newAsset: NftItemType) {
                            return existingAsset.policyId === newAsset.policyId;
                        });

                        if (matchingAsset) {
                            return { ...existingAsset, ...matchingAsset };
                        }

                        return existingAsset;
                    });
                    const newAssets: NftItemType[] = convertedAssets.filter(
                        (newAsset: NftItemType) =>
                            !previousAssets.some((existingAsset: any) => existingAsset.policyId === newAsset.policyId),
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
                buyAsset,
                burnAsset,
                findAsset,
                mintAsset,
                refundAsset,
                sellAsset,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
