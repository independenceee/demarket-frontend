import fetchAuthorAddressAndSellerAddress from "./fetchAuthorAddressAndSellerAddress";
import fetchCurrentAddressFromAsset from "./fetchCurentAddressFromAsset";
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
    const currentAddress = await fetchCurrentAddressFromAsset({ policyId, assetName });

    return {
        policyId,
        assetName,
        authorAddress,
        stakekeyAuthorAddress,
        sellerAddress,
        stakekeySellerAddress,
        fingerprint: metadata.fingerprint,
        metadata: metadata.onchain_metadata,
        currentAddress,
    };
};

export default fetchMetadataFromPolicyIdAndAssetName;
