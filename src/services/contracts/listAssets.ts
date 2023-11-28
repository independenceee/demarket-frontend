import { Data, Lucid, Script, UTxO } from "lucid-cardano";
import readValidator from "@/utils/readValidator";
import { Datum } from "@/constants/datum";
import { NftItemType } from "@/types/GenericsType";

type Props = {
    lucid: Lucid;
};
const listAssets = async function ({ lucid }: Props): Promise<NftItemType[] | any> {
    try {
        if (lucid) {
            const validator: Script = await readValidator();
            const contractAddress: string = lucid.utils.validatorToAddress(validator);
            const scriptAssets: UTxO[] = await lucid.utxosAt(contractAddress);
            const assets: NftItemType[] = scriptAssets.map(function (asset: any, index: number) {
                const datum = Data.from<Datum>(asset.datum, Datum);
                return datum;
            });

            return assets;
        }
    } catch (error) {
        console.log(error);
    }
};

export default listAssets;
