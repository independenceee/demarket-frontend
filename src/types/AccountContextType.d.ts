import { AccountItem, NftItemType } from "@/types/GenericsType";

export type AccountContextType = {
    account: AccountItem;
    loadingAccount: boolean;

    assetsFromAddress: NftItemType[];
    setAssetsFromAddress: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    currentPageAssetsFromAddress: number;
    setCurrentPageAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    totalPagesAssetsFromAddress: number;
    setTotalPagesAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    loadingAssetsFromAddress: boolean;
    setLoadingAssetsFromAddress: React.Dispatch<React.SetStateAction<boolean>>;

    createdAssetsFromAddress: NftItemType[];
    setCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    currentPageCreatedAssetsFromAddress: number;
    setCurrentPageCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    totalPagesCreatedAssetsFromAddress: number;
    setTotalPagesCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    loadingCreatedAssetsFromAddress: boolean;
    setLoadingCreatedAssetsFromAddress: React.Dispatch<React.SetStateAction<boolean>>;

    sellingAssetsFromAddress: NftItemType[];
    setSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    currentPageSellingAssetsFromAddress: number;
    setCurrentPageSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    totalPagesSellingAssetsFromAddress: number;
    setTotalPagesSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<number>>;
    loadingSellingAssetsFromAddress: boolean;
    setLoadingSellingAssetsFromAddress: React.Dispatch<React.SetStateAction<boolean>>;

    followings: AccountItem[];
    setFollowings: React.Dispatch<React.SetStateAction<AccountItem[]>>;
    loadingFollowings: boolean;
    setLoadingFollowings: React.Dispatch<React.SetStateAction<boolean>>;
    currentPageFollowings: number;
    setCurrentPageFollowings: React.Dispatch<React.SetStateAction<number>>;
    totalPagesFollowings: number;
    setTotalPagesFollowings: React.Dispatch<React.SetStateAction<number>>;

    followers: AccountItem[];
    setFollowers: React.Dispatch<React.SetStateAction<AccountItem[]>>;
    currentPageFollowers: number;
    setCurrentPageFollowers: React.Dispatch<React.SetStateAction<number>>;
    totalPagesFollowers: number;
    setTotalPagesFollowers: React.Dispatch<React.SetStateAction<number>>;
    loadingFollowers: boolean;
    setLoadingFollowers: React.Dispatch<React.SetStateAction<boolean>>;
};
