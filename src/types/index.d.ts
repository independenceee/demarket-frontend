import { Lucid } from "lucid-cardano";

export type LucidContextType = {
    mintNft: (
        title: string,
        description: string,
        imagePath: string,
        metadatas: any,
    ) => void;
    lucid: Lucid | undefined;
    connectWallet: (walletApi: () => any) => Promise<void>;
    setLucid: React.Dispatch<React.SetStateAction<Lucid | undefined>>;
};
