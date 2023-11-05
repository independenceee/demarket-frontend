import fetchAuthorAddressAndSellerAddress from "./fetchAuthorAddressAndSellerAddress";
import { post } from "@/utils/httpRequest";

type Props = {
    policyId: string;
    assetName: string;
};

const fetchMetadataFromPolicyIdAndAssetName = async function ({ policyId, assetName }: Props) {
    const { authorAddress, sellerAddress, stakekeyAuthorAddress, stakekeySellerAddress } =
        await fetchAuthorAddressAndSellerAddress({ policyId, assetName });
    const metadata = await post("/blockfrost/assets/information", {
        policyId: policyId,
        assetName: assetName,
    });
    console.log(stakekeyAuthorAddress);

    return {
        policyId,
        assetName,
        authorAddress,
        stakekeyAuthorAddress,
        sellerAddress,
        stakekeySellerAddress,
        fingerprint: metadata.fingerprint,
        metadata: metadata.onchain_metadata,
    };
};

export default fetchMetadataFromPolicyIdAndAssetName;
