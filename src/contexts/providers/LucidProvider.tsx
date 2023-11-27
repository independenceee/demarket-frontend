"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "@/contexts/components/LucidContext";
import { WalletItemType } from "@/types/GenericsType";

type Props = { children: ReactNode };

const LucidProvider = function ({ children }: Props) {
    const initialWalletState: WalletItemType = {
        walletBalance: 0,
        walletAddress: "",
        walletName: "",
        walletImage: "",
        async walletCheckApi() {},
        async walletApi() {},
    };

    const [networkPlatform, setNetworkPlatform] = useState<string>("Preprod");
    const [lucidNeworkPlatform, setLucidNeworkPlatform] = useState<Lucid>(null!);
    const chooseLucidNetworkPlatform = async function () {
        let lucid: Lucid;
        switch (networkPlatform) {
            case "Preprod":
                lucid = await Lucid.new(
                    new Blockfrost(
                        "https://cardano-preprod.blockfrost.io/api/v0",
                        "preprodaXBLgbqqCAo5wMCdB77sUusgmx2RcgtH",
                    ),
                    networkPlatform,
                );

                break;
            case "Preview":
                lucid = await Lucid.new(
                    new Blockfrost(
                        "https://cardano-preprod.blockfrost.io/api/v0",
                        "preprodaXBLgbqqCAo5wMCdB77sUusgmx2RcgtH",
                    ),
                    networkPlatform,
                );
                break;
            default:
                throw new Error("Invalid networkPlatform");
        }

        setLucidNeworkPlatform(lucid);
    };
    useEffect(
        function () {
            chooseLucidNetworkPlatform();
        },
        [networkPlatform],
    );

    const [lucidWallet, setLucidWallet] = useState<Lucid>(null!);
    const [walletItem, setWalletItem] = useState<WalletItemType>(initialWalletState);

    const connectWallet = async function ({ walletApi, walletName, walletImage, walletCheckApi }: WalletItemType) {
        try {
            let lucid: Lucid;
            switch (networkPlatform) {
                case "Preprod":
                    lucid = await Lucid.new(
                        new Blockfrost(
                            "https://cardano-preprod.blockfrost.io/api/v0",
                            "preprodaXBLgbqqCAo5wMCdB77sUusgmx2RcgtH",
                        ),
                        networkPlatform,
                    );

                    break;
                case "Preview":
                    lucid = await Lucid.new(
                        new Blockfrost(
                            "https://cardano-preprod.blockfrost.io/api/v0",
                            "preprodaXBLgbqqCAo5wMCdB77sUusgmx2RcgtH",
                        ),
                        networkPlatform,
                    );
                    break;
                default:
                    throw new Error("Invalid networkPlatform");
            }
            lucid.selectWallet(await walletApi());
            const utxos = await lucid.wallet.getUtxos();
            const walletBanlance = utxos.reduce(function (balance, utxo) {
                return balance + utxo.assets.lovelace;
            }, BigInt(0));
            const walletAddress = await lucid.wallet.address();
            setLucidWallet(lucid);
            setWalletItem(function (prevous: WalletItemType) {
                return {
                    ...prevous,
                    walletAddress: walletAddress,
                    walletBanlance: Number(walletBanlance) / 1000000,
                    walletName: walletName,
                    walletImage: walletImage,
                };
            });
        } catch (error) {
            console.log(error);
        }
    };

    const disconnectWallet = async function () {
        try {
            setWalletItem(initialWalletState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LucidContext.Provider
            value={{
                networkPlatform,
                disconnectWallet,
                connectWallet,
                lucidWallet,
                walletItem,
                lucidNeworkPlatform,
                setLucidNeworkPlatform,
                setNetworkPlatform,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
