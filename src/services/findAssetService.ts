import { Data } from "lucid-cardano";
import lucidService from "./lucidService";
import readValidator from "@/utils/readValidator";
import { Datum } from "@/constants/datum";

type Props = {
    policyId: string;
    assetName: string;
};

const findAssetService = async function ({ policyId, assetName }: Props) {
    let existAsset: any;
    const lucid = await lucidService();
    const validator = await readValidator();
    const contractAddress = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress);
    const utxos = scriptUtxos.filter((utxo: any, index: number) => {
        const checkAsset = Data.from<Datum>(utxo.datum, Datum);
        if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
            existAsset = Data.from<Datum>(utxo.datum, Datum);
            return true;
        }
        return false;
    });

    if (utxos.length === 0) {
        console.log("utxo found");
        return null;
    }

    return existAsset;
};

export default findAssetService;
