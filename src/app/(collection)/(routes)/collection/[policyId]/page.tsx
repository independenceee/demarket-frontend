"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CountUp from "react-countup";
import classNames from "classnames/bind";
import { ArrowDropdownCircleIcon, CreatedAtIcon, NftIcon, PolicyIdIcon, SelledIcon, StakekeyIcon, FillDashCircleFillIcon } from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import CopyItem from "@/components/CopyItem";
import styles from "./CollectionPolicyId.module.scss";
import images from "@/assets/images";
import Search from "@/components/Search";
import Category from "@/components/Category";
import Link from "next/link";
import { CollectionItemType, NftItemType } from "@/types/GenericsType";
import fetchInfomationCollection from "@/utils/fetchInfomationCollection";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import Skeleton from "react-loading-skeleton";

import convertDatetimeBlocktime from "@/helpers/convertDatetimeBlocktime";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { AccountContextType } from "@/types/AccountContextType";
import AccountContext from "@/contexts/components/AccountContext";

type Props = {};
const cx = classNames.bind(styles);

const tabItems = [
    { name: "My assets", slug: "my assets" },
    { name: "Selling", slug: "selling" },
    { name: "Created", slug: "created" },
];

const CollectionPolicyId = function ({}: Props) {
    const { policyId } = useParams();

    const { assetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);
    const { assetsFromAddress } = useContext<AccountContextType>(AccountContext);
    const { walletItem } = useContext<LucidContextType>(LucidContext);
    const [activeTab, setActiveTab] = useState<string>("my assets");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [openIntroduce, setOpenIntroduce] = useState<boolean>(true);

    const handleOpenIntroduct = function () {
        setOpenIntroduce(!openIntroduce);
    };

    const [collection, setCollection] = useState<CollectionItemType>(null!);
    const [loadingCollection, setLoadingCollection] = useState<boolean>(false);

    useEffect(() => {
        const fetchCollection = async function () {
            setLoadingCollection(true);
            try {
                const collectionMetadata = await fetchInfomationCollection({ policyId: String(policyId), assetName: "" });
                setCollection(collectionMetadata);
            } catch (error) {
            } finally {
                setLoadingCollection(false);
            }
        };

        if (policyId) {
            fetchCollection();
        }
    }, [policyId]);

    const [assetsFromCollection, setAssetsFromCollection] = useState<NftItemType[]>([]);
    const [loadingAssetsFromCollection, setLoadingAssetsFromCollection] = useState<boolean>(false);
    const [currentPageAssetsFromCollection, setCurrentPageAssetsFromCollection] = useState<number>(1);
    const [totalPagesAssetsFromCollection, setTotalPagesAssetsFromCollection] = useState<number>(1);

    const [sellingAssetsFromCollection, setSellingAssetsFromCollection] = useState<NftItemType[]>([]);
    const [currentPageSellingAssetsFromCollection, setCurrentPageSellingAssetsFromCollection] = useState<number>(1);
    const [totalPagesSellingAssetsFromCollection, setTotalPagesSellingAssetsFromCollection] = useState<number>(1);
    const [loadingSellingAssetsFromCollection, setLoadingSellingAssetsFromCollection] = useState<boolean>(false);

    useEffect(() => {
        const fetchAssetsFromCollection = async function () {
            setLoadingAssetsFromCollection(true);
            try {
                const listAssetFromCollection = assetsFromAddress.filter(function (asset) {
                    return asset.collection === policyId;
                });

                const listAssetSellingFromCollection = assetsFromSmartContract.filter(function (asset) {
                    return asset.collection === collection.address;
                });
                setSellingAssetsFromCollection(listAssetSellingFromCollection)
                setAssetsFromCollection(listAssetFromCollection);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAssetsFromCollection(false);
            }
        };

        if (policyId) {
            fetchAssetsFromCollection();
        }
    }, [policyId, assetsFromAddress]);

    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <section className={cx("banner__wrapper")}>
                    {loadingCollection ? (
                        <Skeleton className={cx("banner__image")} />
                    ) : (
                        <img className={cx("banner__image")} src={convertIpfsAddressToUrl(String(collection?.cover)) as string} alt="Background" />
                    )}
                </section>

                <section className={cx("account__wrapper")}>
                    <div className={cx("account__container")}>
                        <div className={cx("account__image")}>
                            <img src={convertIpfsAddressToUrl(collection?.avatar) || images.user} alt="User" className={cx("image")} />
                        </div>
                        {walletItem.walletAddress === collection?.address && (
                            <Link href={`/mint/${policyId}`} className={cx("account__button")}>
                                Mint Asset
                            </Link>
                        )}
                    </div>

                    <div className={cx("account__content")}>
                        <div className={cx("account__infomation")}>
                            <h3>{collection && collection.title}</h3>
                            <p>{collection && collection.description}</p>
                        </div>
                    </div>
                </section>

                <section className={cx("content__wrapper")}>
                    <aside className={cx("content__left")}>
                        <Search searchValue="" setSearchValue={setSearchValue} />
                        <section className={cx("content__filter")}>
                            <header className={cx("content__filter--header")} onClick={handleOpenIntroduct}>
                                <h3 className={cx("content__filter--title")}>Introduce</h3>
                                {!openIntroduce ? (
                                    <ArrowDropdownCircleIcon className={cx("content__filter--icon")} />
                                ) : (
                                    <FillDashCircleFillIcon className={cx("content__filter--icon")} />
                                )}
                            </header>
                            {openIntroduce && (
                                <article className={cx("content__filter--option")}>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <PolicyIdIcon />
                                            <span>Address:</span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>{collection && collection.address}</p>
                                        <CopyItem value={collection ? String(collection.address) : ""} />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <StakekeyIcon />
                                            <span>PolicyId: </span>
                                        </h4>
                                        <p className={cx("content__filter--description")}>{collection && collection.policyId}</p>
                                        <CopyItem value={collection && collection.policyId} />
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <NftIcon />
                                            <span>NFTs: </span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={assetsFromCollection.length} />
                                        </h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <SelledIcon className={cx("content__filter--icon")} />
                                            <span>NFTs selling:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={sellingAssetsFromCollection.length} />
                                        </h4>
                                    </section>

                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <CreatedAtIcon className={cx("content__filter--icon")} />
                                            <span>Joinned</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            {collection && convertDatetimeBlocktime(Number(assetsFromCollection))}
                                        </h4>
                                    </section>
                                </article>
                            )}
                        </section>

                        <Category setSelectedCategory={setSelectedCategory} />
                    </aside>
                    <article className={cx("content__right")}>
                        <nav className={cx("tab__wrapper")}>
                            <ul className={cx("tab__list")}>
                                {tabItems.map(function (tab, index) {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => setActiveTab(tab.slug)}
                                            className={activeTab == tab.slug ? cx("tab__item--active") : cx("tab__item")}
                                        >
                                            {tab.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <section>
                            {activeTab === "my assets" && <NftContainer nfts={assetsFromCollection} loading={loadingAssetsFromCollection} />}
                            {activeTab === "selling" && (
                                <NftContainer nfts={sellingAssetsFromCollection} loading={loadingSellingAssetsFromCollection} />
                            )}
                        </section>
                        <section className={cx("follower__wrapper")}>
                            <header className={cx("follower__header")}>Popular Creators</header>
                            <div className={cx("follower__container")}>
                                {/* <CollectionContainer collections={collectionsFromAddress} loading={loadingCollectionsFromAddress} /> */}
                            </div>
                        </section>
                    </article>
                </section>
            </div>
        </main>
    );
};

export default CollectionPolicyId;
