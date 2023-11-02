const burnNft = async function (policyId: string, assetName: string) {
    if (lucid) {
        const { paymentCredential }: any = lucid?.utils.getAddressDetails(await lucid.wallet.address());
        const mintingPolicy = lucid?.utils.nativeScriptFromJson({
            type: "all",
            scripts: [
                { type: "sig", keyHash: paymentCredential.hash },
                {
                    type: "before",
                    slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
                },
            ],
        });

        // const policyId = lucid.utils.mintingPolicyToId(mintingPolicy!);
        const unit = policyId + assetName;
        console.log(unit);

        const tx = await lucid
            .newTx()
            .mintAssets({ [unit]: BigInt(-1) }, Data.to(new Constr(0, [])))

            .validTo(Date.now() + 200000)
            .attachMintingPolicy(mintingPolicy!)
            .complete();

        const signedTx = await tx.sign().complete();
        await signedTx.submit();
    }
    try {
    } catch (error) {
        console.log(error);
    }
};
