export type CartContextType = {
    cartState: {
        itemsList: Array<any>;
        totalQuantity: number;
        totalPrice: number;
        changed: boolean;
    };

    removeFromCart: ({ id, policyId, assetName }: { id: string; policyId: string; assetName: string }) => Promise<any>;
    addToCart: (newItem: any) => Promise<any>;
    clearCart: () => Promise<any>;
};
