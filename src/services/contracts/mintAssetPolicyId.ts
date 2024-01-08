import { Lucid, fromText, Script } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    policyId: string;
    title: string;
    description: string;
    mediaType: string;
    imageUrl: string;
    customMetadata: any;
};

const mintAssetPolicyIdService = async function ({ lucid, title, description, imageUrl, mediaType, customMetadata, policyId }: Props): Promise<any> {
    try {
        if (lucid) {
            const { paymentCredential }: any = lucid.utils.getAddressDetails(await lucid.wallet.address());
            console.log(paymentCredential);
            const mintingPolicy: Script = lucid.utils.nativeScriptFromJson({
                type: "all",
                scripts: [
                    // { type: "after", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
                    { type: "sig", keyHash: paymentCredential.hash },
                ],
            });

            // const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

            const assetName = fromText(title);
            const cleanedData = Object.fromEntries(Object.entries(customMetadata).filter(([key, value]) => key !== ""));
            const tx = await lucid
                .newTx()
                .mintAssets({ [policyId + assetName]: BigInt(1) })
                .attachMetadata(721, {
                    [policyId]: {
                        [assetName]: {
                            name: title,
                            description: description,
                            image: imageUrl,
                            mediaType: mediaType,
                            ...cleanedData,
                        },
                    },
                })
                .validTo(Date.now() + 2000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();

            return {
                txHash,
                policyId,
                assetName,
            };
        }
    } catch (error) {
        console.log(error);
    }
};

export default mintAssetPolicyIdService;
