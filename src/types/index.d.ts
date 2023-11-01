import { Lucid } from "lucid-cardano";

export type LucidContextType = {
    lucid: Lucid | undefined;
    connectWallet: (walletApi: () => any) => Promise<void>;
    setLucid: React.Dispatch<React.SetStateAction<Lucid | undefined>>;
    metadataFromAddress: any;
    assetsFromAsset: Array<any>;
    mintNft: ({
        title,
        description,
        mediaType,
        imagePath,
        customMetadata,
    }: {
        title: string;
        description: string;
        mediaType: string;
        imagePath: string;
        customMetadata: any;
    }) => Promise<void>;
    sellAssetService: ({
        policyId,
        assetName,
        author,
        seller,
        price,
        lucid,
        royalties,
    }: {
        policyId: string;
        assetName: string;
        seller: string;
        author: string;
        price: bigint;
        royalties: bigint;
        lucid: Lucid;
    }) => Promise<void>;

    buyAssetService: ({
        policyId,
        assetName,
        lucid,
    }: {
        policyId: string;
        assetName: string;
        lucid: Lucid;
    }) => Promise<void>;
    refundAssetService: ({
        policyId,
        assetName,
        lucid,
    }: {
        policyId: string;
        assetName: string;
        lucid: Lucid;
    }) => Promise<void>;

    burnNft: (policyId: string, assetName: string) => Promise<void>;
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
