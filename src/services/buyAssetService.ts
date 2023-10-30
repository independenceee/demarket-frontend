import { Data, Lucid, SpendingValidator, fromHex, toHex, Redeemer } from "lucid-cardano";
import { encode } from "cbor";
import demarketValidator from "@/libs";

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

const redeemer: Redeemer = Data.void();

const readValidator = async function (): Promise<SpendingValidator> {
    const validator = demarketValidator[0];
    return {
        type: "PlutusV2",
        script: toHex(encode(fromHex(validator.compiledCode))),
    };
};

const buyAssetService = async function ({
    policyId,
    assetName,
    lucid,
}: {
    policyId: string;
    assetName: string;
    lucid: Lucid;
}) {
    const validator = await readValidator();
    const contractAddress = lucid.utils.validatorToAddress(validator);
    const assets = await lucid.utxosAt(contractAddress);
    let assetFilter: any;
    const filterAssets = assets.filter(function (asset: any, index: number) {
        try {
            const template = Data.from<Datum>(asset.datum, Datum);
            if (template.policyId == policyId && template.assetName == assetName) {
                assetFilter = Data.from<Datum>(asset.datum, Datum);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    });

    if (filterAssets.length === 0) {
        console.log("No redeemable utxo found. You need to wait a little longer...");
        process.exit(1);
    }

    const exchange_fee = BigInt((parseInt(assetFilter.price) * 1) / 100);

    console.log(redeemer);
    console.log(filterAssets);
    console.log(assetFilter);
    const tx = await lucid
        .newTx()
        .payToAddress(
            "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0z",
            { lovelace: assetFilter.price },
        ) // Gui tien cho nguoi ban
        .payToAddress(
            "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
            { lovelace: exchange_fee },
        ) // Phi san
        .payToAddress(
            "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0z",
            {
                lovelace: assetFilter.royalties,
            },
        ) // Gui tien cho nguoi mua
        .collectFrom(filterAssets)
        .attachSpendingValidator(validator)
        .complete();

    const signedTx = await tx.sign().complete();
    console.log(signedTx);
    const txHash = await signedTx.submit();
    console.log(txHash);
    await lucid.awaitTx(txHash);

    try {
    } catch (error) {
        console.log(error);
    }
};

export default buyAssetService;
