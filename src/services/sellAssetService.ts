import { Data, Lucid, SpendingValidator, fromHex, toHex } from "lucid-cardano";
import * as cbor from "cbor-x";
import demarketValidator from "@/libs";

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

const readValidator = async function (): Promise<SpendingValidator> {
    const validator = demarketValidator[0];
    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
};

const sellAssetService = async function ({
    policyId,
    assetName,
    author,
    seller,
    price,
    lucid,
    royalties,
}: {
    policyId: string;
    assetName: string;
    seller: string;
    author: string;
    price: bigint;
    royalties: bigint;
    lucid: Lucid;
}) {
    try {
        const validator = await readValidator();
        const contractAddress = lucid.utils.validatorToAddress(validator);
        console.log("contract address:" + contractAddress); // => OK
        const datum = Data.to(
            {
                policyId: policyId,
                assetName: assetName,
                seller: seller,
                author: author,
                price: price,
                royalties: royalties,
            },
            Datum,
        );
        console.log("Datum" + datum);

        const tx = await lucid
            .newTx()
            .payToContract(
                contractAddress,
                { inline: datum },
                { [policyId + assetName]: BigInt(1) },
            )
            .complete();
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        await lucid.awaitTx(txHash);
    } catch (error) {
        console.log(error);
    }
};

export default sellAssetService;
