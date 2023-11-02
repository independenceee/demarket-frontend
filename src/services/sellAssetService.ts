import { Data, Lucid } from "lucid-cardano";
import readValidator from "@/utils/readValidator";
import { Datum } from "@/constants/datum";

type Props = {
    policyId: string;
    assetName: string;
    seller: string;
    author: string;
    price: bigint;
    royalties: bigint;
    lucid: Lucid;
};

const sellAssetService = async function ({ policyId, assetName, author, seller, price, lucid, royalties }: Props) {
    try {
        const validator = await readValidator();
        const contractAddress = lucid.utils.validatorToAddress(validator);

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

        const tx = await lucid
            .newTx()
            .payToContract(contractAddress, { inline: datum }, { [policyId + assetName]: BigInt(1) })
            .complete();
        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        await lucid.awaitTx(txHash);
    } catch (error) {
        console.log(error);
    }
};

export default sellAssetService;
