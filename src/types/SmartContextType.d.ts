import { NftItemType } from "./GenericsType";

export type SmartContractType = {
    assetsFromSmartContract: Array<NftItemType>;
    setAssetsFromSmartContract: React.Dispatch<React.SetStateAction<NftItemType[]>>;
    loadingAssetsFromSmartContract: boolean;
    findAsset: ({ policyId, assetName }: { policyId: string; assetName: string }) => Promise<any>;

    buyAsset: ({
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
    }) => Promise<any>;

    sellAsset: ({
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
    }) => Promise<any>;

    refundAsset: ({ lucid, policyId, assetName }: { lucid: Lucid; policyId: string; assetName: string }) => Promise<any>;

    mintAsset: ({
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

    mintCollection: ({
        title,
        description,
        address,
        lucid,
        imageAvatar,
        imageCover,
    }: {
        lucid: Lucid;
        title: string;
        address: string;
        description: string;
        imageAvatar: string;
        imageCover: string;
    }) => Promise<any>;

    mintAssetPolicyId: ({
        lucid,
        title,
        description,
        imageUrl,
        mediaType,
        customMetadata,
        policyIdCollection,
    }: {
        lucid: Lucid;
        title: string;
        description: string;
        mediaType: string;
        imageUrl: string;
        customMetadata: any;
        policyIdCollection: string;
    }) => Promise<any>;

    burnAsset: ({ lucid, policyId, assetName }: { lucid: Lucid; policyId: string; assetName: string }) => Promise<any>;
};
