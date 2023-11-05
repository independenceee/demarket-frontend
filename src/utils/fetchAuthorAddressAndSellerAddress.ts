import fetchStakeKeyFromAddress from "./fetchStakeKeyFromAddress";
import { post } from "@/utils/httpRequest";

type Props = {
    policyId: string;
    assetName: string;
};

const fetchAddressFromTxHash = async function (transactionHash: string) {
    const data = await post("/blockfrost/transaction/utxos", {
        transactionHash: transactionHash,
    });

    return data.inputs[0].address;
};

const fetchAuthorAddressAndSellerAddress = async function ({ policyId, assetName }: Props) {
    const data = await post("/blockfrost/transaction/asset", {
        policyId: policyId,
        assetName: assetName,
    });

    const authorAddress = await fetchAddressFromTxHash(data[0].tx_hash);
    const sellerAddress = await fetchAddressFromTxHash(data[data.length - 1].tx_hash);
    const stakekeyAuthorAddress = await fetchStakeKeyFromAddress(authorAddress);
    const stakekeySellerAddress = await fetchStakeKeyFromAddress(sellerAddress);

    return { authorAddress, sellerAddress, stakekeyAuthorAddress, stakekeySellerAddress };
};

export default fetchAuthorAddressAndSellerAddress;
