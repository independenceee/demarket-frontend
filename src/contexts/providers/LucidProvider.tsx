"use client";

import {
    Blockfrost,
    Data,
    Lucid,
    SpendingValidator,
    fromHex,
    fromText,
    toHex,
} from "lucid-cardano";

import listAssetsFromContract from "@/services/listAssetsService";
import LucidContext from "../components/LucidContext";
import React, { ReactNode, useEffect, useState } from "react";
import sellAssetService from "@/services/sellAssetService";
import buyAssetService from "@/services/buyAssetService";
import * as cbor from "cbor";
import demarketValidator from "@/libs";

function hexToString(hex: string) {
    var string = "";
    for (var i = 0; i < hex.length; i += 2) {
        string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
}

type Props = {
    children: ReactNode;
};
const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>();
    const [assetsFromAsset, setAssetsFromAsset] = useState<any>();
    const [metadataFromAddress, setMetadataFromAddress] = useState<any>([]);
    const [address, setAddress] = useState<string>();

    const connectWallet = async function (walletApi: () => Promise<void> | any) {
        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preview.blockfrost.io/api/v0",
                    "previewad7caqvYiu70SZAKSYQKg3EE9WsIrcF3",
                ),
                "Preview",
            );
            const api = await walletApi();

            lucid.selectWallet(api);
            setLucid(lucid);

            const addressConnect = await lucid.wallet.address();
            setAddress(addressConnect);

            const ownerPublicKeyHash =
                lucid.utils.getAddressDetails(addressConnect).paymentCredential?.hash;
            console.log(ownerPublicKeyHash);
            // const ownerPublicKeyHash = lucid.utils.getAddressDetails(
            //     await lucid.wallet.address(),
            // ).paymentCredential.hash;
        } catch (error) {
            console.log(error);
        }
    };

    const mintNft = async function ({
        title,
        description,
        mediaType,
        imagePath,
        customMetadata,
    }: {
        title: string;
        description: string;
        mediaType: string;
        imagePath: string;
        customMetadata: any;
    }) {
        try {
            if (lucid) {
                const { paymentCredential }: any = lucid?.utils.getAddressDetails(
                    await lucid.wallet.address(),
                );
                const mintingPolicy = lucid?.utils.nativeScriptFromJson({
                    type: "all",
                    scripts: [
                        { type: "sig", keyHash: paymentCredential.hash },
                        {
                            type: "before",
                            slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
                        },
                    ],
                });

                const policyId = lucid.utils.mintingPolicyToId(mintingPolicy!);
                const unit = policyId + fromText(title);

                const tx = await lucid
                    .newTx()
                    .mintAssets({ [unit]: BigInt(1) })
                    .attachMetadata(721, {
                        [policyId]: {
                            [title]: {
                                name: title,
                                description: description,
                                image: imagePath,
                                mediaType: mediaType,
                                ...customMetadata,
                            },
                        },
                    })
                    .validTo(Date.now() + 200000)
                    .attachMintingPolicy(mintingPolicy!)
                    .complete();

                const signedTx = await tx.sign().complete();
                await signedTx.submit();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(
    //     function () {
    //         const fetchMetadataFromAddress = async function () {
    //             try {
    //                 const response = await axios.post(
    //                     "https://demarket-backend.vercel.app/api/v1/koios/assets/address-assets",
    //                     {
    //                         _addresses: [address],
    //                     },
    //                 );

    //                 const policyAssetArray: any = [];

    //                 await response.data[0].asset_list.forEach(
    //                     async ({ policy_id, asset_name }: any) => {
    //                         const response = await axios.post(
    //                             "https://demarket-backend.vercel.app/api/v1/blockfrost/assets/information",
    //                             {
    //                                 policyId: policy_id,
    //                                 assetName: hexToString(asset_name),
    //                             },
    //                         );

    //                         const data = await response.data.onchain_metadata;

    //                         if (data) {
    //                             policyAssetArray.push({
    //                                 ...data,
    //                                 policyId: policy_id,
    //                                 assetName: asset_name,
    //                             });
    //                         }
    //                         setMetadataFromAddress(policyAssetArray);
    //                     },
    //                 );
    //                 console.log(metadataFromAddress);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         };

    //         // fetchMetadataFromAddress();
    //         listAssetsFromContract();
    //     },
    //     [address, metadataFromAddress],
    // );


    useEffect(function () {
        const fetchAssetsFromContractAddress = async function () {
            setAssetsFromAsset(await listAssetsFromContract());
        };

        fetchAssetsFromContractAddress();
    }, []);
    console.log(assetsFromAsset);
    return (
        <LucidContext.Provider
            value={{
                lucid,
                connectWallet,
                setLucid,
                mintNft,
                metadataFromAddress,
                sellAssetService,
                buyAssetService,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
