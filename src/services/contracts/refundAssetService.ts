import { Data, Lucid } from "lucid-cardano";
import readValidator from "@/utils/readValidator";
import { Datum } from "@/constants/datum";
import { redeemer } from "@/constants/redeemer";

type Props = {
    lucid: Lucid;
    policyId: string;
    assetName: string;
};

const refundAssetService = async function ({ lucid, policyId, assetName }: Props) {
    try {
        const validator = await readValidator();
        const scriptAddress = lucid.utils.validatorToAddress(validator);
        const scriptUtxos = await lucid.utxosAt(scriptAddress);
        let existAsset: any;

        const assets = scriptUtxos.filter((asset: any, index: number) => {
            const checkAsset = Data.from<Datum>(asset.datum, Datum);
            if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
                existAsset = Data.from<Datum>(asset.datum, Datum);
                return true;
            }
            return false;
        });
        if (assets.length === 0) {
            console.log("utxo found.");
            process.exit(1);
        }

        const exchange_fee = BigInt((parseInt(existAsset.price) * 1) / 100);
        console.log(exchange_fee);
        if (validator) {
            const tx = await lucid
                .newTx()
                .collectFrom(assets, redeemer)
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
