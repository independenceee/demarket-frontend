"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CountUp from "react-countup";
import classNames from "classnames/bind";

import {
    ArrowDropdownCircleIcon,
    CreatedAtIcon,
    FollowerIcon,
    NftIcon,
    PolicyIdIcon,
    RatingIcon,
    SelledIcon,
    StakekeyIcon,
    FillDashCircleFillIcon,
} from "@/components/Icons";
import NftContainer from "@/components/NftContainer";
import CopyItem from "@/components/CopyItem";
import styles from "./CollectionPolicyId.module.scss";
import images from "@/assets/images";
import Search from "@/components/Search";
import Category from "@/components/Category";
import Link from "next/link";
import CollectionContainer from "@/components/CollectionContainer";
import { CollectionItemType, NftItemType } from "@/types/GenericsType";
import fetchInfomationCollection from "@/utils/fetchInfomationCollection";
import convertIpfsAddressToUrl from "@/helpers/convertIpfsAddressToUrl";
import Skeleton from "react-loading-skeleton";
import { post } from "@/utils/httpRequest";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import convertDatetimeBlocktime from "@/helpers/convertDatetimeBlocktime";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";

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
    const { walletItem } = useContext<LucidContextType>(LucidContext);

    const [activeTab, setActiveTab] = useState<string>("my assets");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [openIntroduce, setOpenIntroduce] = useState<boolean>(false);

    const handleOpenIntroduct = function () {
        setOpenIntroduce(!openIntroduce);
    };

    const [collection, setCollection] = useState<CollectionItemType>(null!);
    const [loadingCollection, setLoadingCollection] = useState<boolean>(false);

    // https://demarket-backend.vercel.app/api/v1/blockfrost/transaction/asset
    // https://demarket-backend.vercel.app/api/v1/koios/assets/policy-list

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

    const [assetsFromPolicyId, setAssetsFromPolicyId] = useState<NftItemType[]>([]);
    const [loadingAssetsFromPolicyId, setLoadingAssetsFromPolicyId] = useState<boolean>(false);
    const [currentPageAssetsFromPolicyId, setCurrentPageAssetsFromPolicyId] = useState<number>(1);
    const [totalPagesAssetsFromPolicyId, setTotalPagesAssetsFromPolicyId] = useState<number>(1);

    const [sellingAssetsFromPolicyId, setSellingAssetsFromPolicyId] = useState<NftItemType[]>([]);
    const [currentPageSellingAssetsFromPolicyId, setCurrentPageSellingAssetsFromPolicyId] = useState<number>(1);
    const [totalPagesSellingAssetsFromPolicyId, setTotalPagesSellingAssetsFromPolicyId] = useState<number>(1);
    const [loadingSellingAssetsFromPolicyId, setLoadingSellingAssetsFromPolicyId] = useState<boolean>(false);

    useEffect(() => {
        const fetchAssetsFromPolicyId = async function () {
            setLoadingAssetsFromPolicyId(true);
            try {
                const { paginatedData, totalPage } = await post(`/koios/assets/policy-list?page=${currentPageAssetsFromPolicyId}&pageSize=${12}`, {
                    policyId: policyId,
                });

                const assetsFromPolicyId = await Promise.all(
                    paginatedData.map(async function ({ policy_id, asset_name, quantity }: any) {
                        if (policy_id !== "" && asset_name !== "" && quantity === "1") {
                            const data = await fetchInformationAsset({ policyId: policy_id, assetName: asset_name });
                            if (data) return { ...data };
                            return null;
                        }
                    }),
                );

                const sellingAssetsList = assetsFromSmartContract.filter(function (asset: NftItemType) {
                    return asset.sellerAddress === collection.address;
                });

                setSellingAssetsFromPolicyId(sellingAssetsList);
                setTotalPagesAssetsFromPolicyId(totalPage);
                setAssetsFromPolicyId(assetsFromPolicyId.filter(Boolean));
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAssetsFromPolicyId(false);
            }
        };

        if (policyId) {
            fetchAssetsFromPolicyId();
        }
    }, [policyId, assetsFromSmartContract]);

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
                                            <CountUp start={0} end={assetsFromPolicyId.length} />
                                        </h4>
                                    </section>
                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <SelledIcon className={cx("content__filter--icon")} />
                                            <span>NFTs selling:</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            <CountUp start={0} end={sellingAssetsFromPolicyId.length} />
                                        </h4>
                                    </section>

                                    <section className={cx("content__filter--group")}>
                                        <h4 className={cx("content__filter--name")}>
                                            <CreatedAtIcon className={cx("content__filter--icon")} />
                                            <span>Joinned</span>
                                        </h4>
                                        <h4 className={cx("content__filter--value")}>
                                            {collection && convertDatetimeBlocktime(Number(assetsFromPolicyId))}
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
                            {activeTab === "my assets" && <NftContainer nfts={assetsFromPolicyId} loading={loadingAssetsFromPolicyId} />}
                            {activeTab === "selling" && <NftContainer nfts={sellingAssetsFromPolicyId} loading={loadingSellingAssetsFromPolicyId} />}
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
