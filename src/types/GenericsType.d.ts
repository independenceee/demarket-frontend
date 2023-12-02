export type NftItemType = {
    assetName: string;
    authorAddress?: string;
    currentAddress?: string;
    description?: string;
    fingerprint?: string;
    image?: string;
    mediaType?: string;
    name?: string | any;
    policyId: string;
    sellerAddress?: string;
    stakekeyAuthorAddress?: string;
    stakekeySellerAddress?: string;
    price?: bigint;
    royalties?: bigint;
    id?: string;
    countOfTransaction?: number;
    createdAt?: string;
    status?: string;
    updatedAt?: string;
    validate?: boolean;
};

export type AccountItemType = {
    id: string;
    createdAt: string;
    updatedAt: string;
    walletAddress: string;
    stakeKey: null;
    email: string;
    userName: string;
    description: string;
    rating: string;
    cover: string;
    avatar: string;
    telegram: string;
    linkedin: string;
    twitter: string;
    followed?: number;
    validate: false;
};

export type WalletItemType = {
    walletBalance?: number;
    walletName: string;
    walletImage: string;
    walletAddress?: string;
    walletDownloadApi?: string;
    walletApi: () => Promise<any> | any;
    walletCheckApi: () => Promise<any> | any;
};

export type Statistic = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    totalTransaction: number;
    totalProduct: number;
    totalCollection: number;
    totalTrending: number;
    totalAuthor: number;
};

export type FounderItemType = {
    avatar: string;
    company: string;
    createdAt?: string;
    fistName: string;
    id?: string;
    lastName: string;
    role: string;
    twitter: string;
    linkedin: string;
    updatedAt?: string;
};

export type GuideItemType = {
    createdAt?: string;
    description: string;
    id?: string;
    question: string;
    title: string;
    updatedAt?: string;
    videoUrl: string;
};

export type CategoryItemType = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    slug?: string;
};
