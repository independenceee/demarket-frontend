"use client";

import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Marketplace.module.scss";

import { LucidContextType } from "@/types";
import LucidContext from "@/contexts/components/LucidContext";

const cx = classNames.bind(styles);
type Props = {};

const MarketplacePage = function ({}: Props) {
    const { lucid, sellAssetService, buyAssetService } =
        useContext<LucidContextType>(LucidContext);

    // const handleSellAsset = async function () {
    //     if (lucid) {
    //         await sellAssetService({
    //             policyId: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
    //             assetName: "5468c3a06e68204b6875e1baa574",
    //             author: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
    //             seller: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
    //             lucid: lucid,
    //             price: BigInt(100),
    //             royalties: BigInt(100),
    //         });
    //     }
    // };
    const handleSellAsset = async function () {
        if (lucid) {
            await sellAssetService({
                policyId: "1839a168026b184f697353ada4bb891ebd81e272522364444eff0801",
                assetName: "4d657368546f6b656e",
                author: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
                seller: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
                lucid: lucid,
                price: BigInt(10000000),
                royalties: BigInt(10000000),
            });
        }
    };

    const handleBuyAsset = async function () {
        try {
            if (lucid) {
                await buyAssetService({
                    policyId: "1839a168026b184f697353ada4bb891ebd81e272522364444eff0801",
                    assetName: "4d657368546f6b656e",
                    // author: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
                    // seller: "1c69e69e63fb7cbead246520981b09f2edafa4099eb4f2bac1efa759",
                    lucid: lucid,
                    // price: BigInt(100),
                    // royalties: BigInt(100),
                });
            }

        }catch(error) {
            console.log(error);
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("background__wrapper")}></section>
                <section className={cx("title__wrapper")}>
                    <span className={cx("title__main")}>Home</span>
                    <span className={cx("title__middle")}></span>
                    <span className={cx("title__slug")}>Marketplace</span>
                </section>
                <section className={cx("content__wrapper")}>
                    <div>
                        {lucid ? <button onClick={handleSellAsset}>Sell</button> : <></>}
                        {lucid ? <button onClick={handleBuyAsset}>Buy</button> : <></>}
                    </div>
                    <div></div>
                </section>
            </div>
        </div>
    );
};

export default MarketplacePage;
