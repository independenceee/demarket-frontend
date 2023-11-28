import { Data, Lucid } from "lucid-cardano";
import { Datum } from "@/constants/datum";
import { redeemer } from "@/constants/redeemer";

import readValidator from "@/utils/readValidator";
import { toast } from "react-toastify";

type Props = {
    lucid: Lucid;
    sellerAddress: string;
    royaltiesAddress: string;
    policyId: string;
    assetName: string;
};

const buyAssetService = async function ({ lucid, policyId, assetName, sellerAddress, royaltiesAddress }: Props) {
    try {
        const validator = await readValidator();
        const contractAddress = lucid.utils.validatorToAddress(validator);
        const scriptUtxos = await lucid.utxosAt(contractAddress);
        let existAsset: any;

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
            process.exit(1);
        }

        const exchange_fee = BigInt((parseInt(existAsset.price) * 1) / 100);

        const tx = await lucid
            .newTx()
            .payToAddress(sellerAddress, { lovelace: BigInt(existAsset.price) })
            .payToAddress(
                "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
                { lovelace: exchange_fee },
            )
            .payToAddress(royaltiesAddress, { lovelace: BigInt(existAsset.royalties) })
            .collectFrom(utxos, redeemer)
            .attachSpendingValidator(validator)
            .complete();

        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        await lucid.awaitTx(txHash);

        return { txHash, policyId, assetName };
    } catch (error) {
        toast.error("Buy asset faild !", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};

export default buyAssetService;
