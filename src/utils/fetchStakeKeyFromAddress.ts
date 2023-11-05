import { post } from "@/utils/httpRequest";

const fetchStakeKeyFromAddress = async function (address: string) {
    try {
        const data = await post("/emurgo/stakekey/address", {
            address: address,
        });

        return data.stakeKey;
    } catch (error) {
        console.error(error);
    }
};

export default fetchStakeKeyFromAddress;
