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
