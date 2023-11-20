import { Data, Lucid } from "lucid-cardano";
import readValidator from "@/utils/readValidator";
import fetchPublicKeyFromAddress from "@/utils/fetchPublicKeyFromAddress";
import { Datum } from "@/constants/datum";
import { toast } from "react-toastify";

type Props = {
    policyId: string;
    assetName: string;
    author: string;
    price: bigint;
    royalties: bigint;
    lucid: Lucid;
};

const sellAssetService = async function ({ policyId, assetName, author, price, lucid, royalties }: Props) {
    try {
        console.log(policyId, author, assetName, price, royalties);
        const validator = await readValidator();
        const contractAddress = lucid.utils.validatorToAddress(validator);
        const authorPublicKey = fetchPublicKeyFromAddress(author);
        const sellerPublicKey: any = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential
            ?.hash;

        const datum = Data.to(
            {
                policyId: policyId,
                assetName: assetName,
                seller: sellerPublicKey,
                author: authorPublicKey,
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
        if (txHash) {
            toast.success("Sell asset successfully !", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return;
        }

        toast.error("Sell asset faild !", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return;
    } catch (error) {
        console.log(error);
    }
};

export default sellAssetService;
