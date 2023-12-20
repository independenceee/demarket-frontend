"use client";

import React, { ReactNode, useState, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import AccountContext from "@/contexts/components/AccountContext";
import LucidContext from "@/contexts/components/LucidContext";
import { LucidContextType } from "@/types/LucidContextType";
import { AccountItemType, NftItemType } from "@/types/GenericsType";
import fetchInformationAsset from "@/utils/fetchInformationAsset";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { get, post } from "@/utils/httpRequest";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const { id: walletAddressParams } = useParams();
    const { assetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);
    const { walletItem } = useContext<LucidContextType>(LucidContext);

    /**
     * TODO: Get account infomation when connect wallet
     */
    const [account, setAccount] = useState<AccountItemType>(null!);
    const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
    useEffect(
        function () {
            const fetchAccountFromAddress = async function () {
                try {
                    setLoadingAccount(true);
                    const account: AccountItemType = await post("/account", {
                        walletAddress: walletItem.walletAddress,
                    });
                    setAccount(account);
                    setLoadingAccount(false);
                } catch (error) {
                    console.log(error);
                }
            };
            if (walletItem.walletAddress) {
                fetchAccountFromAddress();
            }
        },
        [walletItem.walletAddress],
    );

    /**
     * TODO: Get All Assets from account
     */
    const [assetsFromAddress, setAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageAssetsFromAddress, setCurrentPageAssetsFromAddress] = useState<number>(1);
    const [totalPagesAssetsFromAddress, setTotalPagesAssetsFromAddress] = useState<number>(1);
    const [loadingAssetsFromAddress, setLoadingAssetsFromAddress] = useState<boolean>(false);

    useEffect(
        function () {
            const fetchAssetsFromAddress = async function () {
                try {
                    setLoadingAssetsFromAddress(true);
                    if (walletItem.walletAddress === walletAddressParams) {
                        const { paginatedData, totalPage } = await post(
                            `/koios/assets/address-assets?page=${currentPageAssetsFromAddress}&pageSize=${12}`,
                            {
                                address: walletItem.walletAddress || walletAddressParams,
                            },
                        );

                        const assetsFromAddress = await Promise.all(
                            paginatedData.map(async ({ policy_id, asset_name }: any) => {
                                const data = await fetchInformationAsset({
                                    policyId: policy_id,
                                    assetName: asset_name,
                                });
                                if (data) {
                                    return { ...data };
                                }
                                return null;
                            }),
                        );

                        setAssetsFromAddress(assetsFromAddress.filter(Boolean));
                        setTotalPagesAssetsFromAddress(totalPage);
                    } else {
                        const { paginatedData, totalPage } = await post(
                            `/koios/assets/address-assets?page=${currentPageAssetsFromAddress}&pageSize=${8}`,
                            { address: walletAddressParams },
                        );

                        const assetsFromAddress = await Promise.all(
                            paginatedData.map(async ({ policy_id, asset_name }: any) => {
                                const data = await fetchInformationAsset({
                                    policyId: policy_id,
                                    assetName: asset_name,
                                });
                                if (data) {
                                    return { ...data };
                                }
                                return null;
                            }),
                        );

                        setAssetsFromAddress(assetsFromAddress.filter(Boolean));
                        setTotalPagesAssetsFromAddress(totalPage);
                    }
                    setLoadingAssetsFromAddress(false);
                } catch (error) {
                    console.log(error);
                }
            };
            if (walletAddressParams) {
                fetchAssetsFromAddress();
            }
        },
        [walletItem.walletAddress, walletAddressParams, currentPageAssetsFromAddress, assetsFromSmartContract],
    );

    /**
     * TODO: Get assets created from account
     */

    const [createdAssetsFromAddress, setCreatedAssetsFromAddress] = useState<NftItemType[]>([]);
    const [loadingCreatedAssetsFromAddress, setLoadingCreatedAssetsFromAddress] = useState<boolean>(false);
    const [totalPagesCreatedAssetsFromAddress, setTotalPagesCreatedAssetsFromAddress] = useState<number>(1);
    const [currentPageCreatedAssetsFromAddress, setCurrentPageCreatedAssetsFromAddress] = useState<number>(1);

    useEffect(
        function () {
            const fetchCreatedAssetsFromAddress = async function () {
                try {
                    setLoadingCreatedAssetsFromAddress(true);
                    if (walletItem.walletAddress === walletAddressParams) {
                        const createdAssetsList = assetsFromAddress.filter(function (asset: NftItemType) {
                            return (
                                asset.authorAddress === walletAddressParams
                                // walletItem.walletAddress === walletAddressParams
                            );
                        });
                        setCreatedAssetsFromAddress(createdAssetsList);
                    } else {
                        const createdAssetsList = assetsFromAddress.filter(function (asset: NftItemType) {
                            return asset.authorAddress === walletAddressParams;
                        });
                        setCreatedAssetsFromAddress(createdAssetsList);
                    }
                    setLoadingCreatedAssetsFromAddress(false);
                } catch (error) {
                    console.log(error);
                }
            };
            if (walletAddressParams) {
                fetchCreatedAssetsFromAddress();
            }
        },
        [walletItem.walletAddress, walletAddressParams, assetsFromSmartContract],
    );

    /**
     * TODO: Get assets selling from accounts
     */

    const [sellingAssetsFromAddress, setSellingAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageSellingAssetsFromAddress, setCurrentPageSellingAssetsFromAddress] = useState<number>(1);
    const [loadingSellingAssetsFromAddress, setLoadingSellingAssetsFromAddress] = useState<boolean>(true);
    const [totalPagesSellingAssetsFromAddress, setTotalPagesSellingAssetsFromAddress] = useState<number>(1);

    useEffect(
        function () {
            const fetchSellingsAsset = function () {
                if (walletItem.walletAddress === walletAddressParams) {
                    const sellingAssetsList = assetsFromSmartContract.filter(function (asset: NftItemType) {
                        return (
                            asset.sellerAddress === walletAddressParams ||
                            asset.authorAddress === walletItem.walletAddress
                        );
                    });

                    setSellingAssetsFromAddress(sellingAssetsList);
                } else {
                    const sellingAssetsList = assetsFromAddress.filter(function (asset: NftItemType) {
                        return asset.sellerAddress === walletAddressParams;
                    });
                    setSellingAssetsFromAddress(sellingAssetsList);
                }
            };
            fetchSellingsAsset();
        },
        [walletItem.walletAddress, walletAddressParams, assetsFromSmartContract],
    );

    /**
     * TODO: Get accounts follower from account
     */

    const [followers, setFollowers] = useState<AccountItemType[]>([]);
    const [currentPageFollowers, setCurrentPageFollowers] = useState<number>(1);
    const [totalPagesFollowers, setTotalPagesFollowers] = useState<number>(1);
    const [loadingFollowers, setLoadingFollowers] = useState<boolean>(true);
    const fetchFollowers = async function () {
        try {
            const { accountsFollowed, totalPage } = await get("/follow/followed", {
                params: { walletAddress: walletAddressParams, page: currentPageFollowers, pageSize: 12 },
            });

            setFollowers(accountsFollowed);
            setTotalPagesFollowers(totalPage);
            setLoadingFollowers(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(
        function () {
            if (walletAddressParams) {
                fetchFollowers();
            }
        },
        [currentPageFollowers, walletAddressParams],
    );

    /**
     *  TODO: Get accounts following from account
     */

    const [followings, setFollowings] = useState<AccountItemType[]>([]);
    const [currentPageFollowings, setCurrentPageFollowings] = useState<number>(1);
    const [totalPagesFollowings, setTotalPagesFollowings] = useState<number>(1);
    const [loadingFollowings, setLoadingFollowings] = useState<boolean>(true);
    const fetchFollowings = async function () {
        try {
            const { accountsFollowing, totalPage } = await get("/follow/following", {
                params: { walletAddress: walletAddressParams, page: currentPageFollowings, pageSize: 12 },
            });

            setFollowings(accountsFollowing);
            setTotalPagesFollowings(totalPage);
            setLoadingFollowings(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(
        function () {
            if (walletAddressParams) {
                fetchFollowings();
            }
        },
        [currentPageFollowings, walletAddressParams],
    );

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
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
