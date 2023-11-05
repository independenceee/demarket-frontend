"use client";

import React, { ReactNode, useState } from "react";
import { Blockfrost, Lucid } from "lucid-cardano";
import { post } from "@/utils/httpRequest";
import LucidContext from "../components/LucidContext";
import { Account, WalletType } from "@/types";

type Props = {
    children: ReactNode;
};
const LucidProvider = function ({ children }: Props) {
    const [lucid, setLucid] = useState<Lucid>(null!);
    const [walletBanlance, setWalletBalance] = useState<number>(0);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [walletName, setWalletName] = useState<string>("");
    const [walletImage, setWalletImage] = useState<any>();
    const [account, setAccount] = useState<Account>();

    // const connectWallet = async function ({ api, image, name }: WalletType) {
    const connectWallet = async function () {
        try {
            const lucid = await Lucid.new(
                new Blockfrost(
                    "https://cardano-preprod.blockfrost.io/api/v0",
                    "preprodaXBLgbqqCAo5wMCdB77sUusgmx2RcgtH",
                ),
                "Preprod",
            );
            lucid.selectWallet(await window.cardano.nami.enable());
            // lucid.selectWallet(await api());
            const utxos = await lucid.wallet.getUtxos();
            const balance = utxos.reduce(function (acc, utxo) {
                return acc + utxo.assets.lovelace;
            }, BigInt(0));
            const address = await lucid.wallet.address();

            setLucid(lucid);
            // setWalletName(name);
            // setWalletAddress(address);
            // setWalletImage(image);
            // setWalletBalance(Number(balance) / 1000000);

            // const stakeKey = await post("/emurgo/stakekey/address", {
            //     address: walletAddress,
            // });

            // const account = await post("/account", {
            //     address: walletAddress,
            //     name: stakeKey,
            // });

            // setAccount(account);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(account);

    console.log(walletBanlance);

    return (
        <LucidContext.Provider value={{ connectWallet, walletAddress, walletImage, walletName, walletBanlance, lucid }}>
            {children}
        </LucidContext.Provider>
    );
};

export default LucidProvider;
