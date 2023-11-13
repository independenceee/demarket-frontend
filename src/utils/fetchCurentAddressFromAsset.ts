import { post } from "./httpRequest";

const fetchCurrentAddressFromAsset = async function ({ policyId, assetName }: { policyId: string; assetName: string }) {
    try {
        const data = await post("/koios/assets/nft-address", {
            policyId: policyId,
            assetName: assetName,
        });

        return data.address;
    } catch (error) {
        console.error(error);
    }
};

export default fetchCurrentAddressFromAsset;
