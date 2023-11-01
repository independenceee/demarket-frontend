import { Data, Lucid, SpendingValidator, fromHex, toHex } from "lucid-cardano";
import * as cbor from "cbor-x";
import demarketValidator from "@/libs";

async function readValidator(): Promise<SpendingValidator> {
    const validator = {
        title: "contract.contract",
        datum: {
            title: "datum",
            schema: {
                $ref: "#/definitions/contract~1Datum",
            },
        },
        redeemer: {
            title: "_redeemer",
            schema: {
                $ref: "#/definitions/Void",
            },
        },
        compiledCode:
            "59043b01000032323232323232323232322223253330093232323232323232323253330133370e9001000899299980a0018a511323232323232323232533301d0011533301d3371e6eb8cc064c06c0612004375c6603260360309003099191919299981099b8948010c00400c4c8cdc4a40046004002660080064660180026eb4cc078c080075200814a0600200244a6660480022900009919b8048008cc00c00c004c09c004cc00403894ccc07ccc020004c028dd71980d980e80d240082660120026eb4cc06cc074069200a14a044646600200200644a666048002297ae01323253330233005002133027002330040040011330040040013028002302600114a229414ccc0714ccc0714ccc070cdd7801a6103d87a800014a2266ebc00930103d87a800014a2266ebc00530103d87a800014a02944ccc00c02c01d300150d8799fd8799f581c3a4e6757f24d9dddb65c8aef60d0999957b3650453e5e7721fb4fd42ffd8799fd8799fd8799f581c32798960f1b4dc35be90add0d31aed0e3019ea0e47288296a5737e60ffffffff0033300200a375a6602c603002a900518029bae33016301801548018ccc004024dd69980a980b80a2401060086eb8cc054c05c0512004222323300100100422533302000114c0103d87a800013232533301f533301f3300900200613300800200514a0266e952000330230024bd70099802002000981200118110009119baf3301530173301530170024800120003301530170014800088cdc480099191919299980e19b874800800452000132375a60440026034004603400264a66603666e1d200200114c103d87a800013232323300100100222533302200114c103d87a800013232323253330233371e9110000213374a9000198139ba80014bd700998030030019bad3024003375c6044004604c00460480026eacc084004c064008c064004c8cc004004008894ccc078004530103d87a8000132323232533301f3371e9110000213374a9000198119ba60014bd700998030030019bab3020003375c603c004604400460400026eaccc050c058009200223374a90001980d19ba548000cc068dd4800a5eb80cc06930103d87a80004bd7019b833370490011bad33010301200f4802120c801301100714a0602200c646644646600200200644a66603200229404c8c94ccc060cdc78010028a51133004004001301d002375c60360026eb0cc038c0400212010001375c6601a601e01890021bac301500130150013014001300b00330110013011002300f0013007002149858c94ccc024cdc3a40000022646464646464646464646464a66603060360042930b1bad30190013019002375a602e002602e0046eb8c054004c054008dd7180980098098011bae30110013011002375c601e002600e0082c600e0066600200290001111199980399b8700100300c233330050053370000890011807000801001118029baa001230033754002ae6955ceaab9e5573eae815d0aba21",
        hash: "600cf113ded768e1a98a61f214a7ad0f9eb39d38ee8ac9ab4619d56a",
    };
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

export type Datum = Data.Static<typeof DatumInitial>;
export const Datum = DatumInitial as unknown as Datum;

const buyAssetService = async function ({
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
        const redeemer = Data.void();

        const utxos = scriptUtxos.filter((utxo: any, index: number) => {
            try {
                // Do du lieu datum ra bien temp cua UTxO hien tai
                const temp = Data.from<Datum>(utxo.datum, Datum);

                // Kiem tra xem UTxO do co that su dang chua NFT dang can mua khong?
                if (temp.policyId === policyId && temp.assetName === assetName) {
                    UTOut = Data.from<Datum>(utxo.datum, Datum); // Lay datum cua UTxO do ra mot bien
                    return true; // UTxO do da duoc lay
                }
                return false; // UTxO do khong duoc chon
            } catch (e) {
                return false; // UTxO do khong duoc chon
            }
        });
        if (utxos.length === 0) {
            console.log("No redeemable utxo found. You need to wait a little longer...");
            process.exit(1);
        }

        console.log(UTOut);
        const exchange_fee = BigInt((parseInt(UTOut.price) * 1) / 100);
        console.log(exchange_fee);
        console.log("validator: " + validator);
        console.log("Redeemer" + redeemer);
        if (validator && redeemer) {
            const tx = await lucid
                .newTx()
                .payToAddress(
                    "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0z",
                    { lovelace: UTOut.price },
                ) // Gui tien cho nguoi ban
                .payToAddress(
                    "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
                    { lovelace: exchange_fee },
                ) // Phi san
                .payToAddress(
                    "addr_test1qqwxne57v0ahe04dy3jjpxqmp8ewmtaypx0tfu46c8h6wkg7659tg5e2hjvkapfq8pph66kau3vc06c04gu3drjcgnhshmzl0z",
                    { lovelace: UTOut.royalties },
                ) // Gui tien cho tac gia
                .collectFrom(utxos, redeemer) // Tieu thu UTxO (Lay NFT co tren hop dong ve vi)
                .attachSpendingValidator(validator) // Tham chieu den hop dong, neu duoc xac nhan, moi dau ra se duoc thuc thi
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

export default buyAssetService;

// // Chon vi nguoi mua
// const wallet = lucid.selectWalletFromSeed(await Deno.readTextFile("./beneficiary.seed"));

// // Public key nguoi mua
// const beneficiaryPublicKeyHash = lucid.utils.getAddressDetails(
//     await lucid.wallet.address(),
// ).paymentCredential.hash;

// Doc validator va gan vao mot bien

// ---------------------------------------------------

// Doc dia chi hop dong tu bien validator
// const scriptAddress = lucid.utils.validatorToAddress(validator);

// Khoi tao doi tuong cua Datum

// Du lieu cua NFT de loc ra UTxO chua NFT do
// const policyId = "d8db13a077b4fd63b5560e9cea7e39f0b11a67eeb89f5e3df9a45d0a";
// const assetName = "4e46542044454d4f";

// Lay ra datum cua UTxO chua NFT can mua
// let UTOut;

// Lay ra toan bo UTxO co tren dia chi hop dong
// const scriptUtxos = await lucid.utxosAt(scriptAddress);

// Loc ra UTxO chua NFT can mua
// const utxos = scriptUtxos.filter((utxo) => {
//     try {
//         // Do du lieu datum ra bien temp cua UTxO hien tai
//         const temp = Data.from<Datum>(utxo.datum, Datum);

//         // Kiem tra xem UTxO do co that su dang chua NFT dang can mua khong?
//         if (temp.policyId === policyId && temp.assetName === assetName) {
//             UTOut = Data.from<Datum>(utxo.datum, Datum); // Lay datum cua UTxO do ra mot bien
//             return true; // UTxO do da duoc lay
//         }
//         return false; // UTxO do khong duoc chon
//     } catch (e) {
//         return false; // UTxO do khong duoc chon
//     }
// });

// console.log(UTOut);

// Neu khong co UTxO nao duoc chon thi se dung chuong trinh
// if (utxos.length === 0) {
//     console.log("No redeemable utxo found. You need to wait a little longer...");
//     Deno.exit(1);
// }

// const exchange_fee = BigInt((parseInt(UTOut.price) * 1) / 100);

// Hop dong khong dung redeemer nhung cai nay bat buoc phai co nen khoi tao rong
// const redeemer = Data.empty();

// Ham mo khoa tai san len hop dong
// async function unlock(utxos, UTOut, exchange_fee, { from, using }): Promise<TxHash> {
//     console.log(BigInt(UTOut.price));
//     // Khoi tao giao dich
//     const tx = await lucid
//         .newTx()
//         .payToAddress(
//             "addr_test1qpkxr3kpzex93m646qr7w82d56md2kchtsv9jy39dykn4cmcxuuneyeqhdc4wy7de9mk54fndmckahxwqtwy3qg8pums5vlxhz",
//             { lovelace: UTOut.price },
//         ) // Gui tien cho nguoi ban
//         .payToAddress(
//             "addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg",
//             { lovelace: exchange_fee },
//         ) // Phi san
//         .payToAddress(
//             "addr_test1qpkxr3kpzex93m646qr7w82d56md2kchtsv9jy39dykn4cmcxuuneyeqhdc4wy7de9mk54fndmckahxwqtwy3qg8pums5vlxhz",
//             { lovelace: UTOut.royalties },
//         ) // Gui tien cho nguoi mua
//         .collectFrom(utxos, using) // Tieu thu UTxO (Lay NFT co tren hop dong ve vi)
//         .attachSpendingValidator(from) // Tham chieu den hop dong, neu duoc xac nhan, moi dau ra se duoc thuc thi
//         .complete();

//     console.log(1);

//     // Ki giao dich
//     const signedTx = await tx.sign().complete();

//     // Gui giao dich len onchain
//     return signedTx.submit();
// }

// Thuc thi giao dich mua tai san co tren hop dong
// const txUnlock = await unlock(utxos, UTOut, exchange_fee, {
//     from: validator,
//     using: redeemer,
// });
// console.log(1);

// // Thoi gian cho den khi giao dich duoc xac nhan tren Blockchain
// await lucid.awaitTx(txUnlock);

// console.log(`NFT recovered from the contract
//     Tx ID: ${txUnlock}
//     Redeemer: ${redeemer}
// `);
