import { Lucid } from "lucid-cardano";

export type LucidContextType = {
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
    lucid: Lucid | undefined;
    connectWallet: (walletApi: () => any) => Promise<void>;
    setLucid: React.Dispatch<React.SetStateAction<Lucid | undefined>>;
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
