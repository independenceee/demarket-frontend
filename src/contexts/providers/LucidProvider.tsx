"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import LucidContext from "@/contexts/components/LucidContext";
import { WalletItemType } from "@/types/GenericsType";

type Props = { children: ReactNode };

const LucidProvider = function ({ children }: Props) {
    const [revalidate, setRevalidate] = useState<boolean>(false);
    const [loadingConnectWallet, setLoadingConnectWallet] = useState<boolean>(false);
    const [networkPlatform, setNetworkPlatform] = useState<string>("Preprod");
    const [lucidNeworkPlatform, setLucidNeworkPlatform] = useState<Lucid>(null!);
    const chooseLucidNetworkPlatform = async function () {
        let lucid: Lucid;
        switch (networkPlatform) {
            case "Preprod":
                lucid = await Lucid.new(
                    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodez6rnHTjlVwmOJ94OzyJ6N0iGgNlKA1o"),
                    networkPlatform,
                );

                break;
            case "Preview":
                lucid = await Lucid.new(
                    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodez6rnHTjlVwmOJ94OzyJ6N0iGgNlKA1o"),
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

    const [walletItem, setWalletItem] = useState<WalletItemType>({
        walletDownloadApi: "",
        walletBalance: 0,
        walletAddress: "",
        walletName: "",
        walletImage: "",
        walletCheckApi: async function () {},
        walletApi: async function () {},
    });

    const connectWallet = async function ({ walletApi, walletName, walletImage, walletCheckApi }: WalletItemType) {
        try {
            setLoadingConnectWallet(true);
            let lucid: Lucid;
            switch (networkPlatform) {
                case "Preprod":
                    lucid = await Lucid.new(
                        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodez6rnHTjlVwmOJ94OzyJ6N0iGgNlKA1o"),
                        networkPlatform,
                    );

                    break;
                case "Preview":
                    lucid = await Lucid.new(
                        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodez6rnHTjlVwmOJ94OzyJ6N0iGgNlKA1o"),
                        networkPlatform,
                    );
                    break;
                default:
                    throw new Error("Invalid networkPlatform");
            }
            lucid.selectWallet(await walletApi());
            const utxos = await lucid.wallet.getUtxos();
            const walletBalance =
                Number(
                    utxos.reduce(function (balance, utxo) {
                        return balance + utxo.assets.lovelace;
                    }, BigInt(0)),
                ) / 1000000;
            const walletAddress = await lucid.wallet.address();
            setLucidWallet(lucid);
            setWalletItem(function (prevous: WalletItemType) {
                return {
                    ...prevous,
                    walletAddress: walletAddress,
                    walletBalance: walletBalance,
                    walletName: walletName,
                    walletImage: walletImage,
                };
            });
            setLoadingConnectWallet(false);
        } catch (error) {
            console.log(error);
        }
    };

    const disconnectWallet = async function () {
        try {
            setWalletItem({
                walletDownloadApi: "",
                walletBalance: 0,
                walletAddress: "",
                walletName: "",
                walletImage: "",
                walletCheckApi: async function () {},
                walletApi: async function () {},
            });
            setLucidWallet(null!);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <LucidContext.Provider
            value={{
                revalidate,
                setRevalidate,
                networkPlatform,
                disconnectWallet,
                connectWallet,
                lucidWallet,
                walletItem,
                lucidNeworkPlatform,
                setWalletItem,
                setLucidNeworkPlatform,
                setNetworkPlatform,
                loadingConnectWallet,
            }}
        >
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
