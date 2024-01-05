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
import { get, post, del } from "@/utils/httpRequest";
import { toast } from "react-toastify";

type Props = {
    children: ReactNode;
};

const AccountProvider = function ({ children }: Props) {
    const { id: walletAddressParams } = useParams();
    const { assetsFromSmartContract } = useContext<SmartContractType>(SmartContractContext);
    const { walletItem, revalidate } = useContext<LucidContextType>(LucidContext);

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
                    toast.success("Login account successfully.");
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
                    const { paginatedData, totalPage } = await post(
                        `/koios/assets/address-assets?page=${currentPageAssetsFromAddress}&pageSize=${8}`,
                        { address: walletAddressParams },
                    );
                    const assetsFromAddress = await Promise.all(
                        paginatedData.map(async ({ policy_id, asset_name }: any) => {
                            const data = await fetchInformationAsset({ policyId: policy_id, assetName: asset_name });
                            if (data) return { ...data };
                            return null;
                        }),
                    );

                    setAssetsFromAddress(assetsFromAddress.filter(Boolean));
                    setTotalPagesAssetsFromAddress(totalPage);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoadingAssetsFromAddress(false);
                }
            };
            if (walletAddressParams) {
                fetchAssetsFromAddress();
            }
        },
        [walletAddressParams, currentPageAssetsFromAddress, assetsFromSmartContract, revalidate],
    );

    const [createdAssetsFromAddress, setCreatedAssetsFromAddress] = useState<NftItemType[]>([]);
    const [loadingCreatedAssetsFromAddress, setLoadingCreatedAssetsFromAddress] = useState<boolean>(false);
    const [totalPagesCreatedAssetsFromAddress, setTotalPagesCreatedAssetsFromAddress] = useState<number>(1);
    const [currentPageCreatedAssetsFromAddress, setCurrentPageCreatedAssetsFromAddress] = useState<number>(1);

    useEffect(
        function () {
            const fetchCreatedAssetsFromAddress = async function () {
                try {
                    setLoadingCreatedAssetsFromAddress(true);
                    const createdAssetsList = assetsFromAddress.filter(function (asset: NftItemType) {
                        return asset.authorAddress === walletAddressParams;
                    });
                    setCreatedAssetsFromAddress(createdAssetsList);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoadingCreatedAssetsFromAddress(false);
                }
            };
            if (walletAddressParams) {
                fetchCreatedAssetsFromAddress();
            }
        },
        [walletAddressParams, assetsFromSmartContract],
    );

    const [sellingAssetsFromAddress, setSellingAssetsFromAddress] = useState<NftItemType[]>([]);
    const [currentPageSellingAssetsFromAddress, setCurrentPageSellingAssetsFromAddress] = useState<number>(1);
    const [loadingSellingAssetsFromAddress, setLoadingSellingAssetsFromAddress] = useState<boolean>(false);
    const [totalPagesSellingAssetsFromAddress, setTotalPagesSellingAssetsFromAddress] = useState<number>(1);
    useEffect(
        function () {
            const fetchSellingsAsset = async function () {
                try {
                    setLoadingSellingAssetsFromAddress(true);
                    const sellingAssetsList = assetsFromSmartContract.filter(function (asset: NftItemType) {
                        return asset.sellerAddress === walletAddressParams;
                    });
                    setSellingAssetsFromAddress(sellingAssetsList);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoadingSellingAssetsFromAddress(false);
                }
            };
            if (walletAddressParams) {
                fetchSellingsAsset();
            }
        },
        [walletAddressParams, assetsFromSmartContract],
    );

    const [followers, setFollowers] = useState<AccountItemType[]>([]);
    const [currentPageFollowers, setCurrentPageFollowers] = useState<number>(1);
    const [totalPagesFollowers, setTotalPagesFollowers] = useState<number>(1);
    const [loadingFollowers, setLoadingFollowers] = useState<boolean>(false);

    useEffect(
        function () {
            const fetchFollowers = async function () {
                try {
                    setLoadingFollowers(true);
                    const { accounts, totalPage } = await get("/account/followed", {
                        params: { walletAddress: walletAddressParams, page: currentPageFollowers, pageSize: 12 },
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
        },
        [currentPageFollowers, walletAddressParams],
    );

    const [followings, setFollowings] = useState<AccountItemType[]>([]);
    const [currentPageFollowings, setCurrentPageFollowings] = useState<number>(1);
    const [totalPagesFollowings, setTotalPagesFollowings] = useState<number>(1);
    const [loadingFollowings, setLoadingFollowings] = useState<boolean>(false);

    useEffect(
        function () {
            const fetchFollowings = async function () {
                try {
                    setLoadingFollowings(true);
                    const { accounts, totalPage } = await get("/account/following", {
                        params: { walletAddress: walletAddressParams, page: currentPageFollowings, pageSize: 12 },
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
        },
        [currentPageFollowings, walletAddressParams],
    );

    const followAccount = async function ({ accountId, accountIdFollow }: { accountId: string; accountIdFollow: string }) {
        try {
            await post("/follow", {
                followingId: accountId,
                followerId: accountIdFollow,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const unFollowAccount = async function ({ accountId, accountIdUnFollow }: { accountId: string; accountIdUnFollow: string }) {
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

                followAccount,
                unFollowAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
