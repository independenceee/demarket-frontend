"use client";

import React, { ReactNode, useState, useContext, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AccountContext from "@/contexts/components/AccountContext";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";
import { AccountItemType, CollectionItemType, NftItemType } from "@/types/GenericsType";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { get, post, del } from "@/utils/http-request";
import { toast } from "react-toastify";
import fetchInfomationCollection from "@/utils/fetchInfomationCollection";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const { id: walletAddressParams } = useParams();
    const searchParams = useSearchParams();

    const [walletAddressQuery, setWalletAddressQuery] = useState<string>("");
    useEffect(() => {
        const address = searchParams.get("address");
        setWalletAddressQuery(String(address));
    }, [searchParams]);

    const { assetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);
    const { walletItem, revalidate } = useContext<LucidContextType>(LucidContext);

    const [account, setAccount] = useState<AccountItemType>(null!);
    const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
    useEffect(() => {
        const fetchAccountFromAddress = async function () {
            try {
                setLoadingAccount(true);
                const account: AccountItemType = await post("/account", {
                    walletAddress: walletItem.walletAddress,
                });
                setAccount(account);
                toast.success("Login account successfully.");
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAccount(false);
            }
        };
        if (walletItem.walletAddress) {
            fetchAccountFromAddress();
        }
    }, [walletItem.walletAddress]);

    const [collectionsFromAddress, setCollectionsFromAddress] = useState<CollectionItemType[]>([]);
    const [loadingCollectionsFromAddress, setLoadingCollectionsFromAddress] =
        useState<boolean>(false);
    const [totalPagesCollectionsFromAddress, setTotalPagesCollectionsFromAddress] =
        useState<number>(1);
    const [currentPageCollectionsFromAddress, setCurrentPageCollectionsFromAddress] =
        useState<number>(1);

    const [assetsFromAddress, setAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageAssetsFromAddress, setCurrentPageAssetsFromAddress] = useState<number>(1);
    const [totalPagesAssetsFromAddress, setTotalPagesAssetsFromAddress] = useState<number>(1);
    const [loadingAssetsFromAddress, setLoadingAssetsFromAddress] = useState<boolean>(false);

    useEffect(() => {
        const fetchAssetsFromAddress = async function () {
            setLoadingAssetsFromAddress(true);
            setLoadingCollectionsFromAddress(true);
            try {
                const { paginatedData, totalPage } = await post(
                    `/koios/assets/address-assets?page=${currentPageAssetsFromAddress}&pageSize=${12}`,
                    {
                        address: walletAddressParams || walletAddressQuery,
                    },
                );

                const assetsFromAddress = await Promise.all(
                    paginatedData.map(async ({ policy_id, asset_name, quantity }: any) => {
                        if (policy_id !== "" && asset_name !== "" && quantity === "1") {
                            const data = await fetchInformationAsset({
                                policyId: policy_id,
                                assetName: asset_name,
                            });
                            if (data) return { ...data };
                            return null;
                        }
                    }),
                );

                const collectionsFromAddress = await Promise.all(
                    paginatedData.map(async function ({ policy_id, asset_name, quantity }: any) {
                        if (policy_id !== "" && asset_name === "" && quantity === "1") {
                            const data = await fetchInfomationCollection({
                                policyId: policy_id,
                                assetName: asset_name,
                            });
                            if (data) return { ...data };
                            return null;
                        }
                    }),
                );

                setCollectionsFromAddress(collectionsFromAddress.filter(Boolean));
                setTotalPagesCollectionsFromAddress(totalPage);

                setAssetsFromAddress(assetsFromAddress.filter(Boolean));
                setTotalPagesAssetsFromAddress(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingAssetsFromAddress(false);
                setLoadingCollectionsFromAddress(false);
            }
        };
        if (walletAddressParams || walletAddressQuery) {
            fetchAssetsFromAddress();
        }
    }, [
        walletAddressParams,
        currentPageAssetsFromAddress,
        assetsFromSmartContract,
        revalidate,
        walletAddressQuery,
    ]);

    const [createdAssetsFromAddress, setCreatedAssetsFromAddress] = useState<NftItemType[]>([]);
    const [loadingCreatedAssetsFromAddress, setLoadingCreatedAssetsFromAddress] =
        useState<boolean>(false);
    const [totalPagesCreatedAssetsFromAddress, setTotalPagesCreatedAssetsFromAddress] =
        useState<number>(1);
    const [currentPageCreatedAssetsFromAddress, setCurrentPageCreatedAssetsFromAddress] =
        useState<number>(1);

    useEffect(() => {
        const fetchCreatedAssetsFromAddress = async function () {
            try {
                setLoadingCreatedAssetsFromAddress(true);
                const createdAssetsList = assetsFromAddress.filter(function (asset: NftItemType) {
                    return (
                        asset.authorAddress === walletAddressParams ||
                        asset.authorAddress === walletAddressQuery
                    );
                });

                setCreatedAssetsFromAddress(createdAssetsList);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingCreatedAssetsFromAddress(false);
            }
        };
        if (walletAddressParams || walletAddressQuery) {
            fetchCreatedAssetsFromAddress();
        }
    }, [walletAddressParams, walletAddressQuery, assetsFromSmartContract, assetsFromAddress]);

    const [sellingAssetsFromAddress, setSellingAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageSellingAssetsFromAddress, setCurrentPageSellingAssetsFromAddress] =
        useState<number>(1);
    const [loadingSellingAssetsFromAddress, setLoadingSellingAssetsFromAddress] =
        useState<boolean>(false);
    const [totalPagesSellingAssetsFromAddress, setTotalPagesSellingAssetsFromAddress] =
        useState<number>(1);
    useEffect(() => {
        const fetchSellingsAsset = async function () {
            try {
                setLoadingSellingAssetsFromAddress(true);
                const sellingAssetsList = assetsFromSmartContract.filter(function (
                    asset: NftItemType,
                ) {
                    return (
                        asset.sellerAddress === walletAddressParams ||
                        asset.sellerAddress === walletAddressQuery
                    );
                });
                setSellingAssetsFromAddress(sellingAssetsList);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingSellingAssetsFromAddress(false);
            }
        };
        if (walletAddressParams || walletAddressQuery) {
            fetchSellingsAsset();
        }
    }, [walletAddressParams, walletAddressQuery, assetsFromSmartContract, revalidate]);

    const [followers, setFollowers] = useState<AccountItemType[]>([]);
    const [currentPageFollowers, setCurrentPageFollowers] = useState<number>(1);
    const [totalPagesFollowers, setTotalPagesFollowers] = useState<number>(1);
    const [loadingFollowers, setLoadingFollowers] = useState<boolean>(false);

    useEffect(() => {
        const fetchFollowers = async function () {
            try {
                setLoadingFollowers(true);
                const { accounts, totalPage } = await get("/account/followed", {
                    params: {
                        walletAddress: walletAddressParams,
                        page: currentPageFollowers,
                        pageSize: 12,
                    },
                });

                setFollowers(accounts);
                setTotalPagesFollowers(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingFollowers(false);
            }
        };
        if (walletAddressParams) {
            fetchFollowers();
        }
    }, [currentPageFollowers, walletAddressParams]);

    const [followings, setFollowings] = useState<AccountItemType[]>([]);
    const [currentPageFollowings, setCurrentPageFollowings] = useState<number>(1);
    const [totalPagesFollowings, setTotalPagesFollowings] = useState<number>(1);
    const [loadingFollowings, setLoadingFollowings] = useState<boolean>(false);

    useEffect(() => {
        const fetchFollowings = async function () {
            try {
                setLoadingFollowings(true);
                const { accounts, totalPage } = await get("/account/following", {
                    params: {
                        walletAddress: walletAddressParams,
                        page: currentPageFollowings,
                        pageSize: 12,
                    },
                });

                setFollowings(accounts);
                setTotalPagesFollowings(totalPage);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingFollowings(false);
            }
        };
        if (walletAddressParams) {
            fetchFollowings();
        }
    }, [currentPageFollowings, walletAddressParams]);

    const followAccount = async function ({
        accountId,
        accountIdFollow,
    }: {
        accountId: string;
        accountIdFollow: string;
    }) {
        try {
            await post("/follow", {
                followingId: accountId,
                followerId: accountIdFollow,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const unFollowAccount = async function ({
        accountId,
        accountIdUnFollow,
    }: {
        accountId: string;
        accountIdUnFollow: string;
    }) {
        try {
            await del("/follow", {
                followerId: accountId,
                followingId: accountIdUnFollow,
            });
        } catch (error) {}
    };

    return (
        <AccountContext.Provider
            value={{
                account,
                loadingAccount,
                setAccount,

                assetsFromAddress,
                setAssetsFromAddress,
                currentPageAssetsFromAddress,
                setCurrentPageAssetsFromAddress,
                totalPagesAssetsFromAddress,
                setTotalPagesAssetsFromAddress,
                loadingAssetsFromAddress,
                setLoadingAssetsFromAddress,

                createdAssetsFromAddress,
                setCreatedAssetsFromAddress,
                currentPageCreatedAssetsFromAddress,
                setCurrentPageCreatedAssetsFromAddress,
                totalPagesCreatedAssetsFromAddress,
                setTotalPagesCreatedAssetsFromAddress,
                loadingCreatedAssetsFromAddress,
                setLoadingCreatedAssetsFromAddress,

                sellingAssetsFromAddress,
                setSellingAssetsFromAddress,
                currentPageSellingAssetsFromAddress,
                setCurrentPageSellingAssetsFromAddress,
                totalPagesSellingAssetsFromAddress,
                setTotalPagesSellingAssetsFromAddress,
                loadingSellingAssetsFromAddress,
                setLoadingSellingAssetsFromAddress,

                followers,
                setFollowers,
                currentPageFollowers,
                setCurrentPageFollowers,
                loadingFollowers,
                setLoadingFollowers,
                totalPagesFollowers,
                setTotalPagesFollowers,

                followings,
                setFollowings,
                loadingFollowings,
                setLoadingFollowings,
                currentPageFollowings,
                setCurrentPageFollowings,
                totalPagesFollowings,
                setTotalPagesFollowings,

                collectionsFromAddress,
                setCollectionsFromAddress,
                loadingCollectionsFromAddress,
                setLoadingCollectionsFromAddress,
                totalPagesCollectionsFromAddress,
                setTotalPagesCollectionsFromAddress,
                currentPageCollectionsFromAddress,
                setCurrentPageCollectionsFromAddress,

                followAccount,
                unFollowAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
