import {
    Blockfrost,
    Data,
    Lucid,
    SpendingValidator,
    fromHex,
    toHex,
} from "lucid-cardano";
import * as cbor from "cbor-x";
import demarketValidator, { contractAddress } from "@/libs";

export const DatumInitial = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    seller: Data.Bytes(),
    author: Data.Bytes(),
    price: Data.Integer(),
    royalties: Data.Integer(),
});

export type Datum = Data.Static<typeof DatumInitial>;
export const Datum = DatumInitial as unknown as Datum;

const lucidService = async function (): Promise<Lucid> {
    const lucid = await Lucid.new(
        new Blockfrost(
            "https://cardano-preprod.blockfrost.io/api/v0",
            "preprodMLN0qpW8GZENdqNe4ot6pwRLku7hXAF6",
        ),
        "Preprod",
    );
    return lucid;
};

const readValidator = async function (): Promise<SpendingValidator> {
    const validator = demarketValidator[0];

    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
};

const listAssetsFromContract = async function () {
    try {
        const lucid = await lucidService();
        const validator = await readValidator();
        const addressContract = lucid.utils.validatorToAddress(validator);
        const scriptAssets = await lucid.utxosAt(addressContract);

        console.log(contractAddress);
        const assets = scriptAssets.map(function (asset: any, index) {
            const datum = Data.from<Datum>(asset.datum, Datum);
            return datum;
        });
        return assets;
    } catch (error) {
        console.log(error);
    }
};

export default listAssetsFromContract;
