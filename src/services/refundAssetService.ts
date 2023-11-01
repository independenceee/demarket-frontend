import {
    Blockfrost,
    C,
    Constr,
    Data,
    Lucid,
    SpendingValidator,
    TxHash,
    fromHex,
    toHex,
} from "lucid-cardano";
import * as cbor from "cbor-x";
import demarketValidator from "@/libs";

async function readValidator(): Promise<SpendingValidator> {
    const validator = demarketValidator[0];
    return {
        type: "PlutusV2",
        script: toHex(cbor.encode(fromHex(validator.compiledCode))),
    };
}

const DatumInitial = Data.Object({
    policyId: Data.Bytes(),
    assetName: Data.Bytes(),
    seller: Data.Bytes(),
    author: Data.Bytes(),
    price: Data.Integer(),
    royalties: Data.Integer(),
});

type Datum = Data.Static<typeof DatumInitial>;
const Datum = DatumInitial as unknown as Datum;
const redeemer = Data.void();

const refundAssetService = async function ({
    lucid,
    policyId,
    assetName,
}: {
    lucid: Lucid;
    policyId: string;
    assetName: string;
}) {
    try {
        const validator = await readValidator();
        const scriptAddress = lucid.utils.validatorToAddress(validator);
        const scriptUtxos = await lucid.utxosAt(scriptAddress);
        let UTOut: any;

        const utxos = scriptUtxos.filter((utxo: any, index: number) => {
            try {
                const temp = Data.from<Datum>(utxo.datum, Datum);
                if (temp.policyId === policyId && temp.assetName === assetName) {
                    UTOut = Data.from<Datum>(utxo.datum, Datum);
                    return true;
                }
                return false;
            } catch (error) {
                return false;
            }
        });
        if (utxos.length === 0) {
            console.log("No redeemable utxo found. You need to wait a little longer...");
            process.exit(1);
        }

        console.log(await lucid.wallet.address());
        console.log(UTOut);
        const exchange_fee = BigInt((parseInt(UTOut.price) * 1) / 100);
        console.log(exchange_fee);
        if (validator) {
            const tx = await lucid
                .newTx()
                .collectFrom(utxos, Data.void())
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
                .complete();

            const signedTx = await tx.sign().complete();
            const txUnlock = await signedTx.submit();
            await lucid.awaitTx(txUnlock);
            console.log(txUnlock);
        }
    } catch (error) {
        console.log(error);
    }
};

export default refundAssetService;
