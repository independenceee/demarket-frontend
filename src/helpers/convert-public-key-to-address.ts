import { Address, Credential, KeyHash, Lucid } from "lucid-cardano";

type Props = {
    lucid: Lucid;
    publicKey: KeyHash;
};

const convertPublickeyToAddress = function ({ lucid, publicKey }: Props): Address {
    let credential: Credential = {
        type: "Key",
        hash: publicKey,
    };
    const address = lucid.utils.credentialToAddress(credential);

    if (!address) {
        throw new Error("Convert public key to address failed");
    }

    return address;
};

export default convertPublickeyToAddress;
