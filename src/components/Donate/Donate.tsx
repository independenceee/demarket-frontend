"use client";
import * as dotenv from "dotenv";
import React, { useState, useContext, ChangeEvent, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Donate.module.scss";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import ReactPlayer from "react-player";
import Button from "@/components/Button";
import { toast } from "react-toastify";

dotenv.config();
const cx = classNames.bind(styles);

type Props = {};
const Donate = function ({}: Props) {
    const { lucidWallet, walletItem } = useContext<LucidContextType>(LucidContext);
    const { isShowingConnectWalletMainnet, toggleShowingConnectWalletMainnet } = useContext<ModalContextType>(ModalContext);
    const [price, setPrice] = useState<string>("");
    const [loadingDonatePlatform, setLoadingDonatePlatform] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null!);
    const handleChangePrice = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPrice(event.target.value);
    };

    const handleDonate = async function () {
        setLoadingDonatePlatform(true);
        try {
            if (lucidWallet || !price) {
                const tx = await lucidWallet
                    .newTx()
                    .payToAddress("addr_test1qzndmp8766ymgdsqkll9fq4tp63a0qey9q7le7g3wx4wu5d7080dwpufa65mkmh402unp4d4meyftg723gysz7mfnrqqfg09fs", {
                        lovelace: BigInt(Number(price) * 1000000),
                    })
                    .complete();
                const signedTx = await tx.sign().complete();
                const txHash = await signedTx.submit();
                setPrice("");
                inputRef.current.focus();
                toast.success("Thank you for Donate !");
                return;
            }
            toggleShowingConnectWalletMainnet();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingDonatePlatform(false);
        }
    };

    return (
        <div className={cx("wrapper")} data-aos="fade-up">
            <div className={cx("container")}>
                <section className={cx("image__wrapper")}>
                    <ReactPlayer className={cx("image__image")} controls url="https://www.youtube.com/watch?v=icX1mgKkrS0" />
                </section>

                <section className={cx("about__content")} data-aos="fade-left">
                    <h2>Open Your Own Marketplace</h2>
                    <p>
                        In the era of digital transformation with the rise of digital art, NFT has gradually changed the concept of ownership and
                        created a revolution connecting with digital assets. demarket, a decentralized NFT exchange on the Cardano Blockchain platform
                        from BlockAlpha.
                    </p>
                    <p>
                        Demarket is a decentralized NFT exchange project developed by the BlockAlpha team. The project has received high ratings from
                        the review (CR) community with a score of 4.61, and ranked 2nd in the ranking in the Startup & Onboarding for Students
                        category of Project Catalyst Fund 10.
                    </p>

                    <div className={cx("about__button")}>
                        <input
                            ref={inputRef}
                            value={price}
                            onChange={handleChangePrice}
                            className={cx("input_donate")}
                            type="text"
                            placeholder="Enter the price"
                        />
                        <Button className={cx("button")} onClick={handleDonate}>
                            Donate us
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Donate;
