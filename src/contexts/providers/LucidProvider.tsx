"use client";

import { Blockfrost, Constr, Data, Lucid, fromText, C } from "lucid-cardano";

import LucidContext from "../components/LucidContext";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";

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
    const [metadataFromAddress, setMetadataFromAddress] = useState<any>([]);
    const [address, setAddress] = useState<string>();

    const connectWallet = async function (walletApi: () => Promise<void> | any) {
        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0",
                    "preprodaXBLgbqqCAo5wMCdB77sUusgmx2RcgtH",
                ),
                "Preprod",
            );

            const api = await walletApi();

            lucid.selectWallet(api);
            setLucid(lucid);

            const addressConnect = await lucid.wallet.address();
            setAddress(addressConnect);

            const ownerPublicKeyHash = lucid.utils.getAddressDetails(addressConnect).paymentCredential?.hash;
            console.log(ownerPublicKeyHash);

            const payment_credential = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential;

            const stake_credential = lucid.utils.getAddressDetails(await lucid.wallet.address()).stakeCredential;

            let address = lucid.utils.credentialToAddress(payment_credential!, stake_credential);

            console.log(address);
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
                const { paymentCredential }: any = lucid?.utils.getAddressDetails(await lucid.wallet.address());
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

    const burnNft = async function (policyId: string, assetName: string) {
        if (lucid) {
            const { paymentCredential }: any = lucid?.utils.getAddressDetails(await lucid.wallet.address());
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

            // const policyId = lucid.utils.mintingPolicyToId(mintingPolicy!);
            const unit = policyId + assetName;
            console.log(unit);

            const tx = await lucid
                .newTx()
                .mintAssets({ [unit]: BigInt(-1) }, Data.to(new Constr(0, [])))

                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy!)
                .complete();

            const signedTx = await tx.sign().complete();
            await signedTx.submit();
        }
        try {
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(
        function () {
            const fetchMetadataFromAddress = async function () {
                try {
                    const response = await axios.post(
                        "https://demarket-backend.vercel.app/api/v1/koios/assets/address-assets",
                        {
                            _addresses: [address],
                        },
                    );

                    const policyAssetArray: any = [];

                    await response.data[0].asset_list.forEach(async ({ policy_id, asset_name }: any) => {
                        const response = await axios.post(
                            "https://demarket-backend.vercel.app/api/v1/blockfrost/assets/information",
                            {
                                policyId: policy_id,
                                assetName: hexToString(asset_name),
                            },
                        );

                        const data = await response.data.onchain_metadata;

                        if (data) {
                            policyAssetArray.push({
                                ...data,
                                policyId: policy_id,
                                assetName: asset_name,
                            });
                        }
                        setMetadataFromAddress(policyAssetArray);
                    });
                } catch (error) {
                    console.log(error);
                }
            };

            fetchMetadataFromAddress();
        },
        [address],
    );

    return (
        <LucidContext.Provider
            value={{
                metadataFromAddress,
                lucid,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
