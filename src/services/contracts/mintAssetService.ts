import { Lucid, fromText } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    title: string;
    description: string;
    mediaType: string;
    imageUrl: string;
    customMetadata: any;
};

const mintAssetService = async function ({
    lucid,
    title,
    description,
    imageUrl,
    mediaType,
    customMetadata,
}: Props): Promise<any> {
    try {
        if (lucid) {
            const { paymentCredential }: any = lucid.utils.getAddressDetails(await lucid.wallet.address());
            const mintingPolicy = lucid.utils.nativeScriptFromJson({
                type: "all",
                scripts: [
                    { type: "sig", keyHash: paymentCredential.hash },
                    { type: "before", slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000) },
                ],
            });
            const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
            const uint = policyId + fromText(title);

            const cleanedData = Object.fromEntries(Object.entries(customMetadata).filter(([key, value]) => key !== ""));

            const tx = await lucid
                .newTx()
                .mintAssets({ [uint]: BigInt(1) })
                .attachMetadata(721, {
                    [policyId]: {
                        [title]: {
                            name: title,
                            description: description,
                            image: imageUrl,
                            mediaType: mediaType,
                            ...cleanedData,
                        },
                    },
                })
                .validTo(Date.now() + 200000)
                .attachMintingPolicy(mintingPolicy)
                .complete();
            const signedTx = await tx.sign().complete();
            await signedTx.submit();

            return true;
        }
    } catch (error) {
        console.error(error);
    }
};

export default mintAssetService;
