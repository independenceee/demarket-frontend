export type GlobalStateContextType = {
    revalidateSmartContract: boolean;
    setRevalidateSmartContract: React.Dispatch<React.SetStateAction<boolean>>;

    revalidateAccount: boolean;
    setRevalidateAccount: React.Dispatch<React.SetStateAction<boolean>>;
};
