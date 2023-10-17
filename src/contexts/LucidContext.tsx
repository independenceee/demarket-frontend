"use client";

import { Lucid, Blockfrost, fromText } from "lucid-cardano";
import React, { useState, createContext, ReactNode } from "react";
import { LucidContextType } from "@/types";

const LucidContext = createContext<LucidContextType>(null!);

// function fromText(str: string) {
//     var hex = "";
//     for (var i = 0; i < str.length; i++) {
//         hex += "" + str.charCodeAt(i).toString(16);
//     }
//     return hex;
// }

type Props = {
    children: ReactNode;
};
const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>();

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
        } catch (error) {
            console.log(error);
        }
    };

    const mintNft = async function (
        title: string,
        description: string,
        imagePath: string,
        metadatas: any,
    ) {
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
                        name: title,
                        description: description,

                        metadata: metadatas,
                    })
                    .validTo(Date.now() + 200000)
                    .attachMintingPolicy(mintingPolicy!)
                    .complete();

                const signedTx = await tx.sign().complete();

                const txHash = await signedTx.submit();
            }
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

export { LucidContext };
export default LucidProvider;
