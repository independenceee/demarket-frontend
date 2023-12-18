import { Blockfrost, Lucid } from "lucid-cardano";

const lucidService = async function (): Promise<Lucid> {
    const lucid = await Lucid.new(
        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodez6rnHTjlVwmOJ94OzyJ6N0iGgNlKA1o"),
        "Preprod",
    );

    return lucid;
};

export default lucidService;
