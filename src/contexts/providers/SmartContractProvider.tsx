"use client";

import React, { ReactNode, useState } from "react";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import readValidator from "@/utils/read-validator";
import { Data, Lucid, Script, Tx, TxComplete, TxHash, TxSigned, UTxO } from "lucid-cardano";
import { ProductType } from "@/types/GenericsType";
import { MarketplaceDatum } from "@/constants/datum";
import { MarketplaceRedeemer } from "@/constants/redeemer";
import fetchPublicKeyFromAddress from "@/utils/fetchPublicKeyFromAddress";

type Props = {
    children: ReactNode;
};

const SmartContractProvider = function ({ children }: Props) {
    const [txHash, setTxHash] = useState<TxHash>("");
    const [waiting, setWaiting] = useState<boolean>(false);

    const buy = async function ({
        products,
        lucid,
    }: {
        products: Array<ProductType>;
        lucid: Lucid;
    }): Promise<TxHash> {
        try {
            setWaiting(true);
            const validator: Script = readValidator();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
            const scriptUtxos: UTxO[] = await lucid.utxosAt(contractAddress);

            const utxos: UTxO[] = products.flatMap(function (product) {
                return scriptUtxos.filter((scriptUtxo) => {
                    const marketplaceDatum: MarketplaceDatum = Data.from<MarketplaceDatum>(
                        scriptUtxo.datum!,
                        MarketplaceDatum,
                    );
                    return (
                        marketplaceDatum.policyId === product.policyId &&
                        marketplaceDatum.assetName === product.assetName
                    );
                });
            });

            const utxoOuts = utxos.map(function (utxo: UTxO) {
                return Data.from<MarketplaceDatum>(utxo.datum!, MarketplaceDatum);
            });

            let tx: any = lucid.newTx();

            for (let index = 0; index < utxos.length; index++) {
                let exchange_fee = BigInt((Number(utxoOuts[index].price) * 1) / 100);
                tx = await tx
                    .payToAddress(String(products[index].sellerAddress), {
                        lovelace: utxoOuts[index].price as bigint,
                    })
                    .payToAddress(process.env.WALLET_ADDRESS_FEE_EXCHANGE, {
                        lovelace: exchange_fee,
                    })
                    .payToAddress(products[index].authorAddress, {
                        lovelace: utxoOuts[index].royalties,
                    });
            }

            tx = await tx
                .collectFrom(utxos, MarketplaceRedeemer)
                .attachSpendingValidator(validator)
                .complete();
            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) setTxHash(txHash);
            return txHash;
        } catch (error) {
            return "";
        } finally {
            setWaiting(false);
        }
    };

    const sell = async function ({
        lucid,
        product,
    }: {
        lucid: Lucid;
        product: ProductType;
    }): Promise<TxHash> {
        try {
            setWaiting(true);
            const validator: Script = readValidator();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
            const authorPublicKey: string = fetchPublicKeyFromAddress(product.authorAddress!);
            const sellerPublicKey: string = lucid.utils.getAddressDetails(
                await lucid.wallet.address(),
            ).paymentCredential?.hash as string;

            const datum: string = Data.to(
                {
                    policyId: product.policyId,
                    assetName: product.assetName,
                    seller: sellerPublicKey,
                    author: authorPublicKey,
                    price: product.price!,
                    royalties: product.royalties!,
                },
                MarketplaceDatum,
            );

            const tx = await lucid
                .newTx()
                .payToContract(
                    contractAddress,
                    { inline: datum },
                    { [product.policyId + product.assetName]: BigInt(1) },
                )
                .complete();
            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) setTxHash(txHash);
            return txHash;
        } catch (error) {
            return "";
        } finally {
            setWaiting(false);
        }
    };

    const refund = async function ({
        lucid,
        product,
    }: {
        lucid: Lucid;
        product: ProductType;
    }): Promise<TxHash> {
        try {
            setWaiting(true);
            const validator: Script = readValidator();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
            const scriptUtxos = await lucid.utxosAt(contractAddress);
            let existAsset: any;

            const assets = scriptUtxos.filter(function (asset: any, index: number) {
                const checkAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
                if (
                    checkAsset.policyId === product.policyId &&
                    checkAsset.assetName === product.assetName
                ) {
                    existAsset = Data.from<MarketplaceDatum>(asset.datum, MarketplaceDatum);
                    return true;
                }
                return false;
            });
            if (assets.length === 0) {
                process.exit(1);
            }

            const tx: TxComplete = await lucid
                .newTx()
                .collectFrom(assets, MarketplaceRedeemer)
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
                .complete();

            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: TxHash = await signedTx.submit();
            const success: boolean = await lucid.awaitTx(txHash);
            if (success) setTxHash(txHash);
            return txHash;
        } catch (error) {
            return "";
        } finally {
            setWaiting(false);
        }
    };

    return (
        <SmartContractContext.Provider
            value={{
                txHash,
                waiting,
                sell,
                buy,
                refund,
            }}
        >
            {children}
        </SmartContractContext.Provider>
    );
};

export default SmartContractProvider;
