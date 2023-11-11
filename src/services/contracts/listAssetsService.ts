import { Data } from "lucid-cardano";
import lucidService from "./lucidService";
import readValidator from "@/utils/readValidator";
import { Datum } from "@/constants/datum";

const listAssetsService = async function () {
    try {
        const lucid = await lucidService();
        const validator = await readValidator();
        const contractAddress = lucid.utils.validatorToAddress(validator);
        const scriptAssets = await lucid.utxosAt(contractAddress);

        const assets = scriptAssets.map(function (asset: any, index: number) {
            const datum = Data.from<Datum>(asset.datum, Datum);
            return datum;
        });
        return assets;
    } catch (error) {
        console.log(error);
    }
};

export default listAssetsService;
