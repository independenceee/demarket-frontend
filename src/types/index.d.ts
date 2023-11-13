import { Lucid } from "lucid-cardano";

export type WalletType = {
    price?: number;
    name: string;
    image: string;
    downloadApi?: string;
    api: () => Promise<void> | any;
    checkApi: () => Promise<void> | any;
};

export type CartContextType = {
    itemsList: Array<any>;
    totalQuantity: number;
    showCart: boolean;
    changed: boolean;
};

export type LucidContextType = {
    account: any;
    lucid: Lucid;
    walletAddress: string;
    walletImage: any;
    walletName: string;
    walletBanlance: number;
    connectWallet: ({ api, name, image }: WalletType) => Promise<void>;
};

export type DemarketContextType = {
    categories: Array<Category>;
    loadingCategories: boolean;

    founders: Array<Founder>;
    loadingFounders: boolean;
};

export type WalletContextType = {};

export type SmartContractType = {
    listAssetsFromSmartContract: any;
    loadingAssetsFromSmartContract: boolean;
    findAssetService: ({ policyId, assetName }: { policyId: string; assetName: string }) => Promise<any>;

    buyAssetService: ({
        lucid,
        sellerAddress,
        royaltiesAddress,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        sellerAddress: string;
        royaltiesAddress: string;
        policyId: string;
        assetName: string;
    }) => Promise<void>;

    sellAssetService: ({
        policyId,
        assetName,
        author,
        price,
        royalties,
        lucid,
    }: {
        policyId: string;
        assetName: string;
        author: string;
        price: bigint;
        royalties: bigint;
        lucid: Lucid;
    }) => Promise<void>;

    refundAssetService: ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
    }) => Promise<void>;

    mintAssetService: ({
        lucid,
        title,
        description,
        imageUrl,
        mediaType,
        customMetadata,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        mediaType: string;
        imageUrl: string;
        customMetadata: any;
    }) => Promise<any>;

    burnAssetService: ({
        lucid,
        policyId,
        assetName,
    }: {
        lucid: Lucid;
        policyId: string;
        assetName: string;
    }) => Promise<any>;
};

export type AssetMetadata = {
    title: string;
    description: string;
    mediaType: string;
    description: string;
    customMetadata: any;
};

export type Asset = {
    policyId: string;
    assetName: string;
    authorAddress?: string;
    sellergAddress?: string;
    price?: bigint;
    royalties?: bigint;
    metadata?: AssetMetadata;
};

export type Account = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    policyId?: string;
    address: string;
    email?: string;
    name?: string;
    description?: string;
    rating?: number | null;
    cover?: string;
    avatar?: string;
    socialMediaUrl?: string[];
    followed?: number | null;
    validate?: boolean;
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

export type Founder = {
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

export type Guide = {
    createdAt?: string;
    description: string;
    id?: string;
    question: string;
    title: string;
    updatedAt?: string;
    url: string;
};

export type Category = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    slug?: string;
};
