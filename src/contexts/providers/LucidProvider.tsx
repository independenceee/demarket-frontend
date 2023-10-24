import { Blockfrost, Lucid, SpendingValidator, fromText } from "lucid-cardano";
import LucidContext from "../components/LucidContext";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
    children: ReactNode;
};
const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>();
    const [address, setAddress] = useState<string>();

    const connectWallet = async function (walletApi: () => Promise<void> | any) {
        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0",
                    "preprodMLN0qpW8GZENdqNe4ot6pwRLku7hXAF6",
                ),
                "Preprod",
            );
            const api = await walletApi();

            lucid.selectWallet(api);
            setLucid(lucid);
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

    const listAssetsFromSmartContract = async function () {
        try {
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LucidContext.Provider value={{ lucid, connectWallet, setLucid, mintNft }}>
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
