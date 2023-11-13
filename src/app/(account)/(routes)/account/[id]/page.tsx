"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import {
    ArrowDropdownCircleIcon,
    CreatedAtIcon,
    FollowerIcon,
    NftIcon,
    PolicyIdIcon,
    RatingIcon,
    SearchIcon,
    SelledIcon,
    StakekeyIcon,
    ArrowRightIcon,
} from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import CopyItem from "@/components/CopyItem";
import customChars from "@/helpers/convertString";
import AccountContainer from "@/components/AccountContainer";
import Modal from "@/components/Modal";
import { useModal } from "@/hooks";
import styles from "./Account.module.scss";
import images from "@/assets/images";
import axios from "axios";
import { LucidContextType, SmartContractType } from "@/types";
import LucidContext from "@/contexts/components/LucidContext";
import SmartContractContext from "@/contexts/components/SmartContractContext";

type Props = {};
const cx = classNames.bind(styles);

const AccountPage = function ({}: Props) {
    const { walletAddress } = useContext<LucidContextType>(LucidContext);
    const { listAssetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);

    const tabItems = [
        { name: "My assets", slug: "my assets" },
        { name: "Selling", slug: "selling" },
        { name: "Created", slug: "created" },
        { name: "Collection", slug: "collection" },
        { name: "Following", slug: "following" },
        { name: "Follower", slug: "follower" },
        { name: "Like", slug: "like" },
    ];
    const [activeTab, setActiveTab] = useState<string>("my assets");

    const { isShowing = true, toggle } = useModal();

    const [sellingAssets, setSellingAssets] = useState<any>([]);
    const [assetsFromAddress, setAssetsFromAddress] = useState<any>([]);

    useEffect(
        function () {
            const fetchMetadataFromAddress = async function () {
                try {
                    const response = await axios.post(
                        "https://demarket-backend.vercel.app/api/v1/koios/assets/address-assets",
                        {
                            address: walletAddress,
                        },
                    );

                    const assetsFromAddress = await Promise.all(
                        response.data[0].asset_list.map(async ({ policy_id, asset_name }: any) => {
                            const response = await axios.post(
                                "https://demarket-backend.vercel.app/api/v1/blockfrost/assets/information",
                                {
                                    policyId: policy_id,
                                    assetName: asset_name,
                                },
                            );

                            const data = response.data.onchain_metadata;

                            if (data) {
                                return {
                                    ...data,
                                    policyId: policy_id,
                                    assetName: asset_name,
                                };
                            }
                            return null;
                        }),
                    );

                    setAssetsFromAddress(assetsFromAddress.filter(Boolean));
                } catch (error) {
                    console.log(error);
                }
            };

            fetchMetadataFromAddress();
        },
        [walletAddress],
    );

    useEffect(
        function () {
            const handleSelling = function () {
                let sellingAssetsList = listAssetsFromSmartContract.filter(function (asset: any, index: number) {
                    console.log(asset);
                    return asset.sellerAddress === walletAddress;
                });

                setSellingAssets(sellingAssetsList);
            };
            handleSelling();
        },
        [walletAddress, listAssetsFromSmartContract],
    );

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("banner__wrapper")}>
                    <Image className={cx("banner__image")} src={images.background} alt="Background" />
                </section>
                <section className={cx("avatar__wrapper")}>
                    <div className={cx("avatar__container")}>
                        <div className={cx("avatar__image--container")}>
                            <Image className={cx("avatar__image--image")} src={images.user} alt="User Avatar" />
                        </div>
                        <div></div>
                        <div className={cx("follower")}>FOLLOW</div>
                    </div>
                    <div className={cx("avatar__infomation")}>
                        <h4 className={cx("avatar__infomation--name")}>{walletAddress}</h4>
                        <h4 className={cx("avatar__infomation--description")}>Slogan</h4>
                    </div>
                    <div className={cx("avatar__social")}>
                        <p>
                            <NftIcon />
                        </p>
                        <p>
                            <NftIcon />
                        </p>
                        <p>
                            <NftIcon />
                        </p>
                    </div>
                </section>

                <section className={cx("content__wrapper")}>
                    {!isShowing && (
                        <div onClick={toggle} className={cx("content__icon")}>
                            <ArrowRightIcon className={cx("icon")} />
                        </div>
                    )}

                    <Modal isShowing={isShowing} toggle={toggle}>
                        <aside className={cx("content__left--reponsive")}>
                            <section className={cx("content__search")}>
                                <h4 className={cx("content__search--header")}>Search</h4>
                                <article className={cx("content__search--control")}>
                                    <input type="text" placeholder="Search" className={cx("content__search--input")} />
                                    <button className={cx("content__search--btn")}>
                                        <SearchIcon className={cx("content__search--icon")} />
                                    </button>
                                </article>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Introduce</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <PolicyIdIcon />
                                            <span>PolicyId:</span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>
                                            {customChars({
                                                inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
                                                numberOfFirstChar: 8,
                                                numberOfLastChar: -8,
                                            })}
                                        </p>
                                        <CopyItem value="123" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <StakekeyIcon />
                                            <span>Stake key: </span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>
                                            {customChars({
                                                inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
                                                numberOfFirstChar: 8,
                                                numberOfLastChar: -7,
                                            })}
                                        </p>
                                        <CopyItem value="123" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <NftIcon />
                                            <span>NFTs: </span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>123</h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <SelledIcon className={cx("content__filter--icon")} />
                                            <span>NFTs selled:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>123</h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <FollowerIcon className={cx("content__filter--icon")} />
                                            <span>Followers:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>123</h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <RatingIcon className={cx("content__filter--icon")} />
                                            <span>Rating</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>123</h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <CreatedAtIcon className={cx("content__filter--icon")} />
                                            <span>Joinned</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>123</h4>
                                    </section>
                                </article>
                            </section>

                            <section className={cx("content__filter")}>
                                <header className={cx("content__filter--header")}>
                                    <h3 className={cx("content__filter--title")}>Category</h3>
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                </header>
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>All</h4>
                                        <input className={cx("content__filter--control")} type="checkbox" />
                                    </section>
                                </article>
                            </section>
                        </aside>
                    </Modal>

                    <aside className={cx("content__left")}>
                        <section className={cx("content__search")}>
                            <h4 className={cx("content__search--header")}>Search</h4>
                            <article className={cx("content__search--control")}>
                                <input type="text" placeholder="Search" className={cx("content__search--input")} />
                                <button className={cx("content__search--btn")}>
                                    <SearchIcon className={cx("content__search--icon")} />
                                </button>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Introduce</h3>
                                <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <PolicyIdIcon />
                                        <span>PolicyId:</span>
                                    </h4>
                                    <p className={cx("content__filter--description")}>
                                        {customChars({
                                            inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
                                            numberOfFirstChar: 8,
                                            numberOfLastChar: -8,
                                        })}
                                    </p>
                                    <CopyItem value="123" />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <StakekeyIcon />
                                        <span>Stake key: </span>
                                    </h4>
                                    <p className={cx("content__filter--description")}>
                                        {customChars({
                                            inputString: "977173d6324267b6bb5dbf574694bfd9349f60cdbc547b87978abc07",
                                            numberOfFirstChar: 8,
                                            numberOfLastChar: -7,
                                        })}
                                    </p>
                                    <CopyItem value="123" />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <NftIcon />
                                        <span>NFTs: </span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <SelledIcon className={cx("content__filter--icon")} />
                                        <span>NFTs selled:</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <FollowerIcon className={cx("content__filter--icon")} />
                                        <span>Followers:</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <RatingIcon className={cx("content__filter--icon")} />
                                        <span>Rating</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>
                                        <CreatedAtIcon className={cx("content__filter--icon")} />
                                        <span>Joinned</span>
                                    </h4>
                                    <h4 className={cx("content__filter--value")}>123</h4>
                                </section>
                            </article>
                        </section>

                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")}>
                                <h3 className={cx("content__filter--title")}>Category</h3>
                                <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                            </header>
                            <article className={cx("content__filter--option")}>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input className={cx("content__filter--control")} type="checkbox" />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input className={cx("content__filter--control")} type="checkbox" />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input className={cx("content__filter--control")} type="checkbox" />
                                </section>
                                <section className={cx("content__filter--group")}>
                                    <h4 className={cx("content__filter--name")}>All</h4>
                                    <input className={cx("content__filter--control")} type="checkbox" />
                                </section>
                            </article>
                        </section>
                    </aside>
                    <article className={cx("content__right")}>
                        <nav className={cx("tab__wrapper")}>
                            <ul className={cx("tab__list")}>
                                {tabItems.map(function (tab, index) {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => setActiveTab(tab.slug)}
                                            className={
                                                activeTab == tab.slug ? cx("tab__item--active") : cx("tab__item")
                                            }
                                        >
                                            {tab.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <section>
                            {activeTab === "my assets" && <NftContainer data={assetsFromAddress} />}
                            {activeTab === "selling" && <NftContainer data={sellingAssets} />}
                            {activeTab === "created" && <NftContainer data={assetsFromAddress} />}
                            {activeTab === "collection" && <NftContainer data={assetsFromAddress} />}
                            {activeTab === "following" && <NftContainer data={assetsFromAddress} />}
                            {activeTab === "follower" && <NftContainer data={assetsFromAddress} />}
                            {activeTab === "like" && <NftContainer data={assetsFromAddress} />}
                        </section>
                        <section className={cx("follower__wrapper")}>
                            <header className={cx("follower__header")}>Popular Creators</header>
                            <div className={cx("follower__container")}>
                                <AccountContainer
                                    data={[
                                        1, 2, 3, 4, 5, 6, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                        1, 1, 1, 8, 9, 10,
                                    ]}
                                    itemsPerPage={12}
                                />
                            </div>
                        </section>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default AccountPage;
