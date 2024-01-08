import { Lucid, TxComplete, TxSigned } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    title: string;
    description: string;
    imageAvatar: string;
    imageCover: string;
};

const mintCollection = async function ({ lucid, title, description, imageAvatar, imageCover }: Props) {
    try {
        if (lucid) {
            const { paymentCredential }: any = lucid.utils.getAddressDetails(await lucid.wallet.address());
            const mintingPolicy = lucid.utils.nativeScriptFromJson({
                type: "all",
                scripts: [
                    { type: "sig", keyHash: paymentCredential.hash },
                    // { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
                    // { type: "all" }, // error
                ],
            });
            const policyId: string = lucid.utils.mintingPolicyToId(mintingPolicy);

            const tx: TxComplete = await lucid
                .newTx()
                .mintAssets({ [policyId]: BigInt(1) })
                .attachMetadata(777, {
                    [policyId]: {
                        [""]: {
                            avatar: imageAvatar,
                            cover: imageCover,
                            title: title,
                            description: description,
                        },
                    },
                })
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx: TxSigned = await tx.sign().complete();
            const txHash: string = await signedTx.submit();

            return { policyId, txHash };
        }
    } catch (error) {
        console.log(error);
    }
};

export default mintCollection;
