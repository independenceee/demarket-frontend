import { Data, Script, UTxO } from "lucid-cardano";
import lucidService from "./lucid";
import readValidator from "@/utils/readValidator";
import { Datum } from "@/constants/datum";

type Props = {
    policyId: string;
    assetName: string;
};

const findAssetService = async function ({ policyId, assetName }: Props) {
    let existAsset: any;
    const lucid = await lucidService();
    const validator: Script = await readValidator();
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress);
    const utxos: UTxO[] = scriptUtxos.filter((utxo: any, index: number) => {
        const checkAsset: Datum = Data.from<Datum>(utxo.datum, Datum);
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
