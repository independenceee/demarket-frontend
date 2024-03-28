# Installation Instructions

## 1. First, please clone this source code

In this project, nextjs is used as the main frontend framework to perform construction and development.. In this guide there will be some requirements to show you how to develop products using git to clone the project.

```sh
git clone https://github.com/independenceee/demarket-frontend.git
```

then Use commands to go to the directory of the current demarket frontend

```sh
cd demarket-frontend
```

This tutorial requires you to have `nodejs`. If you don't have it yet, install `nodejs`. Along with nodejs, npm and npx need to check the existence of these two packages before going to the next part.

```sh
https://nodejs.org/en
```

Then install the project using `npm install` to get the necessary resources for the project

```sh
npm install
```

after the installation is done successfully use `npm run dev` to run the project

```sh
$ npm run dev
> demarket-frontend@1.0.0 dev
> ts-node src/index.ts
http://localhost:3000
```

The project is running on `PORT 3000` and now you will carry out development of our project
After the project is built successfully, execute `npm run build` to build and check the output

### 2.Get all the resources and create the necessary environment to run the project

In the project you must create an .env file to run project dependencies

```env
DATABASE_URL="postgresql..."
PORT = 5000
BLOCKFROST_PROJECT_ID_SECRET_PREPROD = preprod...
BLOCKFROST_PROJECT_ID_SECRET_PREVIEW = preview...
BLOCKFROST_PROJECT_ID_SECRET_MAINNET = mainnet...
KOIOS_RPC_URL_PREPROD = https...
KOIOS_RPC_URL_PREVIEW = https...
KOIOS_RPC_URL_MAINNET = https...
```

To get these resources you need to `https://blockfrost.io` and `https://www.koios.rest` to do a few operations to get all the dependencies for the project. For the database, I will use the postgresql database and on the local machine on your computer.

### 3.Features: Our Fontend allows users to securely execute the following functions

-   You can create your assets and list them as products for sale
-   Display your products and product information on the platform
-   Sell, buy, and withdraw assets easily
-   Follow the product's history as well as price information
-   Users can Follow or unFollow. At the same time, they can follow each other's number of products
-   At the same time, users can check products, number of products, number of products sold, number of products created and check who is following account and following account.
-   With the profile page, you can show all information about your wallet as well as participation time and at the same time act as a sales page

```ts
/*
You can execute an asset search in our smart contract through lucid cardano
*/
const findAssetService = async function ({ policyId, assetName }: Props) {
    let existAsset: any;
    const lucid = await lucidService();
    const validator: Script = await readValidator({
        compliedCode: contractValidatorMarketplace[0].compiledCode,
    });
    const contractAddress: string = lucid.utils.validatorToAddress(validator);
    const scriptUtxos = await lucid.utxosAt(contractAddress);
    const utxos: UTxO[] = scriptUtxos.filter((utxo: any, index: number) => {
        const checkAsset: Datum = Data.from<Datum>(utxo.datum, Datum);
        if (checkAsset.policyId === policyId && checkAsset.assetName === assetName) {
            existAsset = Data.from<Datum>(utxo.datum, Datum);
            return true;
        }
        return false;
    });

    if (utxos.length === 0) {
        console.log("utxo found");
        return null;
    }

    return existAsset;
};
```

```ts
/*
Read assets from smart contracts
*/
const listAssets = async function ({ lucid }: Props): Promise<NftItemType[] | any> {
    try {
        const validator: Script = await readValidator({
            compliedCode: contractValidatorMarketplace[0].compiledCode,
        });
        const contractAddress: string = lucid.utils.validatorToAddress(validator);
        const scriptAssets: UTxO[] = await lucid.utxosAt(contractAddress);
        const assets: NftItemType[] = scriptAssets.map(function (asset: any, index: number) {
            const datum = Data.from<Datum>(asset.datum, Datum);
            return datum;
        });
        return assets;
    } catch (error) {
        console.log(error);
    }
};
```

```ts
/*
 Sell the assets in your wallet
*/
const sellAssetService = async function ({ policyId, assetName, author, price, lucid, royalties }: Props) {
    try {
        const validator: Script = await readValidator({
            compliedCode: contractValidatorMarketplace[0].compiledCode,
        });
        const contractAddress: string = lucid.utils.validatorToAddress(validator);

        const authorPublicKey = fetchPublicKeyFromAddress(author);
        const sellerPublicKey: any = lucid.utils.getAddressDetails(await lucid.wallet.address()).paymentCredential?.hash;

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
        return { txHash, policyId, assetName };
    } catch (error) {
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
    }
};
```

```ts
/*
You can buy assets and return them to your wallet
*/
const buyAssetService = async function ({ lucid, policyId, assetName, sellerAddress, royaltiesAddress }: Props) {
    try {
        const validator = await readValidator({
            compliedCode: contractValidatorMarketplace[0].compiledCode,
        });

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

        const tx: TxComplete = await lucid
            .newTx()
            .payToAddress(sellerAddress, { lovelace: BigInt(existAsset.price) })
            .payToAddress("addr_test1qqayue6h7fxemhdktj9w7cxsnxv40vm9q3f7temjr7606s3j0xykpud5ms6may9d6rf34mgwxqv75rj89zpfdftn0esq3pcfjg", {
                lovelace: exchange_fee,
            })
            .payToAddress(royaltiesAddress, { lovelace: BigInt(existAsset.royalties) })
            .collectFrom(utxos, redeemer)
            .attachSpendingValidator(validator)
            .complete();

        const signedTx: TxSigned = await tx.sign().complete();
        const txHash: string = await signedTx.submit();
        await lucid.awaitTx(txHash);

        return { txHash, policyId, assetName };
    } catch (error) {
        console.log(error);
    }
};
```

```ts
/*
You can refund your property to the wallet
*/
const refundAssetService = async function ({ lucid, policyId, assetName }: Props) {
    try {
        const validator = await readValidator({
            compliedCode: contractValidatorMarketplace[0].compiledCode,
        });

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
        if (validator) {
            const tx = await lucid
                .newTx()
                .collectFrom(assets, redeemer)
                .addSigner(await lucid.wallet.address())
                .attachSpendingValidator(validator)
                .complete();

            const signedTx = await tx.sign().complete();
            const txHash = await signedTx.submit();
            await lucid.awaitTx(txHash);
            return { txHash, policyId, assetName };
        }
    } catch (error) {
        toast.error("Refund asset faild !", {
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
```

### 4. License

The Demarket Frontend is released under the MIT. See the LICENSE file for more details.

### 5. Contact

For any questions or feedback, please contact the project maintainer at `nguyenkhanh17112003@gmail.com`.
