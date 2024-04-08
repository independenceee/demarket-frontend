import { Lucid, TxHash } from "lucid-cardano";
import { ProductType } from "@/types/GenericsType";

export type SmartContractType = {
    txHash: string;
    waiting: boolean;
    sell: ({ lucid, product }: { lucid: Lucid; product: ProductType }) => Promise<TxHash>;
    refund: ({ lucid, product }: { lucid: Lucid; product: ProductType }) => Promise<TxHash>;
    buy: ({ lucid, products }: { lucid: Lucid; products: Array<ProductType> }) => Promise<TxHash>;
};
